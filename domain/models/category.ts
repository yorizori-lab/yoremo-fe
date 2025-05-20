// 카테고리 도메인 모델
export interface Category {
  category_id: number;
  name: string;
  category_type: string;
  description: string;
}

// 카테고리 타입 상수
export const CATEGORY_TYPES = {
  TYPE: 'TYPE',
  SITUATION: 'SITUATION',
  INGREDIENT: 'INGREDIENT',
  METHOD: 'METHOD'
}; 