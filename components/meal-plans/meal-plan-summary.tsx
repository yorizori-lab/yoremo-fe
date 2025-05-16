"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Calendar, Utensils, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 임시 데이터 - 실제로는 API에서 가져와야 함
const dummyNutrition = {
  calories: 2100,
  protein: 95,
  carbs: 240,
  fat: 70,
}

const dummyIngredients = [
  { name: "닭가슴살", amount: 500, unit: "g" },
  { name: "소고기", amount: 300, unit: "g" },
  { name: "양파", amount: 2, unit: "개" },
  { name: "당근", amount: 1, unit: "개" },
  { name: "감자", amount: 3, unit: "개" },
  { name: "파", amount: 1, unit: "단" },
  { name: "마늘", amount: 5, unit: "쪽" },
  { name: "김치", amount: 200, unit: "g" },
  { name: "쌀", amount: 2, unit: "컵" },
  { name: "파스타면", amount: 200, unit: "g" },
]

export default function MealPlanSummary() {
  const [nutrition] = useState(dummyNutrition)
  const [ingredients] = useState(dummyIngredients)
  const { toast } = useToast()

  const handleAddToCart = () => {
    // 실제 구현에서는 장바구니에 추가하는 API 호출
    toast({
      title: "장바구니에 추가됨",
      description: "식단에 필요한 재료가 장바구니에 추가되었습니다.",
    })
  }

  const handleDownloadPlan = () => {
    // 실제 구현에서는 PDF 다운로드 등의 기능
    toast({
      title: "식단 다운로드",
      description: "식단이 다운로드되었습니다.",
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>식단 요약</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">영양 정보 (일일 평균)</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">칼로리</p>
                <p className="font-medium">{nutrition.calories} kcal</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">단백질</p>
                <p className="font-medium">{nutrition.protein}g</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">탄수화물</p>
                <p className="font-medium">{nutrition.carbs}g</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">지방</p>
                <p className="font-medium">{nutrition.fat}g</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">필요한 재료</h3>
              <Badge variant="outline">{ingredients.length}개</Badge>
            </div>
            <div className="max-h-60 overflow-y-auto pr-2">
              <div className="space-y-1">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between text-sm py-1 border-b">
                    <span>{ingredient.name}</span>
                    <span>
                      {ingredient.amount} {ingredient.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            장바구니에 추가
          </Button>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleDownloadPlan}>
              <Download className="mr-2 h-4 w-4" />
              다운로드
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/meal-plans/create">
                <Calendar className="mr-2 h-4 w-4" />새 식단
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>추천 레시피</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {["닭가슴살 샐러드", "소고기 불고기", "해물 파스타"].map((recipe, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                <div className="w-8 h-8 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img
                    src={`/placeholder.svg?height=100&width=100&text=${index + 1}`}
                    alt={recipe}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm">{recipe}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/recipes">
              <Utensils className="mr-2 h-4 w-4" />더 많은 레시피
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
