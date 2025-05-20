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
  recipeId?: number
  title: string
  description: string | null
  ingredients: Ingredient[]
  seasonings: Seasoning[]
  instructions: Instruction[]
  category_type?: string | null
  categoryType?: string | null
  category_situation?: string | null
  categorySituation?: string | null
  category_ingredient?: string | null
  categoryIngredient?: string | null
  category_method?: string | null
  categoryMethod?: string | null
  prep_time?: number | null
  prepTime?: number | null
  cook_time?: number | null
  cookTime?: number | null
  serving_size?: number | null
  servingSize?: number | null
  difficulty?: string | null
  image_url?: string | null
  imageUrl?: string | null
  tags?: string[] | null
  created_at?: string
  createdAt?: string
  updated_at?: string
  updatedAt?: string
}

export interface Category {
  category_id: number
  name: string
  type: "type" | "situation" | "ingredient" | "method"
}
