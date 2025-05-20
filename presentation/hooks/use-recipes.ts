"use client"

import { useState, useEffect, useCallback } from "react"
import type { Recipe } from "@/domain/models/recipe"
import type { RecipeFilters, PageResponse } from "@/domain/repositories/recipe-repository"
import { GetRecipesUseCase } from "@/application/use-cases/recipe/get-recipes"
import { RecipeApi } from "@/infrastructure/api/recipe-api"

// 기본 페이지 크기
const DEFAULT_PAGE_SIZE = 6;

export function useRecipes(initialFilters?: RecipeFilters) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  // 페이징 정보 초기화
  const [pagination, setPagination] = useState<Omit<PageResponse<Recipe>, 'content'>>({
    totalElements: 0,
    totalPages: 1, // 최소 1페이지로 시작
    number: 0,
    size: DEFAULT_PAGE_SIZE,
    first: true,
    last: true,
    empty: true
  })
  // 초기 필터에 페이지 크기 설정
  const [filters, setFilters] = useState<RecipeFilters>(
    initialFilters ? 
    { ...initialFilters, size: initialFilters.size || DEFAULT_PAGE_SIZE } : 
    { page: 0, size: DEFAULT_PAGE_SIZE }
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  // API 호출 함수
  const fetchRecipes = useCallback(async (currentFilters: RecipeFilters) => {
    setLoading(true)
    setError(null)
    
    try {
      const recipeRepository = new RecipeApi()
      const getRecipesUseCase = new GetRecipesUseCase(recipeRepository)
      const result = await getRecipesUseCase.execute(currentFilters)
      
      // 페이징 정보와 레시피 목록 분리하여 저장
      if (result && result.content) {
        const recipes = result.content;
        
        // 레시피가 있으면 설정
        setRecipes(recipes)
        
        // 백엔드에서 제공하는 페이징 정보 그대로 사용
        setPagination({
          totalElements: result.totalElements,
          totalPages: result.totalPages,
          number: result.number,
          size: result.size,
          first: result.first,
          last: result.last,
          empty: recipes.length === 0
        })
      } else {
        console.error('API 응답에 content가 없음');
        setRecipes([])
        setPagination({
          totalElements: 0,
          totalPages: 1,
          number: 0,
          size: DEFAULT_PAGE_SIZE,
          first: true,
          last: true,
          empty: true
        })
      }
    } catch (err) {
      console.error("레시피 가져오기 오류:", err)
      setError(err instanceof Error ? err : new Error("레시피를 불러오는데 실패했습니다."))
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    fetchRecipes(filters);
  }, [fetchRecipes, filters]);

  // 필터 업데이트 함수 - 즉시 API 호출
  const updateFilters = useCallback((newFilters: Partial<RecipeFilters>) => {
    // 페이지 관련 필터가 없으면 첫 페이지로 리셋
    if (newFilters.page === undefined && 
        (newFilters.categoryTypeId !== undefined || 
         newFilters.categorySituationId !== undefined || 
         newFilters.categoryIngredientId !== undefined || 
         newFilters.categoryMethodId !== undefined || 
         newFilters.difficulty !== undefined || 
         newFilters.search !== undefined || 
         newFilters.tags !== undefined)) {
      newFilters.page = 0
    }
    
    // 페이지 크기가 설정되지 않았으면 기본값 사용
    if (newFilters.size === undefined && !filters.size) {
      newFilters.size = DEFAULT_PAGE_SIZE
    }
    
    // 필터 상태 업데이트 및 즉시 API 호출
    setFilters(prev => {
      const updatedFilters = { ...prev, ...newFilters };
      
      // 새 필터로 즉시 데이터 로드
      fetchRecipes(updatedFilters);
      
      return updatedFilters;
    });
  }, [fetchRecipes, filters]);
  
  // 페이지 변경 함수
  const changePage = useCallback((newPage: number) => {
    updateFilters({ page: newPage });
  }, [updateFilters, pagination.number]);

  // 데이터 새로고침 함수 - 현재 필터로 다시 로드
  const refreshData = useCallback(() => {
    fetchRecipes(filters);
  }, [fetchRecipes, filters]);

  return { 
    recipes, 
    loading, 
    error, 
    filters, 
    pagination, 
    updateFilters, 
    changePage, 
    refreshData 
  }
}
