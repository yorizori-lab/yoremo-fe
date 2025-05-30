import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isProtectedRoute } from './lib/auth-config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (isProtectedRoute(pathname)) {
    const sessionCookie = request.cookies.get('JSESSIONID')
    
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 