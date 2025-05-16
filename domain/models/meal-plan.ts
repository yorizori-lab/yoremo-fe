import type { Recipe } from "./recipe"

export interface MealPlanItem {
  id: number
  recipe_id: number
  recipe?: Recipe
  date: string
  meal_type: "breakfast" | "lunch" | "dinner" | "snack"
  servings: number
}

export interface MealPlan {
  id: number
  user_id: number
  name: string
  start_date: string
  end_date: string
  items: MealPlanItem[]
}
