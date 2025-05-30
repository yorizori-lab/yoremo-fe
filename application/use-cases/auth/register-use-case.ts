import { AuthRepository } from '@/domain/repositories/auth-repository'
import { RegisterRequest, RegisterResponse } from '@/domain/models/auth'

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: RegisterRequest): Promise<RegisterResponse> {
    // 입력 검증
    if (!userData.email) {
      throw new Error('이메일을 입력해주세요.')
    }
    
    if (!userData.password) {
      throw new Error('비밀번호를 입력해주세요.')
    }

    if (!userData.name) {
      throw new Error('이름을 입력해주세요.')
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      throw new Error('올바른 이메일 형식을 입력해주세요.')
    }

    // 비밀번호 길이 검증
    if (userData.password.length < 6) {
      throw new Error('비밀번호는 6자 이상이어야 합니다.')
    }

    // 이름 길이 검증
    if (userData.name.length < 2) {
      throw new Error('이름은 2자 이상이어야 합니다.')
    }

    // 비밀번호 복잡성 검증 (선택사항)
    const hasNumber = /\d/.test(userData.password)
    const hasLetter = /[a-zA-Z]/.test(userData.password)
    if (!hasNumber || !hasLetter) {
      throw new Error('비밀번호는 영문자와 숫자를 포함해야 합니다.')
    }

    // 이메일 중복 확인
    const emailCheck = await this.authRepository.checkEmailExists(userData.email)
    if (!emailCheck.exists) {
      throw new Error('이미 사용 중인 이메일입니다.')
    }

    return this.authRepository.register(userData)
  }
} 