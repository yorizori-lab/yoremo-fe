"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { useRecipes } from "@/presentation/hooks/use-recipes"
import { 
  getCategoryTypes, 
  getCategorySituations, 
  getCategoryIngredients, 
  getCategoryMethods 
} from "@/infrastructure/api/repositories/category-repository"
import type { Category } from "@/domain/models/category"
import type { RecipeFilters as RecipeFiltersType } from "@/domain/repositories/recipe-repository"
import { Skeleton } from "@/components/ui/skeleton"

export interface RecipeFiltersProps {
  onFiltersChange?: (filters: RecipeFiltersType) => void;
}

export default function RecipeFilters({ onFiltersChange }: RecipeFiltersProps) {
  const { filters, updateFilters, refreshData } = useRecipes()
  const [searchTerm, setSearchTerm] = useState(filters.search || "")
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || [])
  const [tagInput, setTagInput] = useState("")

  // 카테고리 데이터 상태
  const [categoryTypes, setCategoryTypes] = useState<Category[]>([])
  const [categorySituations, setCategorySituations] = useState<Category[]>([])
  const [categoryIngredients, setCategoryIngredients] = useState<Category[]>([])
  const [categoryMethods, setCategoryMethods] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  // API에서 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoadingCategories(true)
      try {
        const [types, situations, ingredients, methods] = await Promise.all([
          getCategoryTypes(),
          getCategorySituations(),
          getCategoryIngredients(),
          getCategoryMethods()
        ]);
        
        setCategoryTypes(types)
        setCategorySituations(situations)
        setCategoryIngredients(ingredients)
        setCategoryMethods(methods)
      } catch (error) {
        console.error('카테고리 데이터를 가져오는 중 오류 발생:', error)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategoryData()
  }, [])

  // 필터 업데이트 함수 - 원래 로직 + 부모에게 알림
  const handleFilterUpdate = (newFilters: Partial<RecipeFiltersType>) => {
    updateFilters(newFilters);
    
    // 부모 컴포넌트에게 필터 변경을 알림 (있을 경우에만)
    if (onFiltersChange) {
      const updatedFilters = { ...filters, ...newFilters };
      onFiltersChange(updatedFilters);
    }
  }

  const handleSearch = () => {
    handleFilterUpdate({ search: searchTerm })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleCategoryChange = (type: string, value: string) => {
    if (value === "all") {
      handleFilterUpdate({ [type]: undefined })
    } else {
      const categoryId = Number.parseInt(value);
      handleFilterUpdate({ [type]: categoryId })
    }
  }

  // 난이도 데이터 맵핑 (프론트 <-> 백엔드)
  const difficultyOptions = [
    { value: "EASY", label: "쉬움" },
    { value: "NORMAL", label: "보통" },
    { value: "HARD", label: "어려움" }
  ]

  const handleDifficultyChange = (value: string) => {
    if (value === "all") {
      handleFilterUpdate({ difficulty: undefined })
    } else {
      handleFilterUpdate({ difficulty: value })
    }
  }

  const handleAddTag = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      const newTags = [...selectedTags, tagInput]
      setSelectedTags(newTags)
      handleFilterUpdate({ tags: newTags })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag)
    setSelectedTags(newTags)
    handleFilterUpdate({ tags: newTags.length > 0 ? newTags : undefined })
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedTags([])
    
    const clearedFilters = {
      search: undefined,
      categoryTypeId: undefined,
      categorySituationId: undefined,
      categoryIngredientId: undefined,
      categoryMethodId: undefined,
      difficulty: undefined,
      tags: undefined,
    };
    
    handleFilterUpdate(clearedFilters);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">검색</h3>
        <div className="flex gap-2">
          <Input
            placeholder="레시피 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">카테고리</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-type">종류별</Label>
            {isLoadingCategories ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={filters.categoryTypeId?.toString() || ""}
                onValueChange={(value) => handleCategoryChange("categoryTypeId", value)}
              >
                <SelectTrigger id="category-type">
                  <SelectValue placeholder="종류 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {categoryTypes.map((category) => (
                    <SelectItem key={category.category_id} value={category.category_id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-situation">상황별</Label>
            {isLoadingCategories ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={filters.categorySituationId?.toString() || ""}
                onValueChange={(value) => handleCategoryChange("categorySituationId", value)}
              >
                <SelectTrigger id="category-situation">
                  <SelectValue placeholder="상황 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {categorySituations.map((category) => (
                    <SelectItem key={category.category_id} value={category.category_id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-ingredient">재료별</Label>
            {isLoadingCategories ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={filters.categoryIngredientId?.toString() || ""}
                onValueChange={(value) => handleCategoryChange("categoryIngredientId", value)}
              >
                <SelectTrigger id="category-ingredient">
                  <SelectValue placeholder="주 재료 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {categoryIngredients.map((category) => (
                    <SelectItem key={category.category_id} value={category.category_id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-method">방법별</Label>
            {isLoadingCategories ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={filters.categoryMethodId?.toString() || ""}
                onValueChange={(value) => handleCategoryChange("categoryMethodId", value)}
              >
                <SelectTrigger id="category-method">
                  <SelectValue placeholder="조리 방법 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {categoryMethods.map((category) => (
                    <SelectItem key={category.category_id} value={category.category_id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">난이도</h3>
        <Select value={filters.difficulty || ""} onValueChange={handleDifficultyChange}>
          <SelectTrigger id="difficulty">
            <SelectValue placeholder="난이도 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            {difficultyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">태그</h3>
        <div className="flex gap-2">
          <Input
            placeholder="태그 입력..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />
          <Button type="button" size="sm" onClick={handleAddTag}>
            추가
          </Button>
        </div>
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                  <span className="sr-only">태그 삭제</span>
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Button variant="outline" className="w-full" onClick={handleClearFilters}>
        필터 초기화
      </Button>
    </div>
  )
}
