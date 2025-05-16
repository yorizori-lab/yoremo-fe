import type { Recipe } from "../models/recipe"

export interface RecipeRepository {
  getRecipes(filters?: RecipeFilters): Promise<Recipe[]>
  getRecipeById(id: number): Promise<Recipe | null>
  createRecipe(recipe: Recipe): Promise<Recipe>
  updateRecipe(id: number, recipe: Recipe): Promise<Recipe>
  deleteRecipe(id: number): Promise<boolean>
  getRecommendedRecipes(ingredients: string[]): Promise<Recipe[]>
}

export interface RecipeFilters {
  category_type?: number
  category_situation?: number
  category_ingredient?: number
  category_method?: number
  difficulty?: string
  search?: string
  tags?: string[]
}
