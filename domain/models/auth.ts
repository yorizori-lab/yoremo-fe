// 인증 관련 도메인 모델 (백엔드 Users 엔티티와 일치)
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string // 백엔드에서는 name 필드 사용
}

export interface User {
  user_id: number
  email: string
  name: string // username이 아니라 name
  profile_image_url?: string | null
  role: 'USER' | 'ADMIN'
  last_login_at?: string | null // ISO 8601 datetime
  is_email_verified: boolean
  created_at: string // ISO 8601 datetime
  updated_at: string // ISO 8601 datetime
}

export interface AuthResponse {
  user: User
  message?: string
}

// 회원가입 응답에서 사용할 수 있는 추가 정보
export interface RegisterResponse {
  user: User
  message: string
  verification_email_sent?: boolean
} 