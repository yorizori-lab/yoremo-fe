'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react'
import { AuthApi } from '@/infrastructure/api/auth-api'

type VerificationStatus = 'loading' | 'success' | 'error'

export default function EmailVerification() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<VerificationStatus>('loading')
  const [message, setMessage] = useState('')
  
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setStatus('error')
        setMessage('잘못된 인증 링크입니다.')
        return
      }

      try {
        const authApi = new AuthApi()
        await authApi.verifyEmail(token, email)
        setStatus('success')
        setMessage('이메일 인증이 성공적으로 완료되었습니다!')
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : '이메일 인증에 실패했습니다.')
      }
    }

    verifyEmail()
  }, [token, email])

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center space-y-4">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">이메일 인증을 처리하고 있습니다...</p>
          </div>
        )
      
      case 'success':
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-700">인증 성공!</h3>
              <p className="text-muted-foreground">{message}</p>
            </div>
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                계정이 성공적으로 활성화되었습니다. 이제 로그인할 수 있습니다.
              </AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <Link href="/login">로그인 하러 가기</Link>
            </Button>
          </div>
        )
      
      case 'error':
        return (
          <div className="text-center space-y-4">
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-red-700">인증 실패</h3>
              <p className="text-muted-foreground">{message}</p>
            </div>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/register">다시 회원가입</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/login">로그인 페이지로</Link>
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  )
} 