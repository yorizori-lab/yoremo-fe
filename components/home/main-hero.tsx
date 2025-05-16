import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MainHero() {
  return (
    <div className="py-12 md:py-24 bg-muted rounded-xl mb-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">맛있는 요리의 시작</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                다양한 레시피를 찾고, 식단을 계획하고, 장보기 목록을 관리하세요. 당신의 요리 여정을 더 쉽고 즐겁게
                만들어 드립니다.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/recipes">레시피 둘러보기</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/recipes/create">레시피 등록하기</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[500px] aspect-video bg-foreground/5 rounded-xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <img
                src="/placeholder.svg?height=500&width=800"
                alt="요리 이미지"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
