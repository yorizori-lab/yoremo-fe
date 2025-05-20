import { fetchApi } from '../httpClient';
import { Category, CATEGORY_TYPES } from '../../../domain/models/category';

// 카테고리 타입에 따라 데이터를 가져오는 공통 함수
const getCategoriesByType = async (categoryType: string): Promise<Category[]> => {
  try {
    
    // API 호출
    const response = await fetchApi<any>(`/categories/v1/categories?category_type=${categoryType}`);
    
    // categories 키에 있는 배열 반환
    return response.categories || [];
  } catch (error) {
    console.error(`${categoryType} 카테고리를 가져오는 중 오류 발생:`, error);
    return [];
  }
};

// 종류별 카테고리 가져오기 (한식, 양식, 중식, 일식 등)
export const getCategoryTypes = async (): Promise<Category[]> => {
  return getCategoriesByType(CATEGORY_TYPES.TYPE);
};

// 상황별 카테고리 가져오기 
export const getCategorySituations = async (): Promise<Category[]> => {
  return getCategoriesByType(CATEGORY_TYPES.SITUATION);
};

// 재료별 카테고리 가져오기
export const getCategoryIngredients = async (): Promise<Category[]> => {
  return getCategoriesByType(CATEGORY_TYPES.INGREDIENT);
};

// 조리 방법별 카테고리 가져오기
export const getCategoryMethods = async (): Promise<Category[]> => {
  return getCategoriesByType(CATEGORY_TYPES.METHOD);
}; 