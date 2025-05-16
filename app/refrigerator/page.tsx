import RefrigeratorIngredients from "@/components/refrigerator/refrigerator-ingredients"
import RecipeRecommendations from "@/components/refrigerator/recipe-recommendations"

export default function RefrigeratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">냉장고 재료 기반 추천</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <RefrigeratorIngredients />
        </div>
        <div className="lg:col-span-2">
          <RecipeRecommendations />
        </div>
      </div>
    </div>
  )
}
