import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 임시 데이터 - 실제로는 API에서 가져와야 함
const weeklyMeals = {
  monday: [
    { type: "아침", name: "그릭 요거트 & 그래놀라" },
    { type: "점심", name: "닭가슴살 샐러드" },
    { type: "저녁", name: "소고기 불고기" },
  ],
  tuesday: [
    { type: "아침", name: "아보카도 토스트" },
    { type: "점심", name: "비빔밥" },
    { type: "저녁", name: "해물 파스타" },
  ],
  wednesday: [
    { type: "아침", name: "오트밀 & 과일" },
    { type: "점심", name: "김치찌개" },
    { type: "저녁", name: "닭고기 커리" },
  ],
}

export default function MealPlanPreview() {
  return (
    <div className="py-8 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">주간 식단 미리보기</h2>
        <Link href="/meal-plans" className="text-primary hover:underline">
          전체 식단 보기
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>이번 주 추천 식단</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monday">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="monday">월요일</TabsTrigger>
              <TabsTrigger value="tuesday">화요일</TabsTrigger>
              <TabsTrigger value="wednesday">수요일</TabsTrigger>
            </TabsList>

            {Object.entries(weeklyMeals).map(([day, meals]) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {meals.map((meal, index) => (
                    <Card key={index}>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm font-medium">{meal.type}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p>{meal.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/recipes?search=${encodeURIComponent(meals[0].name)}`}>레시피 보기</Link>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-6 flex justify-center">
            <Button asChild>
              <Link href="/meal-plans/create">나만의 식단 만들기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
