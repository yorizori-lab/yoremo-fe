import type { Recipe } from "@/domain/models/recipe"
import type { RecipeFilters, RecipeRepository } from "@/domain/repositories/recipe-repository"

export class RecipeApi implements RecipeRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = "/api/recipes"
  }

  async getRecipes(filters?: RecipeFilters): Promise<Recipe[]> {
    const queryParams = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v))
          } else {
            queryParams.append(key, value.toString())
          }
        }
      })
    }

    const url = `${this.baseUrl}?${queryParams.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("레시피 목록을 가져오는데 실패했습니다.")
    }

    return response.json()
  }

  async getRecipeById(id: number): Promise<Recipe | null> {
    const response = await fetch(`${this.baseUrl}/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error("레시피를 가져오는데 실패했습니다.")
    }

    return response.json()
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })

    if (!response.ok) {
      throw new Error("레시피 생성에 실패했습니다.")
    }

    return response.json()
  }

  async updateRecipe(id: number, recipe: Recipe): Promise<Recipe> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })

    if (!response.ok) {
      throw new Error("레시피 업데이트에 실패했습니다.")
    }

    return response.json()
  }

  async deleteRecipe(id: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("레시피 삭제에 실패했습니다.")
    }

    return true
  }

  async getRecommendedRecipes(ingredients: string[]): Promise<Recipe[]> {
    const queryParams = new URLSearchParams()
    ingredients.forEach((ingredient) => queryParams.append("ingredient", ingredient))

    const url = `${this.baseUrl}/recommendations?${queryParams.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("추천 레시피를 가져오는데 실패했습니다.")
    }

    return response.json()
  }
}
