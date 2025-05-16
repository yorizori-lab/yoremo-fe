"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MoreHorizontal, Plus, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 임시 데이터 - 실제로는 API에서 가져와야 함
const dummyMealPlans = [
  {
    id: 1,
    name: "일주일 건강식단",
    startDate: "2025-05-13",
    endDate: "2025-05-19",
    totalRecipes: 15,
    status: "active",
    createdAt: "2025-05-10",
  },
  {
    id: 2,
    name: "저탄수화물 식단",
    startDate: "2025-05-20",
    endDate: "2025-05-26",
    totalRecipes: 12,
    status: "upcoming",
    createdAt: "2025-05-08",
  },
  {
    id: 3,
    name: "지난 주 식단",
    startDate: "2025-05-06",
    endDate: "2025-05-12",
    totalRecipes: 14,
    status: "completed",
    createdAt: "2025-05-03",
  },
]

export default function UserMealPlans() {
  const [mealPlans, setMealPlans] = useState(dummyMealPlans)
  const { toast } = useToast()

  const handleDeleteMealPlan = (id: number) => {
    setMealPlans(mealPlans.filter((plan) => plan.id !== id))
    toast({
      title: "식단 삭제",
      description: "식단이 삭제되었습니다.",
    })
  }

  const handleAddToCart = (id: number) => {
    toast({
      title: "장바구니에 추가됨",
      description: "식단에 필요한 재료가 장바구니에 추가되었습니다.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge>진행 중</Badge>
      case "upcoming":
        return <Badge variant="outline">예정됨</Badge>
      case "completed":
        return <Badge variant="secondary">완료됨</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>내 식단</CardTitle>
        <Button asChild>
          <Link href="/meal-plans/create">
            <Plus className="mr-2 h-4 w-4" />새 식단
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {mealPlans.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">아직 등록한 식단이 없습니다.</p>
            <Button asChild>
              <Link href="/meal-plans/create">첫 식단 만들기</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {mealPlans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{plan.name}</h3>
                      {getStatusBadge(plan.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.startDate} ~ {plan.endDate}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/meal-plans/${plan.id}`}>보기</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/meal-plans/${plan.id}/edit`}>수정</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteMealPlan(plan.id)}>삭제</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{plan.totalRecipes}개 레시피</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/meal-plans/${plan.id}`}>
                        <Calendar className="mr-2 h-4 w-4" />
                        식단 보기
                      </Link>
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleAddToCart(plan.id)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      장바구니
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
