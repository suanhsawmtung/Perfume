import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export interface CartItem {
    productVariantId: number;
    quantity: number
}

export type CheckoutStep = "cart" | "checkout" | "success"

interface CartState {
    items: CartItem[]
    isOpen: boolean
    step: CheckoutStep
    addItem: ({
        id,
        quantity
    }: { id: number; quantity?: number }) => void
    removeItem: (id: number) => void
    updateQuantity: ({ id, quantity }: { id: number; quantity: number }) => void
    clearCart: () => void
    setIsOpen: (isOpen: boolean) => void
    setStep: (step: CheckoutStep) => void
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
                    const { id, quantity = 1 } = item;
                    const existingItem = state.items.find((i) => i.productVariantId === id)
                    if (existingItem) {
                        existingItem.quantity += quantity
                    } else {
                        state.items.push({ productVariantId: id, quantity })
                    }
                })
            },
            removeItem: (id) => {
                set((state) => {
                    state.items = state.items.filter((i) => i.productVariantId !== id)
                })
            },
            updateQuantity: (item) => {
                set((state) => {
                    const { id, quantity } = item;
                    if (quantity <= 0) {
                        state.items = state.items.filter((i) => i.productVariantId !== id)
                    } else {
                        const item = state.items.find((i) => i.productVariantId === id)
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
            getItemCount: () => {
                const state = get()
                return state.items.reduce((sum, item) => sum + item.quantity, 0)
            },
        })),
        {
            name: "cart-storage",
            partialize: (state) => ({ items: state.items }),
            storage: createJSONStorage(() => localStorage),
        }
    )
)
