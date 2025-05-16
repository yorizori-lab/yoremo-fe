import MainHero from "@/components/home/main-hero"
import FeaturedRecipes from "@/components/home/featured-recipes"
import RecommendationSection from "@/components/home/recommendation-section"
import MealPlanPreview from "@/components/home/meal-plan-preview"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <MainHero />
      <FeaturedRecipes />
      <RecommendationSection />
      <MealPlanPreview />
    </main>
  )
}
