"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, ShoppingCart, User, Refrigerator, Calendar, PlusCircle, LogIn, LogOut, UserCircle, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  // 모든 사용자가 볼 수 있는 메뉴
  const publicNavItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/recipes", label: "레시피", icon: BookOpen },
    { href: "/chat", label: "식단 추천(AI)", icon: Bot },
  ]

  // 로그인한 사용자만 볼 수 있는 메뉴
  const protectedNavItems = [
    { href: "/refrigerator", label: "냉장고 추천", icon: Refrigerator },
    { href: "/meal-plans", label: "식단 관리", icon: Calendar },
    { href: "/cart", label: "장바구니", icon: ShoppingCart },
  ]

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/recipes", label: "레시피", icon: BookOpen },
    { href: "/refrigerator", label: "냉장고 추천", icon: Refrigerator },
    { href: "/chat", label: "식단 추천(AI)", icon: Bot },
    { href: "/meal-plans", label: "식단 관리", icon: Calendar },
    { href: "/cart", label: "장바구니", icon: ShoppingCart },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            요레모
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
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : isAuthenticated ? (
              <>
                {/* 레시피 등록 버튼 - 로그인한 사용자만 */}
                <Button asChild variant="default" size="sm">
                  <Link href="/recipes/create">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    레시피 등록
                  </Link>
                </Button>

                {/* 사용자 메뉴 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <UserCircle className="h-4 w-4" />
                      <span className="hidden md:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        마이페이지
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              /* 로그인 버튼 - 비로그인 사용자 */
              <Button asChild variant="default" size="sm">
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  로그인
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* 모바일 네비게이션 */}
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
