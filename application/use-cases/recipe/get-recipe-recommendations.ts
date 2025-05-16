import type { Recipe } from "@/domain/models/recipe"
import type { RecipeRepository } from "@/domain/repositories/recipe-repository"

export class GetRecipeRecommendationsUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(ingredients: string[]): Promise<Recipe[]> {
    if (!ingredients || ingredients.length === 0) {
      throw new Error("최소 하나 이상의 재료가 필요합니다.")
    }

    return this.recipeRepository.getRecommendedRecipes(ingredients)
  }
}
