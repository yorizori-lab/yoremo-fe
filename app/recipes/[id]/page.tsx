"use client"

import { useParams } from "next/navigation"
import { useRecipeDetail } from "@/presentation/hooks/use-recipe-detail"
import RecipeDetail from "@/components/recipes/recipe-detail"

export default function RecipeDetailPage() {
  const params = useParams()
  const recipeId = Number(params.id)
  
  const { recipe, isLoading, error } = useRecipeDetail(recipeId)
  
  const handleAddToCart = () => {
    // 장바구니 추가 로직 구현
    alert("장바구니에 추가되었습니다.")
  }
  
  const handleAddToMealPlan = () => {
    // 식단 계획에 추가 로직 구현
    alert("식단 계획에 추가되었습니다.")
  }
  
  return (
    <main className="container py-8">
      <RecipeDetail 
        recipe={recipe}
        isLoading={isLoading}
        error={error}
        onAddToCart={handleAddToCart}
        onAddToMealPlan={handleAddToMealPlan}
      />
    </main>
  )
} 