import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Refrigerator, Calendar } from "lucide-react"

export default function RecommendationSection() {
  return (
    <div className="py-8 mb-12">
      <h2 className="text-2xl font-bold mb-6">맞춤 추천</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Refrigerator className="h-5 w-5 mr-2" />
              냉장고 재료 기반 추천
            </CardTitle>
            <CardDescription>가지고 있는 재료로 만들 수 있는 레시피를 찾아보세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="냉장고 재료 기반 추천"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              냉장고에 있는 재료를 입력하면 만들 수 있는 레시피를 추천해 드립니다. 남은 재료를 활용하여 맛있는 요리를
              만들어 보세요.
            </p>
            <Button asChild className="w-full">
              <Link href="/refrigerator">재료 입력하기</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              식단 관리
            </CardTitle>
            <CardDescription>균형 잡힌 식단을 계획하고 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="식단 관리"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              일주일 식단을 미리 계획하고 필요한 재료를 장바구니에 추가할 수 있습니다. 건강한 식습관을 위한 첫 걸음을
              시작하세요.
            </p>
            <Button asChild className="w-full">
              <Link href="/meal-plans">식단 계획하기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
