import type { Recipe } from "@/domain/models/recipe"
import type { RecipeFilters, RecipeRepository } from "@/domain/repositories/recipe-repository"

export class GetRecipesUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(filters?: RecipeFilters): Promise<Recipe[]> {
    return this.recipeRepository.getRecipes(filters)
  }
}
