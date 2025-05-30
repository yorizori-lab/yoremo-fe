import { fetchApi, AuthClient } from './httpClient'
import { AuthRepository } from '@/domain/repositories/auth-repository'
import { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse, User } from '@/domain/models/auth'

export class AuthApi implements AuthRepository {
  // Spring Security 로그인 엔드포인트
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Spring Security의 커스텀 로그인 필터가 처리
      const response = await fetchApi<AuthResponse>('/users/v1/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })
      
      // 로그인 성공 후 사용자 정보 저장
      if (response.user) {
        AuthClient.setCurrentUser(response.user)
      }
      
      return response
    } catch (error) {
      throw error
    }
  }

  // Spring Security 회원가입 엔드포인트
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      return await fetchApi<RegisterResponse>('/users/v1/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      })
    } catch (error) {
      throw error
    }
  }

  // 이메일 중복 확인
  async checkEmailExists(email: string): Promise<{ exists: boolean }> {
    try {
      const response = await fetchApi<{ isAvailable: boolean }>('/users/v1/check-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      
      return { exists: !response.isAvailable }
    } catch (error) {
      throw new Error('이메일 확인 중 오류가 발생했습니다.')
    }
  }

  // 로그아웃 (세션 무효화)
  async logout(): Promise<void> {
    try {
      // Spring Security의 기본 로그아웃 엔드포인트
      await fetchApi('/users/v1/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('로그아웃 요청 실패:', error)
    } finally {
      // 클라이언트 상태 초기화
      AuthClient.clearCurrentUser()
    }
  }

  // 현재 사용자 정보 가져오기
  async getCurrentUser(): Promise<User> {
    return await fetchApi<User>('/users/v1/me')
  }

  // 이메일 인증
  async verifyEmail(token: string, email: string): Promise<{ email: string }> {
    try {
      const response = await fetchApi<{ email: string }>(`/users/v1/verify-email?token=${token}&email=${email}`)
      return response
    } catch (error) {
      throw error
    }
  }

  // 인증 이메일 재전송
  async resendVerification(email: string): Promise<{ message: string }> {
    return fetchApi<{ message: string }>('/users/v1/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }
} 