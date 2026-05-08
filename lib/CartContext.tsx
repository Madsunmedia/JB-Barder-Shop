"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ServiceItem } from "./services-data";

interface CartContextType {
  cart: ServiceItem[];
  addToCart: (service: ServiceItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  cartCount: number;
  totalPrice: number;
  totalMins: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "jb_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ServiceItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  const addToCart = useCallback((service: ServiceItem) => {
    setCart((prev) =>
      prev.some((s) => s.id === service.id) ? prev : [...prev, service]
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback(
    (id: string) => cart.some((s) => s.id === id),
    [cart]
  );

  const totalPrice = cart.reduce((sum, s) => sum + s.price, 0);
  const totalMins = cart.reduce((sum, s) => {
    const n = parseInt(s.duration ?? "0");
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount: cart.length,
        totalPrice,
        totalMins,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
