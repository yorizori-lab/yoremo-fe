import type { Recipe } from "../models/recipe"

export interface RecipeRepository {
  getRecipes(filters?: RecipeFilters): Promise<PageResponse<Recipe>>
  getRecipeById(id: number): Promise<Recipe | null>
  createRecipe(recipe: Recipe): Promise<Recipe>
  updateRecipe(id: number, recipe: Recipe): Promise<Recipe>
  deleteRecipe(id: number): Promise<boolean>
  getRecommendedRecipes(ingredients: string[]): Promise<Recipe[]>
}

export interface PageResponse<T> {
  content: T[]
  totalCount: number
}

export interface RecipeFilters {
  categoryTypeId?: number
  categorySituationId?: number
  categoryIngredientId?: number
  categoryMethodId?: number
  difficulty?: string
  search?: string
  tags?: string[]
  page?: number
  pageSize?: number
  sort?: string
}
