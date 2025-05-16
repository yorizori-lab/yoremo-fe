export interface CartItem {
  id: number
  name: string
  amount: number
  unit: string
  checked: boolean
  category?: string
}

export interface Cart {
  id: number
  user_id: number
  items: CartItem[]
  created_at: string
  updated_at: string
}
