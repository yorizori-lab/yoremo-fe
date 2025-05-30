'use client'

import ChatInterface from '@/components/chat/chat-interface'

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">식단 추천 AI</h1>
        <p className="text-muted-foreground">
          AI와 대화하여 맞춤형 식단을 추천받아보세요
        </p>
      </div>
      <ChatInterface />
    </div>
  )
} 