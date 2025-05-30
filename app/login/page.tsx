'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoginForm from '@/components/auth/login-form'
import { useAuth } from '@/hooks/use-auth'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // 이미 로그인한 사용자는 리다이렉트
      const redirectTo = searchParams.get('redirect') || '/'
      router.replace(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, searchParams])

  // 로딩 중이거나 이미 로그인한 사용자는 로딩 표시
  if (isLoading || isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">
            요레모에 오신 것을 환영합니다
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
} 