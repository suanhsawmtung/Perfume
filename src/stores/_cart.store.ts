import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  size: string
  quantity: number
}

export type CheckoutStep = "cart" | "checkout" | "success"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  step: CheckoutStep
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setIsOpen: (isOpen: boolean) => void
  setStep: (step: CheckoutStep) => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set, get) => ({
      items: [],
      isOpen: false,
      step: "cart",
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            existingItem.quantity += 1
          } else {
            state.items.push({ ...item, quantity: 1 })
          }
        })
      },
      removeItem: (id) => {
        set((state) => {
          state.items = state.items.filter((i) => i.id !== id)
        })
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            state.items = state.items.filter((i) => i.id !== id)
          } else {
            const item = state.items.find((i) => i.id === id)
            if (item) {
              item.quantity = quantity
            }
          }
        })
      },
      clearCart: () =>
        set((state) => {
          state.items = []
          state.step = "cart"
        }),
      setIsOpen: (isOpen) =>
        set((state) => {
          state.isOpen = isOpen
        }),
      setStep: (step) =>
        set((state) => {
          state.step = step
        }),
      getTotal: () => {
        const state = get()
        return state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
      },
      getItemCount: () => {
        const state = get()
        return state.items.reduce((sum, item) => sum + item.quantity, 0)
      },
    })),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
)
