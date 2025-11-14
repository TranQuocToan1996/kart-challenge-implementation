import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { CartItem } from './CartItem';
import { DiscountCodeInput } from './DiscountCodeInput';
import { useOrder } from '../hooks/useOrder';
import type { OrderRequest, OrderResponse } from '../types';

interface CartProps {
  onOrderSuccess: (order: OrderResponse) => void;
}

export const Cart = ({ onOrderSuccess }: CartProps) => {
  const items = useCartStore((state) => state.items);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTotal = useCartStore((state) => state.getTotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const discountCode = useCartStore((state) => state.discountCode);
  
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const orderMutation = useOrder();

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const total = getTotal();
  const discountAmount = getDiscountAmount();

  const handleConfirmOrder = async () => {
    if (items.length === 0) return;

    setIsPlacingOrder(true);
    try {
      const orderData: OrderRequest = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        couponCode: discountCode || undefined,
      };

      const response = await orderMutation.mutateAsync(orderData);
      onOrderSuccess(response);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 h-fit">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Cart (0)</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4">
            <svg
              className="w-32 h-32 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-center">Your added items will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 h-fit">
      <h2 className="text-xl font-bold text-primary-orange mb-4">Your Cart ({totalItems})</h2>
      
      <div className="space-y-2 mb-4 max-h-[400px] overflow-y-auto">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Order Total</span>
          <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="text-sm text-green-600">
            Discount: -${discountAmount.toFixed(2)}
          </div>
        )}

        <DiscountCodeInput />

        <div className="flex items-center gap-2 text-sm text-gray-600 pt-2">
          <svg
            className="w-4 h-4 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>This is a carbon-neutral delivery</span>
        </div>

        <button
          onClick={handleConfirmOrder}
          disabled={isPlacingOrder || items.length === 0}
          className="w-full bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPlacingOrder ? 'Placing Order...' : 'Confirm Order'}
        </button>
      </div>
    </div>
  );
};

