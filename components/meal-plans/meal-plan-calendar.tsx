"use client"

import { useState } from "react"
import { format, startOfWeek, addDays, isSameDay } from "date-fns"
import { ko } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// 임시 데이터 - 실제로는 API에서 가져와야 함
const mealTypes = [
  { id: "breakfast", name: "아침" },
  { id: "lunch", name: "점심" },
  { id: "dinner", name: "저녁" },
  { id: "snack", name: "간식" },
]

const dummyMealPlan = {
  id: 1,
  name: "일주일 식단",
  items: [
    {
      id: 1,
      date: "2025-05-16",
      meal_type: "breakfast",
      recipe_id: 1,
      recipe: {
        title: "그릭 요거트 & 그래놀라",
        image_url: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: 2,
      date: "2025-05-16",
      meal_type: "lunch",
      recipe_id: 2,
      recipe: {
        title: "닭가슴살 샐러드",
        image_url: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: 3,
      date: "2025-05-16",
      meal_type: "dinner",
      recipe_id: 3,
      recipe: {
        title: "소고기 불고기",
        image_url: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: 4,
      date: "2025-05-17",
      meal_type: "breakfast",
      recipe_id: 4,
      recipe: {
        title: "아보카도 토스트",
        image_url: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: 5,
      date: "2025-05-17",
      meal_type: "lunch",
      recipe_id: 5,
      recipe: {
        title: "비빔밥",
        image_url: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: 6,
      date: "2025-05-17",
      meal_type: "dinner",
      recipe_id: 6,
      recipe: {
        title: "해물 파스타",
        image_url: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: 7,
      date: "2025-05-18",
      meal_type: "breakfast",
      recipe_id: 7,
      recipe: {
        title: "오트밀 & 과일",
        image_url: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: 8,
      date: "2025-05-18",
      meal_type: "lunch",
      recipe_id: 8,
      recipe: {
        title: "김치찌개",
        image_url: "/placeholder.svg?height=100&width=100",
      },
    },
  ],
}

// 임시 레시피 데이터
const dummyRecipes = [
  { id: 1, title: "그릭 요거트 & 그래놀라" },
  { id: 2, title: "닭가슴살 샐러드" },
  { id: 3, title: "소고기 불고기" },
  { id: 4, title: "아보카도 토스트" },
  { id: 5, title: "비빔밥" },
  { id: 6, title: "해물 파스타" },
  { id: 7, title: "오트밀 & 과일" },
  { id: 8, title: "김치찌개" },
  { id: 9, title: "닭고기 커리" },
  { id: 10, title: "연어 스테이크" },
]

export default function MealPlanCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [mealPlan, setMealPlan] = useState(dummyMealPlan)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null)
  const [isAddMealDialogOpen, setIsAddMealDialogOpen] = useState(false)

  // 현재 주의 시작일 (일요일)
  const startDate = startOfWeek(currentDate, { weekStartsOn: 0 })

  // 이전 주로 이동
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  // 다음 주로 이동
  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  // 오늘로 이동
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // 식단 추가 다이얼로그 열기
  const openAddMealDialog = (date: Date, mealType: string) => {
    setSelectedDate(date)
    setSelectedMealType(mealType)
    setIsAddMealDialogOpen(true)
  }

  // 식단 추가
  const handleAddMeal = (recipeId: number) => {
    if (!selectedDate || !selectedMealType) return

    const dateString = format(selectedDate, "yyyy-MM-dd")
    const newMealItem = {
      id: Math.floor(Math.random() * 1000), // 임시 ID
      date: dateString,
      meal_type: selectedMealType,
      recipe_id: recipeId,
      recipe: dummyRecipes.find((r) => r.id === recipeId),
    }

    setMealPlan({
      ...mealPlan,
      items: [...mealPlan.items, newMealItem],
    })

    setIsAddMealDialogOpen(false)
  }

  // 식단 삭제
  const handleRemoveMeal = (mealItemId: number) => {
    setMealPlan({
      ...mealPlan,
      items: mealPlan.items.filter((item) => item.id !== mealItemId),
    })
  }

  // 날짜별 식단 아이템 가져오기
  const getMealItemsForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return mealPlan.items.filter((item) => item.date === dateString)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            오늘
          </Button>
          <h2 className="text-lg font-medium">
            {format(startDate, "yyyy년 MM월 dd일", { locale: ko })} ~{" "}
            {format(addDays(startDate, 6), "yyyy년 MM월 dd일", { locale: ko })}
          </h2>
        </div>
        <Button variant="outline" size="sm">
          식단 저장
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {/* 요일 헤더 */}
        {Array.from({ length: 7 }).map((_, i) => {
          const day = addDays(startDate, i)
          const dayName = format(day, "E", { locale: ko })
          const isToday = isSameDay(day, new Date())

          return (
            <div key={i} className="text-center">
              <div
                className={`py-2 font-medium rounded-t-md ${isToday ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                {dayName}
              </div>
              <div className="text-sm text-muted-foreground">{format(day, "MM/dd")}</div>
            </div>
          )
        })}

        {/* 식단 그리드 */}
        {Array.from({ length: 7 }).map((_, dayIndex) => {
          const date = addDays(startDate, dayIndex)
          const mealItems = getMealItemsForDate(date)

          return (
            <Card key={dayIndex} className="col-span-1 border">
              <CardContent className="p-2 space-y-2">
                {mealTypes.map((mealType) => {
                  const meal = mealItems.find((item) => item.meal_type === mealType.id)

                  return (
                    <div key={mealType.id} className="p-2 border rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <Badge variant="outline">{mealType.name}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => openAddMealDialog(date, mealType.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {meal ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-muted rounded overflow-hidden flex-shrink-0">
                            {meal.recipe?.image_url && (
                              <img
                                src={meal.recipe.image_url || "/placeholder.svg"}
                                alt={meal.recipe.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs truncate">{meal.recipe?.title}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleRemoveMeal(meal.id)}>삭제</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : (
                        <div className="h-8 flex items-center justify-center">
                          <p className="text-xs text-muted-foreground">식단 없음</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 식단 추가 다이얼로그 */}
      <Dialog open={isAddMealDialogOpen} onOpenChange={setIsAddMealDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>식단 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>날짜</Label>
              <div className="p-2 border rounded-md">
                {selectedDate && format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })}
              </div>
            </div>
            <div className="space-y-2">
              <Label>식사 유형</Label>
              <div className="p-2 border rounded-md">
                {mealTypes.find((type) => type.id === selectedMealType)?.name}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipe">레시피 선택</Label>
              <Select onValueChange={(value) => handleAddMeal(Number(value))}>
                <SelectTrigger id="recipe">
                  <SelectValue placeholder="레시피 선택" />
                </SelectTrigger>
                <SelectContent>
                  {dummyRecipes.map((recipe) => (
                    <SelectItem key={recipe.id} value={recipe.id.toString()}>
                      {recipe.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
