import { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse, User } from '../models/auth'

export interface AuthRepository {
  login(credentials: LoginRequest): Promise<AuthResponse>
  register(userData: RegisterRequest): Promise<RegisterResponse>
  logout(): Promise<void>
  getCurrentUser(): Promise<User>
  verifyEmail(token: string, email: string): Promise<{ email: string }>
  resendVerification(email: string): Promise<{ message: string }>
  checkEmailExists(email: string): Promise<{ exists: boolean }>
} 