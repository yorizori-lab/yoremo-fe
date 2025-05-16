import type { Recipe } from "@/domain/models/recipe"
import type { RecipeRepository } from "@/domain/repositories/recipe-repository"

export class CreateRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute(recipe: Recipe): Promise<Recipe> {
    // 비즈니스 로직 검증
    if (!recipe.title) {
      throw new Error("레시피 제목은 필수입니다.")
    }

    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      throw new Error("최소 하나 이상의 재료가 필요합니다.")
    }

    if (!recipe.instructions || recipe.instructions.length === 0) {
      throw new Error("최소 하나 이상의 조리 단계가 필요합니다.")
    }

    return this.recipeRepository.createRecipe(recipe)
  }
}
