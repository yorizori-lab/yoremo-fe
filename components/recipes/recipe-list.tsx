"use client"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"
import { useRecipes } from "@/presentation/hooks/use-recipes"
import type { Recipe } from "@/domain/models/recipe"

export default function RecipeList() {
  const { recipes, loading, error } = useRecipes()

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive">레시피를 불러오는데 실패했습니다.</p>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  if (loading) {
    return <RecipeListSkeleton />
  }

  if (recipes.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl font-medium">레시피가 없습니다.</p>
        <p className="text-muted-foreground mt-2">새로운 레시피를 등록해보세요!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-muted-foreground">총 {recipes.length}개의 레시피</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe_id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

// 임시 데이터를 위한 타입 확장
interface RecipeWithExtra extends Partial<Recipe> {
  recipe_id: number
  title: string
  image_url?: string
  cook_time?: number | null
  serving_size?: number | null
  difficulty?: string | null
  category_type?: number | null
}

// 카테고리 매핑 (실제로는 API에서 가져와야 함)
const categoryMap: Record<number, string> = {
  1: "한식",
  2: "양식",
  3: "중식",
  4: "일식",
}

function RecipeCard({ recipe }: { recipe: RecipeWithExtra }) {
  // 실제 API 데이터가 없는 경우를 위한 임시 데이터
  const dummyRecipes = [
    {
      recipe_id: 1,
      title: "매콤한 김치찌개",
      image_url: "/placeholder.svg?height=300&width=400",
      cook_time: 30,
      serving_size: 4,
      difficulty: "쉬움",
      category_type: 1,
    },
    {
      recipe_id: 2,
      title: "크림 파스타",
      image_url: "/placeholder.svg?height=300&width=400",
      cook_time: 20,
      serving_size: 2,
      difficulty: "쉬움",
      category_type: 2,
    },
    {
      recipe_id: 3,
      title: "소고기 불고기",
      image_url: "/placeholder.svg?height=300&width=400",
      cook_time: 40,
      serving_size: 4,
      difficulty: "보통",
      category_type: 1,
    },
    {
      recipe_id: 4,
      title: "해물 볶음밥",
      image_url: "/placeholder.svg?height=300&width=400",
      cook_time: 25,
      serving_size: 2,
      difficulty: "쉬움",
      category_type: 3,
    },
  ]

  // 실제 데이터가 없는 경우 더미 데이터에서 찾기
  const dummyRecipe = dummyRecipes.find((r) => r.recipe_id === recipe.recipe_id)
  const displayRecipe = {
    ...dummyRecipe,
    ...recipe,
  }

  return (
    <Link href={`/recipes/${recipe.recipe_id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={displayRecipe.image_url || "/placeholder.svg?height=300&width=400"}
            alt={displayRecipe.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{displayRecipe.title}</CardTitle>
            {displayRecipe.category_type && (
              <Badge variant="outline">{categoryMap[displayRecipe.category_type] || "기타"}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center text-sm text-muted-foreground">
            {displayRecipe.cook_time && (
              <>
                <Clock className="mr-1 h-4 w-4" />
                <span className="mr-4">{displayRecipe.cook_time}분</span>
              </>
            )}
            {displayRecipe.serving_size && (
              <>
                <Users className="mr-1 h-4 w-4" />
                <span>{displayRecipe.serving_size}인분</span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {displayRecipe.difficulty && <Badge variant="secondary">{displayRecipe.difficulty}</Badge>}
        </CardFooter>
      </Card>
    </Link>
  )
}

function RecipeListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="h-full overflow-hidden">
          <div className="aspect-video w-full bg-muted animate-pulse" />
          <CardHeader className="p-4">
            <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-4 bg-muted animate-pulse rounded w-1/2 mb-2" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="h-6 bg-muted animate-pulse rounded w-16" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
