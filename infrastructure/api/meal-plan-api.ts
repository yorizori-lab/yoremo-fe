import type { MealPlan, MealPlanItem } from "@/domain/models/meal-plan"
import type { MealPlanRepository } from "@/domain/repositories/meal-plan-repository"

export class MealPlanApi implements MealPlanRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = "/api/meal-plans"
  }

  async getMealPlans(userId: number): Promise<MealPlan[]> {
    const response = await fetch(`${this.baseUrl}?userId=${userId}`)

    if (!response.ok) {
      throw new Error("식단 목록을 가져오는데 실패했습니다.")
    }

    return response.json()
  }

  async getMealPlanById(id: number): Promise<MealPlan | null> {
    const response = await fetch(`${this.baseUrl}/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error("식단을 가져오는데 실패했습니다.")
    }

    return response.json()
  }

  async createMealPlan(mealPlan: MealPlan): Promise<MealPlan> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealPlan),
    })

    if (!response.ok) {
      throw new Error("식단 생성에 실패했습니다.")
    }

    return response.json()
  }

  async updateMealPlan(id: number, mealPlan: MealPlan): Promise<MealPlan> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealPlan),
    })

    if (!response.ok) {
      throw new Error("식단 업데이트에 실패했습니다.")
    }

    return response.json()
  }

  async deleteMealPlan(id: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("식단 삭제에 실패했습니다.")
    }

    return true
  }

  async addMealPlanItem(mealPlanId: number, item: MealPlanItem): Promise<MealPlanItem> {
    const response = await fetch(`${this.baseUrl}/${mealPlanId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      throw new Error("식단 항목 추가에 실패했습니다.")
    }

    return response.json()
  }

  async removeMealPlanItem(mealPlanId: number, itemId: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${mealPlanId}/items/${itemId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("식단 항목 삭제에 실패했습니다.")
    }

    return true
  }
}
