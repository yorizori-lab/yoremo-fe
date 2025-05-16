import type { MealPlan } from "@/domain/models/meal-plan"
import type { MealPlanRepository } from "@/domain/repositories/meal-plan-repository"

export class CreateMealPlanUseCase {
  constructor(private mealPlanRepository: MealPlanRepository) {}

  async execute(mealPlan: MealPlan): Promise<MealPlan> {
    // 비즈니스 로직 검증
    if (!mealPlan.name) {
      throw new Error("식단 이름은 필수입니다.")
    }

    if (!mealPlan.start_date || !mealPlan.end_date) {
      throw new Error("시작일과 종료일은 필수입니다.")
    }

    return this.mealPlanRepository.createMealPlan(mealPlan)
  }
}
