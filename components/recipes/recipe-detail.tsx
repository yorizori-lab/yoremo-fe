"use client"

import { Clock, User, BarChart, Tag, ShoppingCart } from "lucide-react"
import { Recipe } from "@/domain/models/recipe"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface RecipeDetailProps {
  recipe: Recipe | null
  isLoading: boolean
  error: string | null
  onAddToCart?: () => void
  onAddToMealPlan?: () => void
}

// 난이도를 한글로 변환하는 함수
const getDifficultyLabel = (difficulty: string | undefined | null): string => {
  switch (difficulty) {
    case "EASY":
      return "쉬움"
    case "NORMAL":
      return "보통"
    case "HARD":
      return "어려움"
    default:
      return "미정"
  }
}

export default function RecipeDetail({ recipe, isLoading, error, onAddToCart, onAddToMealPlan }: RecipeDetailProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return <RecipeDetailSkeleton />
  }

  if (!recipe) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">레시피를 찾을 수 없습니다.</h2>
      </div>
    )
  }

  // 총 시간 계산 (준비 시간 + 조리 시간)
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 레시피 헤더 */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        
        <div className="flex flex-wrap gap-2">
          {recipe.category_type && (
            <Badge variant="outline">{recipe.category_type}</Badge>
          )}
          {recipe.category_situation && (
            <Badge variant="outline">{recipe.category_situation}</Badge>
          )}
          {recipe.category_ingredient && (
            <Badge variant="outline">{recipe.category_ingredient}</Badge>
          )}
          {recipe.category_method && (
            <Badge variant="outline">{recipe.category_method}</Badge>
          )}
        </div>
        
        {recipe.description && (
          <p className="text-muted-foreground">{recipe.description}</p>
        )}
      </div>

      {/* 레시피 이미지 */}
      {recipe.image_url && (
        <div className="aspect-video overflow-hidden rounded-lg">
          <img 
            src={recipe.image_url} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 레시피 정보 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">준비 시간</p>
            <p className="font-semibold">{recipe.prep_time ? `${recipe.prep_time}분` : "미정"}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">조리 시간</p>
            <p className="font-semibold">{recipe.cook_time ? `${recipe.cook_time}분` : "미정"}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <User className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">몇인분</p>
            <p className="font-semibold">{recipe.serving_size ? `${recipe.serving_size}인분` : "미정"}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <BarChart className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">난이도</p>
            <p className="font-semibold">{getDifficultyLabel(recipe.difficulty)}</p>
          </CardContent>
        </Card>
      </div>

      {/* 태그 */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <h3 className="font-medium">태그</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* 재료 및 양념 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 재료 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold">재료</h3>
            <ul className="divide-y">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-muted-foreground">
                    {ingredient.amount ? `${ingredient.amount} ${ingredient.unit}` : ingredient.unit}
                    {ingredient.notes ? ` (${ingredient.notes})` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 양념 */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold">양념</h3>
            <ul className="divide-y">
              {recipe.seasonings.map((seasoning, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span className="font-medium">{seasoning.name}</span>
                  <span className="text-muted-foreground">
                    {seasoning.amount ? `${seasoning.amount} ${seasoning.unit}` : seasoning.unit}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 조리 단계 */}
      <Card>
        <CardContent className="pt-6 space-y-6">
          <h3 className="text-lg font-semibold">조리 방법</h3>
          <div className="space-y-6">
            {recipe.instructions.map((instruction) => (
              <div key={instruction.step_number} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center font-medium">
                    {instruction.step_number}
                  </div>
                  <h4 className="font-medium">단계 {instruction.step_number}</h4>
                </div>
                <p>{instruction.description}</p>
                {instruction.image_url && (
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={instruction.image_url} 
                      alt={`단계 ${instruction.step_number}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex flex-wrap gap-4">
        {onAddToCart && (
          <Button onClick={onAddToCart} className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            장바구니에 추가
          </Button>
        )}
        {onAddToMealPlan && (
          <Button variant="outline" onClick={onAddToMealPlan}>
            식단 계획에 추가
          </Button>
        )}
      </div>
    </div>
  )
}

// 로딩 중 스켈레톤 컴포넌트
function RecipeDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-20 w-full" />
      </div>

      <Skeleton className="h-[300px] w-full rounded-lg" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6 text-center">
              <Skeleton className="h-6 w-6 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto mb-2" />
              <Skeleton className="h-5 w-12 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(2).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                {Array(5).fill(0).map((_, j) => (
                  <div key={j} className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-[200px] w-full rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  )
} 