// 레시피 도메인 모델 정의
export interface Ingredient {
  name: string
  amount: number | null
  unit: string
  notes: string
}

export interface Seasoning {
  name: string
  amount: number | null
  unit: string
}

export interface Instruction {
  step_number: number
  description: string
  image_url: string
}

export interface Recipe {
  recipe_id?: number
  title: string
  description: string | null
  ingredients: Ingredient[]
  seasonings: Seasoning[]
  instructions: Instruction[]
  // 카테고리 이름 필드 (조회용)
  category_type?: string | null
  category_situation?: string | null
  category_ingredient?: string | null
  category_method?: string | null
  // 카테고리 ID 필드 (등록/수정용)
  category_type_id?: number | null
  category_situation_id?: number | null
  category_ingredient_id?: number | null
  category_method_id?: number | null
  prep_time?: number | null
  cook_time?: number | null
  serving_size?: number | null
  difficulty?: string | null
  image_url?: string | null
  tags?: string[] | null
}

export interface Category {
  category_id: number
  name: string
  type: "type" | "situation" | "ingredient" | "method"
}
