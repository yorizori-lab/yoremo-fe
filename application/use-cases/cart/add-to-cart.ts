import type { CartItem } from "@/domain/models/cart"
import type { CartRepository } from "@/domain/repositories/cart-repository"

export class AddToCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(userId: number, item: CartItem): Promise<CartItem> {
    if (!item.name) {
      throw new Error("상품명은 필수입니다.")
    }

    return this.cartRepository.addCartItem(userId, item)
  }
}
