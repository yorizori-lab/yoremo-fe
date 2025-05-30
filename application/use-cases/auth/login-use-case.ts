import { AuthRepository } from '@/domain/repositories/auth-repository'
import { LoginRequest, AuthResponse } from '@/domain/models/auth'

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: LoginRequest): Promise<AuthResponse> {
    // 입력 검증
    if (!credentials.email) {
      throw new Error('이메일을 입력해주세요.')
    }
    
    if (!credentials.password) {
      throw new Error('비밀번호를 입력해주세요.')
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(credentials.email)) {
      throw new Error('올바른 이메일 형식을 입력해주세요.')
    }

    // 비밀번호 길이 검증
    if (credentials.password.length < 6) {
      throw new Error('비밀번호는 6자 이상이어야 합니다.')
    }

    return this.authRepository.login(credentials)
  }
} 