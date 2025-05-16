"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { useRecipes } from "@/presentation/hooks/use-recipes"

// 카테고리 데이터 (실제로는 API에서 가져와야 함)
const categoryTypes = [
  { id: 1, name: "한식" },
  { id: 2, name: "양식" },
  { id: 3, name: "중식" },
  { id: 4, name: "일식" },
]

const categorySituations = [
  { id: 5, name: "일상" },
  { id: 6, name: "손님초대" },
  { id: 7, name: "술안주" },
  { id: 8, name: "간식" },
]

const categoryIngredients = [
  { id: 9, name: "돼지고기" },
  { id: 10, name: "소고기" },
  { id: 11, name: "해산물" },
  { id: 12, name: "채소" },
]

const categoryMethods = [
  { id: 13, name: "볶음" },
  { id: 14, name: "구이" },
  { id: 15, name: "찜" },
  { id: 16, name: "튀김" },
]

const difficultyOptions = ["쉬움", "보통", "어려움"]

export default function RecipeFilters() {
  const { filters, updateFilters } = useRecipes()
  const [searchTerm, setSearchTerm] = useState(filters.search || "")
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || [])
  const [tagInput, setTagInput] = useState("")

  const handleSearch = () => {
    updateFilters({ search: searchTerm })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleCategoryChange = (type: string, value: string) => {
    updateFilters({ [type]: value ? Number.parseInt(value) : undefined })
  }

  const handleDifficultyChange = (value: string) => {
    updateFilters({ difficulty: value || undefined })
  }

  const handleAddTag = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      const newTags = [...selectedTags, tagInput]
      setSelectedTags(newTags)
      updateFilters({ tags: newTags })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag)
    setSelectedTags(newTags)
    updateFilters({ tags: newTags.length > 0 ? newTags : undefined })
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedTags([])
    updateFilters({
      search: undefined,
      category_type: undefined,
      category_situation: undefined,
      category_ingredient: undefined,
      category_method: undefined,
      difficulty: undefined,
      tags: undefined,
    })
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
            <Select
              value={filters.category_type?.toString() || ""}
              onValueChange={(value) => handleCategoryChange("category_type", value)}
            >
              <SelectTrigger id="category-type">
                <SelectValue placeholder="종류 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {categoryTypes.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-situation">상황별</Label>
            <Select
              value={filters.category_situation?.toString() || ""}
              onValueChange={(value) => handleCategoryChange("category_situation", value)}
            >
              <SelectTrigger id="category-situation">
                <SelectValue placeholder="상황 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {categorySituations.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-ingredient">재료별</Label>
            <Select
              value={filters.category_ingredient?.toString() || ""}
              onValueChange={(value) => handleCategoryChange("category_ingredient", value)}
            >
              <SelectTrigger id="category-ingredient">
                <SelectValue placeholder="주 재료 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {categoryIngredients.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-method">방법별</Label>
            <Select
              value={filters.category_method?.toString() || ""}
              onValueChange={(value) => handleCategoryChange("category_method", value)}
            >
              <SelectTrigger id="category-method">
                <SelectValue placeholder="조리 방법 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {categoryMethods.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <SelectItem key={option} value={option}>
                {option}
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
