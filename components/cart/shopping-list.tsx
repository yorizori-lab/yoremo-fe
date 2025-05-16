"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Search, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 임시 데이터 - 실제로는 API에서 가져와야 함
const initialCartItems = [
  { id: 1, name: "닭가슴살", amount: 500, unit: "g", checked: false, category: "육류" },
  { id: 2, name: "소고기", amount: 300, unit: "g", checked: false, category: "육류" },
  { id: 3, name: "양파", amount: 2, unit: "개", checked: false, category: "채소" },
  { id: 4, name: "당근", amount: 1, unit: "개", checked: false, category: "채소" },
  { id: 5, name: "감자", amount: 3, unit: "개", checked: false, category: "채소" },
  { id: 6, name: "파", amount: 1, unit: "단", checked: false, category: "채소" },
  { id: 7, name: "마늘", amount: 5, unit: "쪽", checked: false, category: "채소" },
  { id: 8, name: "김치", amount: 200, unit: "g", checked: false, category: "반찬" },
  { id: 9, name: "쌀", amount: 2, unit: "컵", checked: false, category: "곡물" },
  { id: 10, name: "파스타면", amount: 200, unit: "g", checked: false, category: "곡물" },
]

export default function ShoppingList() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [newItemName, setNewItemName] = useState("")
  const [newItemAmount, setNewItemAmount] = useState("")
  const [newItemUnit, setNewItemUnit] = useState("")
  const { toast } = useToast()

  // 아이템 체크 상태 변경
  const handleToggleItem = (id: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  // 아이템 삭제
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "항목 삭제됨",
      description: "장바구니에서 항목이 삭제되었습니다.",
    })
  }

  // 새 아이템 추가
  const handleAddItem = () => {
    if (!newItemName.trim()) {
      toast({
        title: "항목 추가 실패",
        description: "상품명을 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    const newItem = {
      id: Math.max(0, ...cartItems.map((item) => item.id)) + 1,
      name: newItemName.trim(),
      amount: newItemAmount ? Number(newItemAmount) : 0,
      unit: newItemUnit.trim(),
      checked: false,
      category: "기타",
    }

    setCartItems([...cartItems, newItem])
    setNewItemName("")
    setNewItemAmount("")
    setNewItemUnit("")

    toast({
      title: "항목 추가됨",
      description: `${newItem.name}이(가) 장바구니에 추가되었습니다.`,
    })
  }

  // 모든 아이템 체크
  const handleCheckAll = () => {
    setCartItems(cartItems.map((item) => ({ ...item, checked: true })))
  }

  // 모든 아이템 체크 해제
  const handleUncheckAll = () => {
    setCartItems(cartItems.map((item) => ({ ...item, checked: false })))
  }

  // 체크된 아이템 삭제
  const handleRemoveChecked = () => {
    const checkedCount = cartItems.filter((item) => item.checked).length
    if (checkedCount === 0) {
      toast({
        title: "선택된 항목 없음",
        description: "삭제할 항목을 선택해주세요.",
        variant: "destructive",
      })
      return
    }

    setCartItems(cartItems.filter((item) => !item.checked))
    toast({
      title: "선택 항목 삭제됨",
      description: `${checkedCount}개 항목이 장바구니에서 삭제되었습니다.`,
    })
  }

  // 검색어에 따른 필터링
  const filteredItems = cartItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // 카테고리별로 그룹화
  const groupedItems: Record<string, typeof cartItems> = {}
  filteredItems.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = []
    }
    groupedItems[item.category].push(item)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">장바구니</h2>
        <Badge variant="outline">{cartItems.length}개 항목</Badge>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="장바구니 검색..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" onClick={() => setSearchTerm("")}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>새 항목 추가</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-5">
              <Input placeholder="상품명" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
            </div>
            <div className="col-span-3">
              <Input
                type="number"
                placeholder="수량"
                value={newItemAmount}
                onChange={(e) => setNewItemAmount(e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input placeholder="단위" value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)} />
            </div>
            <div className="col-span-1">
              <Button className="w-full h-full" size="icon" onClick={handleAddItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCheckAll}>
            모두 선택
          </Button>
          <Button variant="outline" size="sm" onClick={handleUncheckAll}>
            선택 해제
          </Button>
        </div>
        <Button variant="destructive" size="sm" onClick={handleRemoveChecked}>
          <Trash2 className="mr-2 h-4 w-4" />
          선택 삭제
        </Button>
      </div>

      {Object.keys(groupedItems).length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium mb-2">장바구니가 비어있습니다.</p>
            <p className="text-muted-foreground mb-4">필요한 재료를 추가해보세요.</p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(groupedItems).map(([category, items]) => (
          <Card key={category}>
            <CardHeader className="py-3">
              <CardTitle className="text-base">{category}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-3 px-4">
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={item.checked}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      className="mr-3"
                    />
                    <div className="flex-1 grid grid-cols-12 gap-2 items-center">
                      <label
                        htmlFor={`item-${item.id}`}
                        className={`col-span-6 font-medium cursor-pointer ${item.checked ? "line-through text-muted-foreground" : ""}`}
                      >
                        {item.name}
                      </label>
                      <div className="col-span-5 text-sm text-muted-foreground">
                        {item.amount} {item.unit}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
