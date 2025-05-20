import type { Recipe } from "@/domain/models/recipe"
import type { RecipeFilters, RecipeRepository, PageResponse } from "@/domain/repositories/recipe-repository"

export class GetRecipesUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(filters?: RecipeFilters): Promise<PageResponse<Recipe>> {
    return this.recipeRepository.getRecipes(filters)
  }
}
