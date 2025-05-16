import MealPlanCalendar from "@/components/meal-plans/meal-plan-calendar"
import MealPlanSummary from "@/components/meal-plans/meal-plan-summary"

export default function MealPlansPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">식단 관리</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <MealPlanCalendar />
        </div>
        <div className="lg:col-span-1">
          <MealPlanSummary />
        </div>
      </div>
    </div>
  )
}
