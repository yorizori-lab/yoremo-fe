'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoginUseCase } from '@/application/use-cases/auth/login-use-case'
import { AuthApi } from '@/infrastructure/api/auth-api'
import { LoginRequest } from '@/domain/models/auth'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { login: updateAuthState } = useAuth()

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      setError(null)

      // Use Case 실행
      const authRepository = new AuthApi()
      const loginUseCase = new LoginUseCase(authRepository)
      const result = await loginUseCase.execute(credentials)

      // AuthContext 상태 즉시 업데이트
      updateAuthState({
        userId: result.user.user_id,
        email: result.user.email,
        name: result.user.name
      })

      // 성공 토스트
      toast({
        title: '로그인 성공',
        description: `안녕하세요, ${result.user.name}님!`,
        variant: 'default',
      })

      // 리다이렉트 처리 (원래 가려던 페이지 또는 홈으로)
      const redirectTo = searchParams.get('redirect') || '/'
      router.push(redirectTo)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      setError(errorMessage)
      
      // 실패 토스트
      toast({
        title: '로그인 실패',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    isLoading,
    error,
    clearError: () => setError(null),
  }
} 