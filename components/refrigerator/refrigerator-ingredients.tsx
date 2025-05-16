"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, X, RefreshCw } from "lucide-react"

export default function RefrigeratorIngredients() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [popularIngredients, setPopularIngredients] = useState([
    "돼지고기",
    "소고기",
    "닭고기",
    "양파",
    "마늘",
    "당근",
    "감자",
    "고추",
    "파",
    "버섯",
  ])

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddIngredient()
    }
  }

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const handleAddPopularIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient])
    }
  }

  const handleClearAll = () => {
    setIngredients([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>냉장고 재료 입력</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="재료 입력..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleAddIngredient} size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>

        {ingredients.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">재료 삭제</span>
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                모두 지우기
              </Button>
              <Button size="sm">레시피 찾기</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p>냉장고에 있는 재료를 입력해주세요.</p>
            <p className="text-sm">입력한 재료를 기반으로 만들 수 있는 레시피를 추천해 드립니다.</p>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">인기 재료</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <RefreshCw className="h-3 w-3 mr-1" />
              새로고침
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularIngredients.map((ingredient) => (
              <Badge
                key={ingredient}
                variant="outline"
                className={`cursor-pointer ${ingredients.includes(ingredient) ? "bg-primary/10" : ""}`}
                onClick={() => handleAddPopularIngredient(ingredient)}
              >
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
