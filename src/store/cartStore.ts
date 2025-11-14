import { create } from 'zustand';
import type { Product, CartItem } from '../types';
import { calculateDiscount } from '../utils/discount';

interface CartStore {
  items: CartItem[];
  discountCode: string | undefined;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDiscountCode: (code: string | undefined) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  getDiscountAmount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  discountCode: undefined,

  addItem: (product: Product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { product, quantity }],
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [], discountCode: undefined });
  },

  setDiscountCode: (code: string | undefined) => {
    set({ discountCode: code });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discountResult = calculateDiscount(subtotal, get().discountCode, get().items);
    return discountResult.finalTotal;
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const discountResult = calculateDiscount(subtotal, get().discountCode, get().items);
    return discountResult.discountAmount;
  },
}));

