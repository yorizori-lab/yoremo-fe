"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Share2, Download, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CartSummary() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // 임시 데이터 - 실제로는 API에서 가져와야 함
  const cartSummary = {
    totalItems: 10,
    totalCategories: 4,
    estimatedCost: 35000,
  }

  const handleCheckout = () => {
    setIsLoading(true)
    // 실제 구현에서는 결제 프로세스로 이동
    setTimeout(() => {
      toast({
        title: "주문 완료",
        description: "장바구니 항목이 주문되었습니다.",
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleShare = () => {
    // 실제 구현에서는 공유 기능
    toast({
      title: "장바구니 공유",
      description: "장바구니 공유 링크가 복사되었습니다.",
    })
  }

  const handleDownload = () => {
    // 실제 구현에서는 PDF 다운로드 등의 기능
    toast({
      title: "장바구니 다운로드",
      description: "장바구니 목록이 다운로드되었습니다.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>장바구니 요약</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">총 항목</span>
            <span className="font-medium">{cartSummary.totalItems}개</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">카테고리</span>
            <span className="font-medium">{cartSummary.totalCategories}개</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg">
            <span className="font-medium">예상 금액</span>
            <span className="font-bold">{cartSummary.estimatedCost.toLocaleString()}원</span>
          </div>
        </div>

        <div className="bg-muted p-3 rounded-md">
          <h3 className="font-medium mb-2">장바구니 팁</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 체크박스로 구매한 항목을 표시할 수 있어요</li>
            <li>• 레시피에서 필요한 재료를 바로 추가할 수 있어요</li>
            <li>• 장바구니를 가족과 공유해보세요</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? (
            "처리 중..."
          ) : (
            <>
              <ShoppingBag className="mr-2 h-4 w-4" />
              주문하기
            </>
          )}
        </Button>
        <div className="flex gap-2 w-full">
          <Button variant="outline" className="flex-1" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            공유
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            다운로드
          </Button>
        </div>
        <Button variant="link" className="w-full mt-2">
          쇼핑 계속하기
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
