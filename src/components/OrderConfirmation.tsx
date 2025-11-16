import { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { useOrder } from '../hooks/useOrder';
import { DISCOUNT_CODES } from '../constants';
import { Loading } from './Loading';
import { LazyImage } from './LazyImage'; // ✅ TODO change: Use lazy loading component
import type { CartItem, OrderRequest, OrderResponse } from '../types';

interface OrderConfirmationProps {
  items: CartItem[];
  discountCode: string | undefined;
  onClose: () => void;
  onOrderSuccess: (order: OrderResponse) => void;
}

export const OrderConfirmation = ({ items, discountCode, onClose, onOrderSuccess }: OrderConfirmationProps) => {
  const clearCart = useCartStore((state) => state.clearCart);
  const setDiscountCode = useCartStore((state) => state.setDiscountCode);
  const storeDiscountCode = useCartStore((state) => state.discountCode);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTotal = useCartStore((state) => state.getTotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const orderMutation = useOrder();

  // Re-apply discount code when modal opens
  useEffect(() => {
    if (discountCode && discountCode.trim()) {
      const code = discountCode.trim().toUpperCase();
      const validCodes = Object.values(DISCOUNT_CODES);
      if (validCodes.includes(code as typeof DISCOUNT_CODES[keyof typeof DISCOUNT_CODES])) {
        // Re-apply the discount code to ensure it's active
        if (storeDiscountCode !== code) {
          setDiscountCode(code);
        }
      } else {
        // If invalid, clear it
        if (storeDiscountCode !== undefined) {
          setDiscountCode(undefined);
        }
      }
    } else {
      // Clear if empty
      if (storeDiscountCode !== undefined) {
        setDiscountCode(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use store discount code for display (ensures it's always in sync)
  const displayDiscountCode = storeDiscountCode || discountCode;
  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const finalTotal = getTotal();

  const handleCancel = () => {
    onClose();
  };

  const handleBuy = async () => {
    setIsPlacingOrder(true);
    setOrderError(null);
    try {
      const orderData: OrderRequest = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        couponCode: storeDiscountCode || discountCode || undefined,
      };

      const response = await orderMutation.mutateAsync(orderData);
      clearCart();
      onOrderSuccess(response);
      onClose();
    } catch (error) {
      console.error('Failed to place order:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to place order. Please try again.';
      setOrderError(errorMessage);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        {isPlacingOrder ? (
          <div className="py-8">
            <Loading message="Placing your order..." size="lg" />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Order</h2>
              <p className="text-gray-600">Please review your order details before confirming</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
              {items.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <LazyImage
                      src={item.product.image.thumbnail}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                      rootMargin="20px" // ✅ TODO change: Modal images load immediately when visible
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.quantity}x @ ${item.product.price.toFixed(2)} ${itemTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 space-y-2 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Price</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Discount Code:</span>
                  <span className="font-semibold text-gray-900">{displayDiscountCode || '—'}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className={discountAmount > 0 ? 'text-green-600' : 'text-gray-600'}>Reduce Price</span>
                  <span className={discountAmount > 0 ? 'text-green-600' : 'text-gray-600'}>
                    {discountAmount > 0 ? `-$${discountAmount.toFixed(2)}` : '$0.00'}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-base font-semibold text-gray-900">Final Price</span>
                  <span className="text-xl font-bold text-gray-900">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {orderError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-900 mb-1">Order Failed</p>
                    <p className="text-sm text-red-700">{orderError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isPlacingOrder}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-[20px] font-semibold text-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                disabled={isPlacingOrder || items.length === 0}
                // className="flex-1 bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                className="w-full bg-[#C63B0F] text-white py-3 px-6 rounded-[20px] font-semibold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
              >
                Buy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

