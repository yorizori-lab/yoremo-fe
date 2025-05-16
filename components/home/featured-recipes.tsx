import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

// 임시 데이터 - 실제로는 API에서 가져와야 함
const featuredRecipes = [
  {
    id: 1,
    title: "매콤한 김치찌개",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 30,
    servings: 4,
    difficulty: "쉬움",
    category: "한식",
  },
  {
    id: 2,
    title: "크림 파스타",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 20,
    servings: 2,
    difficulty: "쉬움",
    category: "양식",
  },
  {
    id: 3,
    title: "소고기 불고기",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 40,
    servings: 4,
    difficulty: "보통",
    category: "한식",
  },
  {
    id: 4,
    title: "해물 볶음밥",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 25,
    servings: 2,
    difficulty: "쉬움",
    category: "중식",
  },
]

export default function FeaturedRecipes() {
  return (
    <div className="py-8 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">인기 레시피</h2>
        <Link href="/recipes" className="text-primary hover:underline">
          더 보기
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredRecipes.map((recipe) => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{recipe.title}</CardTitle>
                  <Badge variant="outline">{recipe.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="mr-4">{recipe.cookTime}분</span>
                  <Users className="mr-1 h-4 w-4" />
                  <span>{recipe.servings}인분</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Badge variant="secondary">{recipe.difficulty}</Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
