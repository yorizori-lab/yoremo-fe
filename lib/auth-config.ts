// 인증이 필요한 경로들을 중앙에서 관리
export const PROTECTED_ROUTES = [
  '/recipes/create',
  '/recipes/edit',
  '/recipes/[id]/edit', // 동적 경로도 포함 가능
  '/profile',
  '/cart',
  '/meal-plans',
  '/meal-plans/create',
  '/refrigerator',
] as const

// 로그인이 필요 없는 공개 경로들
export const PUBLIC_ROUTES = [
  '/',
  '/recipes',
  '/recipes/[id]', // 레시피 상세보기는 공개
  '/login',
  '/register',
  '/forgot-password',
  '/verify-email', // 이메일 인증 페이지
] as const

// 경로가 보호된 경로인지 확인하는 함수
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => {
    // 동적 경로 처리 ([id] 등)
    const routePattern = route.replace(/\[.*?\]/g, '[^/]+')
    const regex = new RegExp(`^${routePattern}$`)
    return regex.test(pathname) || pathname.startsWith(route)
  })
}

// 경로가 공개 경로인지 확인하는 함수
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => {
    const routePattern = route.replace(/\[.*?\]/g, '[^/]+')
    const regex = new RegExp(`^${routePattern}$`)
    return regex.test(pathname) || pathname.startsWith(route)
  })
} 