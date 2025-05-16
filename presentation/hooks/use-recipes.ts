"use client"

import { useState, useEffect } from "react"
import type { Recipe } from "@/domain/models/recipe"
import type { RecipeFilters } from "@/domain/repositories/recipe-repository"
import { GetRecipesUseCase } from "@/application/use-cases/recipe/get-recipes"
import { RecipeApi } from "@/infrastructure/api/recipe-api"

export function useRecipes(initialFilters?: RecipeFilters) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filters, setFilters] = useState<RecipeFilters>(initialFilters || {})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      setError(null)

      try {
        const recipeRepository = new RecipeApi()
        const getRecipesUseCase = new GetRecipesUseCase(recipeRepository)
        const result = await getRecipesUseCase.execute(filters)
        setRecipes(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("레시피를 불러오는데 실패했습니다."))
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [filters])

  const updateFilters = (newFilters: Partial<RecipeFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  return { recipes, loading, error, filters, updateFilters }
}
