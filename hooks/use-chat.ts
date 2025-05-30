'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatApi, ChatMessageRequest } from '@/infrastructure/api/chat-api'

// 간단한 ID 생성 함수
const generateId = () => Math.random().toString(36).substr(2, 9)

export interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => generateId())
  const chatApi = useRef(new ChatApi())

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return

    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: generateId(),
      type: 'user',
      content: question.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const request: ChatMessageRequest = {
        question: question.trim(),
        sessionId
      }

      const response = await chatApi.current.sendMessage(request)

      // 봇 응답 추가
      const botMessage: ChatMessage = {
        id: generateId(),
        type: 'bot',
        content: response.answer,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('챗봇 에러 상세:', error)
      // 에러 메시지 추가
      const errorMessage: ChatMessage = {
        id: generateId(),
        type: 'bot',
        content: error instanceof Error ? error.message : '오류가 발생했습니다.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
  }

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    sessionId
  }
} 