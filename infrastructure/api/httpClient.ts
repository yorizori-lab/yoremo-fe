export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 기본 HTTP 요청 함수 (Spring Security 세션/쿠키 기반)
export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include', // Spring Security 세션 쿠키 포함
    ...options,
  });
  console.log('response', response);
  
  // 401 Unauthorized - Spring Security에서 인증 실패 시
  if (response.status === 401) {
    // 클라이언트 사이드에서만 리다이렉트
    if (typeof window !== 'undefined') {
      // 현재 페이지가 로그인 페이지가 아니면 리다이렉트
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
  }
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}

// 간단한 사용자 정보 관리 (세션/쿠키 기반)
export class AuthClient {
  private static currentUser: any = null;
  
  // 현재 사용자 정보 캐시
  static setCurrentUser(user: any) {
    this.currentUser = user;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }
  
  static getCurrentUser(): any {
    if (!this.currentUser && typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }
  
  static clearCurrentUser() {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('user');
    }
  }
  
  // 현재 사용자 정보를 서버에서 가져오기 (Spring Security /me 엔드포인트)
  static async fetchCurrentUser(): Promise<any> {
    try {
      const user = await fetchApi<any>('/users/v1/me');
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      this.clearCurrentUser();
      throw error;
    }
  }
}

// 하위 호환성을 위해 유지 (실제로는 fetchApi와 동일)
export async function fetchAuthApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return fetchApi<T>(endpoint, options);
} 