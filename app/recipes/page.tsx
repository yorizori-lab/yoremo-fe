"use client"

import { useState } from "react"
import RecipeList from "@/components/recipes/recipe-list"
import RecipeFilters from "@/components/recipes/recipe-filters"
import { RecipeListSkeleton } from "@/components/recipes/recipe-list-skeleton"
import { RecipeFilters as RecipeFiltersType } from "@/domain/repositories/recipe-repository"

export default function RecipesPage() {
  const [key, setKey] = useState(0);
  const [filters, setFilters] = useState<RecipeFiltersType>({});

  // 필터 변경 시 RecipeList를 강제 새로고침
  const handleFiltersChange = (newFilters: RecipeFiltersType) => {
    setFilters(newFilters);
    setKey(prev => prev + 1); // 키 변경으로 컴포넌트 강제 리렌더링
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">레시피 목록</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <RecipeFilters onFiltersChange={handleFiltersChange} />
        </div>
        <div className="lg:col-span-3">
          {/* key 속성으로 필터 변경 시 강제 리렌더링 */}
          <RecipeList key={key} initialFilters={filters} />
        </div>
      </div>
    </div>
  )
}
