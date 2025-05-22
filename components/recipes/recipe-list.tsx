"use client"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"
import { useRecipes } from "@/presentation/hooks/use-recipes"
import type { Recipe } from "@/domain/models/recipe"
import type { RecipeFilters } from "@/domain/repositories/recipe-repository"
import { useEffect } from "react"
import { Pagination } from "@/components/ui/pagination"

export interface RecipeListProps {
  initialFilters?: RecipeFilters;
}

export default function RecipeList({ initialFilters }: RecipeListProps) {
  const { recipes, loading, error, refreshData, pagination, changePage } = useRecipes(initialFilters)
  
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    refreshData();
  }, [refreshData, initialFilters]);

  if (error) {
    console.error("레시피 목록 에러:", error);
    return (
      <div className="p-8 text-center">
        <p className="text-destructive">레시피를 불러오는데 실패했습니다.</p>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  // 로딩 중일 때는 항상 스켈레톤 표시 (초기 로딩일 때만)
  if (loading && recipes.length === 0) {
    return <RecipeListSkeleton />
  }
  
  if (!loading && recipes.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl font-medium">레시피가 없습니다.</p>
        <p className="text-muted-foreground mt-2">새로운 레시피를 등록해보세요!</p>
      </div>
    )
  }
  
  // 페이지 번호는 0부터 시작하므로 화면 표시용으로 +1
  const displayPageNumber = pagination.number + 1;
  const totalPages = pagination.totalPages;
  const totalItems = pagination.totalElements;
  
  return (
    <div className={loading ? "opacity-70 pointer-events-none" : ""}>
      {/* 전체 영역 - 고정 높이 */}
      <div className="flex flex-col" style={{ minHeight: "780px" }}>
        {/* 레시피 컨테이너 - 카드 크기 고정 */}
        <div className="grid-container">
          {recipes.map((recipe) => (
            <div className="recipe-card-wrapper" key={recipe.recipe_id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
        
        {/* 페이지네이션 - 하단 고정 */}
        <div className="mt-auto pt-4">
          {pagination.totalPages > 1 && (
            <Pagination 
              currentPage={pagination.number} 
              totalPages={pagination.totalPages}
              onPageChange={changePage}
              disabled={loading}
            />
          )}
        </div>
      </div>
      
      {/* 카드 크기 고정을 위한 스타일 */}
      <style jsx global>{`
        .grid-container {
          display: flex;
          flex-wrap: wrap;
          margin: -12px;
        }
        
        .recipe-card-wrapper {
          width: calc(33.333% - 24px);
          margin: 12px;
          height: 294px;
        }
        
        @media (max-width: 1024px) {
          .recipe-card-wrapper {
            width: calc(50% - 24px);
          }
        }
        
        @media (max-width: 640px) {
          .recipe-card-wrapper {
            width: calc(100% - 24px);
          }
        }
      `}</style>
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  // 백엔드 API 응답 필드명에 맞게 조정 (snake_case와 camelCase 모두 지원)
  const recipeId = recipe.recipe_id
  const title = recipe.title
  const imageUrl = recipe.image_url
  const cookTime = recipe.cook_time
  const servingSize = recipe.serving_size
  const categoryType = recipe.category_type
  const difficulty = recipe.difficulty

  if (!title || !recipeId) {
    console.warn("레시피 카드 필수 데이터 누락:", recipe);
    return null;
  }

  return (
    <Link href={`/recipes/${recipeId}`} className="block h-full">
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg?height=300&width=400"}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{title}</CardTitle>
            {categoryType && (
              <Badge variant="outline">{categoryType}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center text-sm text-muted-foreground">
            {cookTime !== undefined && cookTime !== null && (
              <>
                <Clock className="mr-1 h-4 w-4" />
                <span className="mr-4">{cookTime}분</span>
              </>
            )}
            {servingSize && (
              <>
                <Users className="mr-1 h-4 w-4" />
                <span>{servingSize}인분</span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {difficulty && 
            <Badge variant="secondary">
              {difficulty}
            </Badge>
          }
        </CardFooter>
      </Card>
    </Link>
  )
}

function RecipeListSkeleton() {
  return (
    <div className="flex flex-col" style={{ minHeight: "780px" }}>
      <div className="grid-container">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="recipe-card-wrapper" key={index}>
            <Card className="h-full overflow-hidden">
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
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4">
        {/* 스켈레톤에서도 동일한 위치에 페이지네이션 영역 확보 */}
        <div className="py-6"></div>
      </div>
      
      {/* 스켈레톤도 동일한 스타일 적용을 위한 코드 */}
      <style jsx global>{`
        .grid-container {
          display: flex;
          flex-wrap: wrap;
          margin: -12px;
        }
        
        .recipe-card-wrapper {
          width: calc(33.333% - 24px);
          margin: 12px;
          height: 350px;
        }
        
        @media (max-width: 1024px) {
          .recipe-card-wrapper {
            width: calc(50% - 24px);
          }
        }
        
        @media (max-width: 640px) {
          .recipe-card-wrapper {
            width: calc(100% - 24px);
          }
        }
      `}</style>
    </div>
  )
}
