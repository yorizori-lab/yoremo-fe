import RegisterForm from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Join Us!</h1>
          <p className="text-muted-foreground">
            레시피 관리 시스템에 오신 것을 환영합니다
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export const metadata = {
  title: '회원가입 - 레시피 관리 시스템',
  description: '새 계정을 만들어 레시피 관리를 시작하세요',
} 