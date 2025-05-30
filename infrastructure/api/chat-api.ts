import { fetchApi } from './httpClient'

export interface ChatMessageRequest {
  question: string
  sessionId: string | null
}

export interface ChatMessageResponse {
  answer: string
}

export class ChatApi {
  async sendMessage(request: ChatMessageRequest): Promise<ChatMessageResponse> {
    try {
      return await fetchApi<ChatMessageResponse>('/chat/v1/message', {
        method: 'POST',
        body: JSON.stringify(request),
      })
    } catch (error) {
      console.error('챗봇 메시지 전송 실패:', error)
      throw new Error('메시지 전송에 실패했습니다. 다시 시도해주세요.')
    }
  }
} 