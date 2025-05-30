'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Bot, User, Trash2, Loader2 } from 'lucide-react'
import { useChat } from '@/hooks/use-chat'
import { cn } from '@/lib/utils'

const EXAMPLE_QUESTIONS = [
  "오늘 아침 식사로 뭘 먹으면 좋을까요?",
  "다이어트 중인데 저칼로리 식단 추천해주세요",
  "단백질이 풍부한 메뉴를 알려주세요",
  "냉장고에 닭가슴살과 브로콜리가 있어요. 요리법 추천해주세요",
  "비건 식단으로 영양소를 골고루 섭취하는 방법은?",
  "근력 운동 후 회복에 좋은 음식 추천해주세요"
]

export default function ChatInterface() {
  const [inputMessage, setInputMessage] = useState('')
  const { messages, isLoading, sendMessage, clearMessages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    await sendMessage(inputMessage)
    setInputMessage('')
  }

  const handleExampleClick = (question: string) => {
    if (isLoading) return
    sendMessage(question)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      {/* 왼쪽: 예시 질문 */}
      <div className="lg:col-span-1 h-full overflow-hidden">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5" />
              예시 질문
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-80px)] overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-2 pr-2">
                {EXAMPLE_QUESTIONS.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left h-auto p-3 whitespace-normal"
                    onClick={() => handleExampleClick(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* 오른쪽: 채팅 영역 */}
      <div className="lg:col-span-3 h-full overflow-hidden">
        <Card className="h-full flex flex-col">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5" />
              식단 추천 AI
            </CardTitle>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                대화 초기화
              </Button>
            )}
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* 메시지 영역 */}
            <ScrollArea className="flex-1 mb-4 max-h-[calc(100vh-400px)] [&>[data-radix-scroll-area-viewport]]:max-h-full">
              <div className="space-y-4 pr-4 min-h-full">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>안녕하세요! 식단에 대해 무엇이든 물어보세요.</p>
                    <p className="text-sm mt-2">왼쪽의 예시 질문을 클릭하거나 직접 입력해보세요.</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2 break-words",
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* 입력 영역 */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="식단에 대해 질문해보세요..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 