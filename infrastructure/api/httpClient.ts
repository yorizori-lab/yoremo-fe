export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// 기본 HTTP 요청 함수
export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API 오류: ${response.status}`);
  }
  
  return response.json();
}

// 인증 관련 헬퍼 클래스
export class AuthClient {
  private static token: string | null = null;
  
  static setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }
  
  static getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }
  
  static clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }
  
  static getAuthHeader(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// 인증이 필요한 API 요청 함수
export async function fetchAuthApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const authHeaders = AuthClient.getAuthHeader();
  return fetchApi<T>(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      ...(Object.keys(authHeaders).length > 0 ? authHeaders : {}),
    },
  });
} 