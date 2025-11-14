import { DISCOUNT_CODES, HAPPYHOURS_DISCOUNT } from '../constants';
import type { CartItem } from '../types';

export interface DiscountResult {
  discountAmount: number;
  finalTotal: number;
  discountType: 'PERCENTAGE' | 'FREE_ITEM' | null;
}

export const calculateDiscount = (
  subtotal: number,
  discountCode: string | undefined,
  items: CartItem[]
): DiscountResult => {
  if (!discountCode) {
    return {
      discountAmount: 0,
      finalTotal: subtotal,
      discountType: null,
    };
  }

  const code = discountCode.toUpperCase().trim();

  if (code === DISCOUNT_CODES.HAPPYHOURS) {
    const discountAmount = subtotal * HAPPYHOURS_DISCOUNT;
    return {
      discountAmount,
      finalTotal: subtotal - discountAmount,
      discountType: 'PERCENTAGE',
    };
  }

  if (code === DISCOUNT_CODES.BUYGETONE) {
    if (items.length === 0) {
      return {
        discountAmount: 0,
        finalTotal: subtotal,
        discountType: null,
      };
    }

    // Find the lowest priced item
    const lowestPricedItem = items.reduce((lowest, item) => {
      const currentPrice = item.product.price * item.quantity;
      const lowestPrice = lowest.product.price * lowest.quantity;
      return currentPrice < lowestPrice ? item : lowest;
    });

    const discountAmount = lowestPricedItem.product.price * lowestPricedItem.quantity;
    return {
      discountAmount,
      finalTotal: subtotal - discountAmount,
      discountType: 'FREE_ITEM',
    };
  }

  // Invalid discount code
  return {
    discountAmount: 0,
    finalTotal: subtotal,
    discountType: null,
  };
};

