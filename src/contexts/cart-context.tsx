"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product } from "@/lib/types";

export type CartItemType = 
  | "banner_print" 
  | "mesh_print" 
  | "film_print" 
  | "cnc_cutting" 
  | "laser_cutting" 
  | "uv_print" 
  | "rollup_stand" 
  | "souvenir"
  | "mangal"
  | "product";

export interface CartItem {
  id: string;
  product?: Product;
  type: CartItemType;
  name: string;
  parameters: Record<string, string | number | boolean>;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "totalPrice">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, "id" | "totalPrice">) => {
    const id = `${item.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const totalPrice = item.price * item.quantity;
    setItems(prev => [...prev, { ...item, id, totalPrice }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id));
      return;
    }
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity, totalPrice: item.price * quantity }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      totalItems,
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
