import RecipeForm from "@/components/recipes/recipe-form"

export default function CreateRecipePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">레시피 등록</h1>
      <RecipeForm />
    </div>
  )
}
