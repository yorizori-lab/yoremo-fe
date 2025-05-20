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
  totalElements: number
  totalPages: number
  number: number
  size: number
  first: boolean
  last: boolean
  empty: boolean
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
  size?: number
  sort?: string
}
