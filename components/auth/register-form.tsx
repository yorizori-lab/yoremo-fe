'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRegister } from '@/presentation/hooks/use-register'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, isLoading, error, clearError } = useRegister()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    
    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      return // 이미 UI에서 표시됨
    }
    
    await register({ email, password, name })
  }

  const handleInputChange = () => {
    if (error) {
      clearError()
    }
  }

  const isPasswordMismatch = confirmPassword.length > 0 && password !== confirmPassword

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">회원가입</CardTitle>
        <CardDescription className="text-center">
          새 계정을 만들어 요리의 즐거움을 시작하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  handleInputChange()
                }}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  handleInputChange()
                }}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="영문자와 숫자를 포함한 6자 이상"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  handleInputChange()
                }}
                className="pl-10 pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  handleInputChange()
                }}
                className={`pl-10 pr-10 ${isPasswordMismatch ? 'border-destructive' : ''}`}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {isPasswordMismatch && (
              <p className="text-sm text-destructive">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || isPasswordMismatch}
          >
            {isLoading ? '회원가입 중...' : '회원가입'}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <Link 
              href="/login" 
              className="text-primary hover:underline font-medium"
            >
              로그인
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 