import UserProfile from "@/components/profile/user-profile"
import UserRecipes from "@/components/profile/user-recipes"
import UserMealPlans from "@/components/profile/user-meal-plans"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">마이페이지</h1>
      <div className="grid grid-cols-1 gap-8">
        <UserProfile />
        <UserRecipes />
        <UserMealPlans />
      </div>
    </div>
  )
}
