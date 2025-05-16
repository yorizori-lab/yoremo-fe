"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 임시 데이터 - 실제로는 API에서 가져와야 함
const dummyRecommendations = [
  {
    id: 1,
    title: "김치볶음밥",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 15,
    servings: 2,
    difficulty: "쉬움",
    category: "한식",
    matchedIngredients: ["김치", "밥", "파"],
    missingIngredients: ["햄", "계란"],
  },
  {
    id: 2,
    title: "된장찌개",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 25,
    servings: 4,
    difficulty: "쉬움",
    category: "한식",
    matchedIngredients: ["된장", "두부", "감자", "파"],
    missingIngredients: ["양파", "버섯"],
  },
  {
    id: 3,
    title: "계란말이",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 10,
    servings: 2,
    difficulty: "쉬움",
    category: "한식",
    matchedIngredients: ["계란", "파"],
    missingIngredients: ["당근", "시금치"],
  },
  {
    id: 4,
    title: "감자채볶음",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 20,
    servings: 3,
    difficulty: "쉬움",
    category: "한식",
    matchedIngredients: ["감자", "당근", "파"],
    missingIngredients: ["양파", "소시지"],
  },
]

export default function RecipeRecommendations() {
  const [recommendations, setRecommendations] = useState(dummyRecommendations)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // 실제 구현에서는 선택된 재료에 따라 API 호출
  useEffect(() => {
    // 여기서 API 호출을 시뮬레이션
    setLoading(true)
    setTimeout(() => {
      setRecommendations(dummyRecommendations)
      setLoading(false)
    }, 500)
  }, [])

  const handleAddToCart = (recipeId: number, missingIngredients: string[]) => {
    // 실제 구현에서는 장바구니에 추가하는 API 호출
    toast({
      title: "장바구니에 추가됨",
      description: `${missingIngredients.join(", ")}이(가) 장바구니에 추가되었습니다.`,
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">추천 레시피</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-muted animate-pulse" />
              <CardHeader className="p-4">
                <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-4 bg-muted animate-pulse rounded w-1/2 mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">추천 레시피</h2>
        <Badge variant="outline" className="px-3">
          {recommendations.length}개 찾음
        </Badge>
      </div>

      {recommendations.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium mb-2">추천 레시피가 없습니다.</p>
            <p className="text-muted-foreground mb-4">다른 재료를 추가해보세요.</p>
            <Button asChild>
              <Link href="/recipes">모든 레시피 보기</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge>{recipe.category}</Badge>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">
                  <Link href={`/recipes/${recipe.id}`} className="hover:underline">
                    {recipe.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="mr-4">{recipe.cookTime}분</span>
                  <Users className="mr-1 h-4 w-4" />
                  <span>{recipe.servings}인분</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium">있는 재료:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recipe.matchedIngredients.map((ingredient) => (
                        <Badge key={ingredient} variant="secondary" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium">필요한 재료:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recipe.missingIngredients.map((ingredient) => (
                        <Badge key={ingredient} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/recipes/${recipe.id}`}>레시피 보기</Link>
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleAddToCart(recipe.id, recipe.missingIngredients)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  장바구니 추가
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
