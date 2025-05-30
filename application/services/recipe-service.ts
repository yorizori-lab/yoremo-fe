import { Recipe } from "@/domain/models/recipe"
import { RecipeRepository } from "@/domain/repositories/recipe-repository"
import { RecipeApi } from "@/infrastructure/api/recipe-api"

export class RecipeService {
  private recipeRepository: RecipeRepository

  constructor(recipeRepository?: RecipeRepository) {
    this.recipeRepository = recipeRepository || new RecipeApi()
  }

  async getRecipeById(id: number): Promise<Recipe | null> {
    return this.recipeRepository.getRecipeById(id)
  }

  async addRecipeToCart(recipeId: number): Promise<boolean> {
    try {
      // 실제 장바구니 추가 로직은 백엔드 API 호출이 필요
      // 지금은 더미 로직으로 구현
      return true
    } catch (error) {
      console.error("장바구니 추가 실패:", error)
      return false
    }
  }

  async addRecipeToMealPlan(recipeId: number, date: Date): Promise<boolean> {
    try {
      // 실제 식단 계획 추가 로직은 백엔드 API 호출이 필요
      // 지금은 더미 로직으로 구현
      return true
    } catch (error) {
      console.error("식단 계획 추가 실패:", error)
      return false
    }
  }
} 