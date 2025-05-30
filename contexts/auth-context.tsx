'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthClient } from '@/infrastructure/api/httpClient'
import { AuthApi } from '@/infrastructure/api/auth-api'

interface AuthUser {
  userId: number
  email: string
  name: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: AuthUser) => void
  logout: () => Promise<void>
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = async () => {
    try {
      // 세션 스토리지에서 사용자 정보 확인
      const cachedUser = AuthClient.getCurrentUser()
      if (cachedUser) {
        setUser(cachedUser)
        return
      }

      // 캐시된 정보가 없으면 서버에서 확인
      const authApi = new AuthApi()
      const currentUser = await authApi.getCurrentUser()
      const userData = {
        userId: currentUser.user_id,
        email: currentUser.email,
        name: currentUser.name
      }
      setUser(userData)
      AuthClient.setCurrentUser(userData)
    } catch (error) {
      // 인증 실패 시 로그인되지 않은 상태로 처리
      setUser(null)
      AuthClient.clearCurrentUser()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = (userData: AuthUser) => {
    setUser(userData)
    AuthClient.setCurrentUser(userData)
  }

  const logout = async () => {
    try {
      const authApi = new AuthApi()
      await authApi.logout()
    } catch (error) {
      console.error('로그아웃 오류:', error)
    } finally {
      setUser(null)
      AuthClient.clearCurrentUser()
      window.location.href = '/login'
    }
  }

  const refetch = async () => {
    setIsLoading(true)
    await checkAuth()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 