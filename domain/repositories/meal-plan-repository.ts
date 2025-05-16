import type { MealPlan, MealPlanItem } from "../models/meal-plan"

export interface MealPlanRepository {
  getMealPlans(userId: number): Promise<MealPlan[]>
  getMealPlanById(id: number): Promise<MealPlan | null>
  createMealPlan(mealPlan: MealPlan): Promise<MealPlan>
  updateMealPlan(id: number, mealPlan: MealPlan): Promise<MealPlan>
  deleteMealPlan(id: number): Promise<boolean>
  addMealPlanItem(mealPlanId: number, item: MealPlanItem): Promise<MealPlanItem>
  removeMealPlanItem(mealPlanId: number, itemId: number): Promise<boolean>
}
