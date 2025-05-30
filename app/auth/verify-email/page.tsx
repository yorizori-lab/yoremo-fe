import EmailVerification from '@/components/auth/email-verification'

export default function VerifyEmailPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">이메일 인증</h1>
          <p className="text-muted-foreground">
            이메일 인증을 완료하여 계정을 활성화하세요
          </p>
        </div>
        <EmailVerification />
      </div>
    </div>
  )
}

export const metadata = {
  title: '이메일 인증 - 레시피 관리 시스템',
  description: '이메일 인증을 통해 계정을 활성화하세요',
} 