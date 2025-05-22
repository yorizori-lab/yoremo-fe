import type { Recipe } from "@/domain/models/recipe"
import type { RecipeFilters, RecipeRepository, PageResponse } from "@/domain/repositories/recipe-repository"
import { fetchApi } from "./httpClient"

// 백엔드 API 응답 구조에 맞는 인터페이스 추가
interface RecipePageResponse {
  total_count: number
  recipes: Recipe[]
}

export class RecipeApi implements RecipeRepository {
  private apiPath: string

  constructor() {
    this.apiPath = "/recipes/v1"
  }

  async getRecipes(filters?: RecipeFilters): Promise<PageResponse<Recipe>> {
    const queryParams = new URLSearchParams()

    if (filters) {
      // 기본 페이지 크기 설정 (백엔드는 0부터 시작하는 페이지 인덱스를 사용)
      const page = filters.page !== undefined ? filters.page : 0
      const pageSize = filters.pageSize !== undefined ? filters.pageSize : 6
      
      // 페이징 파라미터 추가
      queryParams.append('page', page.toString())
      queryParams.append('pageSize', pageSize.toString())
      
      // 카테고리 ID 파라미터 추가 (백엔드에서 Long 타입으로 처리)
      if (filters.categoryTypeId) {
        queryParams.append('categoryTypeId', filters.categoryTypeId.toString())
      }
      
      if (filters.categorySituationId) {
        queryParams.append('categorySituationId', filters.categorySituationId.toString())
      }
      
      if (filters.categoryIngredientId) {
        queryParams.append('categoryIngredientId', filters.categoryIngredientId.toString())
      }
      
      if (filters.categoryMethodId) {
        queryParams.append('categoryMethodId', filters.categoryMethodId.toString())
      }
      
      // 기타 필터 파라미터 추가
      if (filters.difficulty) {
        queryParams.append('difficulty', filters.difficulty)
      }
      
      // 태그 필터 처리
      if (filters.tags && Array.isArray(filters.tags)) {
        filters.tags.forEach(tag => queryParams.append('tags', tag))
      }
      
      // 검색어 파라미터 추가
      if (filters.search) {
        queryParams.append('search', filters.search)
      }
      
      // 정렬 파라미터는 백엔드에서 처리 방식 확인 필요
      if (filters.sort) {
        queryParams.append('sort', filters.sort)
      }
    }

    try {
      // API 엔드포인트 경로 확인 - 백엔드 API와 일치하는지 확인
      const url = `${this.apiPath}/recipes/search?${queryParams.toString()}`
      console.log(url)
      
      const response = await fetchApi<RecipePageResponse>(url)
      console.log(response)
      // 응답 검증
      if (!response) {
        throw new Error("레시피 목록을 가져오는데 실패했습니다.")
      }

      
      // 백엔드 응답을 PageResponse 형식으로 변환
      const pageResponse: PageResponse<Recipe> = {
        content: response.recipes || [],
        totalCount: response.total_count || 0,
      }
      
      return pageResponse
    } catch (error) {
      console.error("레시피 목록 조회 실패:", error)
      throw new Error("레시피 목록을 가져오는데 실패했습니다.")
    }
  }

  async getRecipeById(id: number): Promise<Recipe | null> {
    try {
      return await fetchApi<Recipe>(`${this.apiPath}/recipes/${id}`)
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        return null
      }
      console.error("레시피 조회 실패:", error)
      throw new Error("레시피를 가져오는데 실패했습니다.")
    }
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    try {
      return await fetchApi<Recipe>(`${this.apiPath}/recipes`, {
        method: "POST",
        body: JSON.stringify(recipe),
      })
    } catch (error) {
      console.error("레시피 생성 실패:", error)
      throw new Error("레시피 생성에 실패했습니다.")
    }
  }

  async updateRecipe(id: number, recipe: Recipe): Promise<Recipe> {
    try {
      return await fetchApi<Recipe>(`${this.apiPath}/recipes/${id}`, {
        method: "PUT",
        body: JSON.stringify(recipe),
      })
    } catch (error) {
      console.error("레시피 업데이트 실패:", error)
      throw new Error("레시피 업데이트에 실패했습니다.")
    }
  }

  async deleteRecipe(id: number): Promise<boolean> {
    try {
      await fetchApi(`${this.apiPath}/recipes/${id}`, {
        method: "DELETE",
      })
      return true
    } catch (error) {
      console.error("레시피 삭제 실패:", error)
      throw new Error("레시피 삭제에 실패했습니다.")
    }
  }

  async getRecommendedRecipes(ingredients: string[]): Promise<Recipe[]> {
    try {
      const queryParams = new URLSearchParams()
      ingredients.forEach((ingredient) => queryParams.append("ingredient", ingredient))

      const url = `${this.apiPath}/recommendations?${queryParams.toString()}`
      return await fetchApi<Recipe[]>(url)
    } catch (error) {
      console.error("추천 레시피 조회 실패:", error)
      throw new Error("추천 레시피를 가져오는데 실패했습니다.")
    }
  }
}
