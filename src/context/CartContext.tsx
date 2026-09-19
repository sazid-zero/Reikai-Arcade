'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem } from '../types';
import { sfx } from '../lib/sound';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number, customerInputs?: Record<string, string>) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string;
  discountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  total: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('reikai_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('reikai_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedMute = localStorage.getItem('reikai_sfx_muted');
      if (savedMute !== null) setIsMuted(savedMute === 'true');
    } catch {
      // ignore
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('reikai_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('reikai_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleMute = () => {
    const nextMute = sfx.toggleMute();
    setIsMuted(nextMute);
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1, customerInputs?: Record<string, string>) => {
    sfx.play('chime');
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => {
        const sameProduct = item.product.id === product.id;
        const sameVariant = item.variant?.id === variant?.id;
        return sameProduct && sameVariant;
      });

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
          customerInputs: customerInputs || next[existingIdx].customerInputs
        };
        return next;
      } else {
        return [...prev, { product, variant, quantity, customerInputs }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    sfx.play('click');
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.variant?.id === variantId)));
  };

  const updateQuantity = (productId: string, variantId: string | undefined, delta: number) => {
    sfx.play('hover');
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variant?.id === variantId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'REIKAI2026') {
      setCouponCode('REIKAI2026');
      setDiscountPercent(15);
      sfx.play('success');
      return { success: true, message: 'Coupon applied! 15% discount granted.' };
    } else if (clean === 'ARCADE10') {
      setCouponCode('ARCADE10');
      setDiscountPercent(10);
      sfx.play('success');
      return { success: true, message: 'Coupon applied! 10% discount granted.' };
    } else {
      sfx.play('click');
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    sfx.play('click');
  };

  const toggleWishlist = (productId: string) => {
    sfx.play('cyber');
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.variant ? item.variant.price : item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        discountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        total,
        wishlist,
        toggleWishlist,
        isMuted,
        toggleMute
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
