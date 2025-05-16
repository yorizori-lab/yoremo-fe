import { Suspense } from "react"
import RecipeList from "@/components/recipes/recipe-list"
import RecipeFilters from "@/components/recipes/recipe-filters"
import { RecipeListSkeleton } from "@/components/recipes/recipe-list-skeleton"

export default function RecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">레시피 목록</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <RecipeFilters />
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<RecipeListSkeleton />}>
            <RecipeList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
