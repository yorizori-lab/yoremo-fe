import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false
}: PaginationProps) {

  // 페이지 번호 배열 생성 (최대 5개)
  const generatePageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    
    // 표시할 페이지 범위 계산
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1)
    
    // 끝 페이지에 따라 시작 페이지 조정
    startPage = Math.max(0, Math.min(startPage, totalPages - maxPagesToShow))
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }

  // 페이지 번호 클릭 핸들러
  const handlePageClick = (page: number) => {
    if (page !== currentPage && !disabled) {
      onPageChange(page)
    }
  }

  // 첫 페이지 또는 마지막 페이지면 비활성화
  const isFirstPage = currentPage === 0
  const isLastPage = currentPage === totalPages - 1

  // 페이지가 1페이지뿐이면 페이지네이션을 표시하지 않음
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-1 my-6">
      {/* 첫 페이지 버튼 */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageClick(0)}
        disabled={isFirstPage || disabled}
        className="hidden sm:flex"
        aria-label="첫 페이지"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      
      {/* 이전 페이지 버튼 */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={isFirstPage || disabled}
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {/* 페이지 번호 버튼 */}
      {generatePageNumbers().map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => handlePageClick(page)}
          disabled={disabled}
          aria-label={`${page + 1} 페이지`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page + 1}
        </Button>
      ))}
      
      {/* 다음 페이지 버튼 */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={isLastPage || disabled}
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      {/* 마지막 페이지 버튼 */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageClick(totalPages - 1)}
        disabled={isLastPage || disabled}
        className="hidden sm:flex"
        aria-label="마지막 페이지"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
