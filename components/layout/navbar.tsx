"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, ShoppingCart, User, Refrigerator, Calendar, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/recipes", label: "레시피", icon: BookOpen },
    { href: "/refrigerator", label: "냉장고 추천", icon: Refrigerator },
    { href: "/meal-plans", label: "식단 관리", icon: Calendar },
    { href: "/cart", label: "장바구니", icon: ShoppingCart },
    { href: "/profile", label: "마이페이지", icon: User },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            레시피 매니저
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <Button asChild variant="default" size="sm">
              <Link href="/recipes/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                레시피 등록
              </Link>
            </Button>
          </div>
        </div>

        <div className="md:hidden flex justify-between overflow-x-auto py-2 -mx-4 px-4 space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center px-3 py-2 text-xs font-medium rounded-md min-w-[4rem]",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
