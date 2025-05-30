'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterUseCase } from '@/application/use-cases/auth/register-use-case'
import { AuthApi } from '@/infrastructure/api/auth-api'
import { RegisterRequest } from '@/domain/models/auth'
import { useToast } from '@/hooks/use-toast'

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true)
      setError(null)

      // Use Case 실행
      const authRepository = new AuthApi()
      const registerUseCase = new RegisterUseCase(authRepository)
      const result = await registerUseCase.execute(userData)

      // 성공 토스트
      toast({
        title: '회원가입 성공',
        description: result.verification_email_sent 
          ? '인증 이메일이 발송되었습니다. 이메일을 확인해주세요.'
          : '회원가입이 완료되었습니다.',
        variant: 'default',
      })

      // 로그인 페이지로 리다이렉트
      router.push('/login')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '회원가입에 실패했습니다.'
      setError(errorMessage)
      
      // 실패 토스트
      toast({
        title: '회원가입 실패',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    isLoading,
    error,
    clearError: () => setError(null),
  }
} 