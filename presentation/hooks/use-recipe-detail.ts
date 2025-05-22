import { useState, useEffect } from "react"
import { Recipe } from "@/domain/models/recipe"
import { RecipeApi } from "@/infrastructure/api/recipe-api"
import { Category } from "@/domain/models/category"
import { 
  getCategoryTypes, 
  getCategorySituations, 
  getCategoryIngredients, 
  getCategoryMethods 
} from "@/infrastructure/api/repositories/category-repository"

export function useRecipeDetail(recipeId: number) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // 카테고리 데이터 상태
  const [categoryTypes, setCategoryTypes] = useState<Category[]>([])
  const [categorySituations, setCategorySituations] = useState<Category[]>([])
  const [categoryIngredients, setCategoryIngredients] = useState<Category[]>([])
  const [categoryMethods, setCategoryMethods] = useState<Category[]>([])
  
  const recipeApi = new RecipeApi()
  
  // 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const [types, situations, ingredients, methods] = await Promise.all([
          getCategoryTypes(),
          getCategorySituations(),
          getCategoryIngredients(),
          getCategoryMethods()
        ]);
        
        setCategoryTypes(types)
        setCategorySituations(situations)
        setCategoryIngredients(ingredients)
        setCategoryMethods(methods)
      } catch (error) {
        console.error('카테고리 데이터를 가져오는 중 오류 발생:', error)
      }
    }

    fetchCategoryData()
  }, [])
  
  // 레시피 데이터 가져오기
  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const recipeData = await recipeApi.getRecipeById(recipeId)
        if (recipeData) {
          // 카테고리 ID를 이름으로 변환
          const updatedRecipe = {
            ...recipeData,
            // 카테고리 ID를 문자열로 변환하여 비교
            category_type: getCategoryName(categoryTypes, recipeData.category_type_id || recipeData.category_type),
            category_situation: getCategoryName(categorySituations, recipeData.category_situation_id || recipeData.category_situation),
            category_ingredient: getCategoryName(categoryIngredients, recipeData.category_ingredient_id || recipeData.category_ingredient),
            category_method: getCategoryName(categoryMethods, recipeData.category_method_id || recipeData.category_method)
          }
          setRecipe(updatedRecipe)
        } else {
          setError("레시피를 찾을 수 없습니다.")
        }
      } catch (err) {
        setError("레시피를 불러오는 중 오류가 발생했습니다.")
        console.error("Error fetching recipe:", err)
      } finally {
        setIsLoading(false)
      }
    }
    
    // 카테고리 데이터가 모두 로드된 후에 레시피 데이터 가져오기
    if (categoryTypes.length > 0 && 
        categorySituations.length > 0 && 
        categoryIngredients.length > 0 && 
        categoryMethods.length > 0) {
      fetchRecipe()
    }
  }, [recipeId, categoryTypes, categorySituations, categoryIngredients, categoryMethods])
  
  // 카테고리 ID를 이름으로 변환하는 함수
  const getCategoryName = (categories: Category[], categoryId: string | number | null | undefined): string => {
    if (!categoryId) return "";
    
    // 문자열로 변환하여 비교 (API에서 문자열로 반환될 수도 있고 숫자로 반환될 수도 있음)
    const category = categories.find(c => c.category_id.toString() === categoryId.toString());
    return category ? category.name : "";
  }
  
  return {
    recipe,
    isLoading,
    error
  }
} 