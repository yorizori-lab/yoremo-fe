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
  category_type: number | null
  category_situation: number | null
  category_ingredient: number | null
  category_method: number | null
  prep_time: number | null
  cook_time: number | null
  serving_size: number | null
  difficulty: string | null
  image_url: string | null
  tags: string[] | null
  created_at?: string
  updated_at?: string
}

export interface Category {
  category_id: number
  name: string
  type: "type" | "situation" | "ingredient" | "method"
}
