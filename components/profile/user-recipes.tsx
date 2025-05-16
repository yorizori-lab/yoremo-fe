"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, Users, MoreHorizontal, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 임시 데이터 - 실제로는 API에서 가져와야 함
const dummyRecipes = [
  {
    id: 1,
    title: "김치찌개",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 30,
    servings: 4,
    difficulty: "쉬움",
    category: "한식",
    status: "published",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "된장찌개",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 25,
    servings: 4,
    difficulty: "쉬움",
    category: "한식",
    status: "published",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    title: "스파게티 카르보나라",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 20,
    servings: 2,
    difficulty: "중간",
    category: "양식",
    status: "draft",
    createdAt: "2024-04-05",
  },
  {
    id: 4,
    title: "닭가슴살 샐러드",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 15,
    servings: 1,
    difficulty: "쉬움",
    category: "샐러드",
    status: "published",
    createdAt: "2024-01-10",
  },
]

const dummyFavorites = [
  {
    id: 5,
    title: "소고기 불고기",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 40,
    servings: 4,
    difficulty: "중간",
    category: "한식",
    author: "맛있는레시피",
    createdAt: "2024-02-05",
  },
  {
    id: 6,
    title: "해물 파스타",
    image: "/placeholder.svg?height=300&width=400",
    cookTime: 25,
    servings: 2,
    difficulty: "중간",
    category: "양식",
    author: "파스타장인",
    createdAt: "2024-03-12",
  },
]

export default function UserRecipes() {
  const [myRecipes, setMyRecipes] = useState(dummyRecipes)
  const [favorites, setFavorites] = useState(dummyFavorites)
  const { toast } = useToast()

  const handleDeleteRecipe = (id: number) => {
    setMyRecipes(myRecipes.filter((recipe) => recipe.id !== id))
    toast({
      title: "레시피 삭제",
      description: "레시피가 삭제되었습니다.",
    })
  }

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((recipe) => recipe.id !== id))
    toast({
      title: "즐겨찾기 삭제",
      description: "즐겨찾기에서 레시피가 삭제되었습니다.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>내 레시피</CardTitle>
        <Button asChild>
          <Link href="/recipes/create">
            <Plus className="mr-2 h-4 w-4" />새 레시피
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="my-recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-recipes">내 레시피</TabsTrigger>
            <TabsTrigger value="favorites">즐겨찾기</TabsTrigger>
          </TabsList>

          <TabsContent value="my-recipes" className="mt-4">
            {myRecipes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">아직 등록한 레시피가 없습니다.</p>
                <Button asChild>
                  <Link href="/recipes/create">첫 레시피 등록하기</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myRecipes.map((recipe) => (
                  <div key={recipe.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Badge variant={recipe.status === "published" ? "default" : "secondary"}>
                          {recipe.status === "published" ? "발행됨" : "임시저장"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{recipe.title}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/recipes/${recipe.id}`}>보기</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/recipes/${recipe.id}/edit`}>수정</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteRecipe(recipe.id)}>삭제</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="mr-1 h-4 w-4" />
                        <span className="mr-4">{recipe.cookTime}분</span>
                        <Users className="mr-1 h-4 w-4" />
                        <span>{recipe.servings}인분</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{recipe.category}</Badge>
                        <span className="text-xs text-muted-foreground">{recipe.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-4">
            {favorites.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">아직 즐겨찾기한 레시피가 없습니다.</p>
                <Button asChild variant="outline">
                  <Link href="/recipes">레시피 둘러보기</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((recipe) => (
                  <div key={recipe.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{recipe.title}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/recipes/${recipe.id}`}>보기</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRemoveFavorite(recipe.id)}>
                              즐겨찾기 삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="mr-1 h-4 w-4" />
                        <span className="mr-4">{recipe.cookTime}분</span>
                        <Users className="mr-1 h-4 w-4" />
                        <span>{recipe.servings}인분</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{recipe.category}</Badge>
                        <span className="text-xs text-muted-foreground">by {recipe.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
