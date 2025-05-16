import type { Cart, CartItem } from "@/domain/models/cart"
import type { CartRepository } from "@/domain/repositories/cart-repository"

export class CartApi implements CartRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = "/api/cart"
  }

  async getCart(userId: number): Promise<Cart | null> {
    const response = await fetch(`${this.baseUrl}?userId=${userId}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error("장바구니를 가져오는데 실패했습니다.")
    }

    return response.json()
  }

  async addCartItem(userId: number, item: CartItem): Promise<CartItem> {
    const response = await fetch(`${this.baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, item }),
    })

    if (!response.ok) {
      throw new Error("장바구니에 항목 추가에 실패했습니다.")
    }

    return response.json()
  }

  async updateCartItem(userId: number, itemId: number, updates: Partial<CartItem>): Promise<CartItem> {
    const response = await fetch(`${this.baseUrl}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, updates }),
    })

    if (!response.ok) {
      throw new Error("장바구니 항목 업데이트에 실패했습니다.")
    }

    return response.json()
  }

  async removeCartItem(userId: number, itemId: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/items/${itemId}?userId=${userId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("장바구니 항목 삭제에 실패했습니다.")
    }

    return true
  }

  async clearCart(userId: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/clear?userId=${userId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("장바구니 비우기에 실패했습니다.")
    }

    return true
  }
}
