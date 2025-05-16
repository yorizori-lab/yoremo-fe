import type { Cart, CartItem } from "../models/cart"

export interface CartRepository {
  getCart(userId: number): Promise<Cart | null>
  addCartItem(userId: number, item: CartItem): Promise<CartItem>
  updateCartItem(userId: number, itemId: number, updates: Partial<CartItem>): Promise<CartItem>
  removeCartItem(userId: number, itemId: number): Promise<boolean>
  clearCart(userId: number): Promise<boolean>
}
