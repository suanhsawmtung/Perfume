import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export interface WishlistItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
}

interface WishlistState {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  toggleItem: (item: WishlistItem) => boolean
  hasItem: (id: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    immer((set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          if (state.items.find((i) => i.id === item.id)) {
            return state
          }
          return { items: [...state.items, item] }
        })
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },
      toggleItem: (item) => {
        const state = get()
        const exists = state.items.find((i) => i.id === item.id)
        if (exists) {
          set({ items: state.items.filter((i) => i.id !== item.id) })
          return false
        } else {
          set({ items: [...state.items, item] })
          return true
        }
      },
      hasItem: (id) => {
        const state = get()
        return state.items.some((i) => i.id === id)
      },
    })),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
)
