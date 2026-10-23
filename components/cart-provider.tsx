'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { CartItem } from '@/lib/types'
import { MAX_QTY_PER_ITEM } from '@/lib/format'

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  mrpTotal: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  setQuantity: (sku: string, quantity: number) => void
  removeItem: (sku: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const clampQty = (qty: number) => Math.min(MAX_QTY_PER_ITEM, Math.max(1, Math.floor(qty)))

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback<CartContextValue['addItem']>((item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === item.sku)
      if (existing) {
        return prev.map((i) => (i.sku === item.sku ? { ...i, quantity: clampQty(i.quantity + quantity) } : i))
      }
      return [...prev, { ...item, quantity: clampQty(quantity) }]
    })
  }, [])

  const setQuantity = useCallback((sku: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.sku === sku ? { ...i, quantity: clampQty(quantity) } : i)))
  }, [])

  const removeItem = useCallback((sku: string) => {
    setItems((prev) => prev.filter((i) => i.sku !== sku))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.price * i.quantity, 0),
      mrpTotal: items.reduce((n, i) => n + i.mrp * i.quantity, 0),
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [items, addItem, setQuantity, removeItem, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
