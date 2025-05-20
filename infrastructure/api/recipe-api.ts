import type { Recipe } from "@/domain/models/recipe"
import type { RecipeFilters, RecipeRepository, PageResponse } from "@/domain/repositories/recipe-repository"
import { fetchApi } from "./httpClient"

// 백엔드 API 응답 구조에 맞는 인터페이스 추가
interface RecipePageResponse {
  recipes: Recipe[]
  total_elements: number
  total_pages: number
  number: number
  size: number
  first: boolean
  last: boolean
  empty: boolean
}

export class RecipeApi implements RecipeRepository {
  private apiPath: string

  constructor() {
    this.apiPath = "/recipes/v1"
  }

  async getRecipes(filters?: RecipeFilters): Promise<PageResponse<Recipe>> {
    const queryParams = new URLSearchParams()

    if (filters) {
      // 기본 페이지 크기 설정
      const page = filters.page !== undefined ? filters.page : 0
      const size = filters.size !== undefined ? filters.size : 6
      
      // 페이징 및 정렬 파라미터 추가
      queryParams.append('page', page.toString())
      queryParams.append('size', size.toString())
      
      if (filters.sort) {
        queryParams.append('sort', filters.sort)
      }
      
      // 검색 필터 파라미터 추가
      Object.entries(filters).forEach(([key, value]) => {
        // 페이징 및 정렬 파라미터는 이미 처리했으므로 제외
        if (key !== 'page' && key !== 'size' && key !== 'sort' && 
            value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v))
          } else {
            queryParams.append(key, value.toString())
          }
        }
      })
    }

    try {
      const url = `${this.apiPath}/recipes/search?${queryParams.toString()}`
      
      const response = await fetchApi<any>(url)
      
      // 백엔드 응답 구조에 따라 매핑
      let pageResponse: PageResponse<Recipe>;
      
      // Spring Data 표준 응답 형식 (content 포함)
      if (response && response.content) {
        pageResponse = {
          // 백엔드에서 제공하는 값 그대로 사용
          content: response.content || [],
          totalElements: response.total_elements || 0,
          totalPages: response.total_pages || 1,
          number: response.number || 0,
          size: response.size || 6,
          first: response.first !== undefined ? response.first : response.number === 0,
          last: response.last !== undefined ? response.last : response.number >= (response.total_pages - 1 || 0),
          empty: !response.content || response.content.length === 0
        };
      } 
      // 커스텀 응답 형식 (recipes 필드 포함)
      else if (response && response.recipes) {
        pageResponse = {
          // 백엔드에서 제공하는 값 그대로 사용
          content: response.recipes || [],
          totalElements: response.total_elements || 0,
          totalPages: response.total_pages || 1,
          number: response.number || 0,
          size: response.size || 6,
          first: response.first !== undefined ? response.first : response.number === 0,
          last: response.last !== undefined ? response.last : response.number >= (response.total_pages - 1 || 0),
          empty: !response.recipes || response.recipes.length === 0
        };
      }
      // 배열 응답인 경우
      else if (Array.isArray(response)) {
        // 배열 응답의 경우 페이징 정보가 없으므로 직접 계산
        const recipes = response;
        const pageSize = 6;
        const totalElements = recipes.length;
        const totalPages = Math.max(1, Math.ceil(totalElements / pageSize));
        
        pageResponse = {
          content: recipes,
          totalElements: totalElements,
          totalPages: totalPages,
          number: 0,
          size: pageSize,
          first: true,
          last: totalPages <= 1,
          empty: recipes.length === 0
        };
      }
      // 그 외의 경우 기본값
      else {
        console.error('알 수 없는 API 응답 형식:', response);
        pageResponse = {
          content: [],
          totalElements: 0,
          totalPages: 1,
          number: 0,
          size: 6,
          first: true,
          last: true,
          empty: true
        };
      }
      
      return pageResponse;
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
