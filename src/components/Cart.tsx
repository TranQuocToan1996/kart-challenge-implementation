import { useCartStore } from '../store/cartStore';
import { CartItem } from './CartItem';
import { DiscountCodeInput } from './DiscountCodeInput';

interface CartProps {
  onOrderSuccess: () => void;
}

export const Cart = ({ onOrderSuccess }: CartProps) => {
  const items = useCartStore((state) => state.items);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotal = useCartStore((state) => state.getTotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const validateAndApplyDiscountCode = useCartStore((state) => state.validateAndApplyDiscountCode);

  const totalItems = getTotalItems();
  const total = getTotal();
  const discountAmount = getDiscountAmount();

  const handleConfirmOrder = () => {
    if (items.length === 0) return;

    // Validate and apply discount code before showing confirmation
    const isValid = validateAndApplyDiscountCode();
    if (!isValid) {
      // Don't proceed if discount code is invalid
      return;
    }

    // Just show the confirmation modal, don't call API yet
    onOrderSuccess();
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 h-fit">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Cart (0)</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 relative w-40 h-40">
            {/* Large cake slice */}
            <svg
              className="absolute bottom-0 left-4 w-24 h-32"
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cake base */}
              <path
                d="M20 100 L20 40 Q20 20 40 20 L60 20 Q80 20 80 40 L80 100 Z"
                fill="#F3E5AB"
                stroke="#E0D5A0"
                strokeWidth="2"
              />
              {/* Frosting top */}
              <path
                d="M20 40 Q20 20 40 20 L60 20 Q80 20 80 40"
                stroke="#FFB6C1"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Frosting decoration */}
              <circle cx="35" cy="35" r="3" fill="#FFB6C1" />
              <circle cx="50" cy="30" r="3" fill="#FFB6C1" />
              <circle cx="65" cy="35" r="3" fill="#FFB6C1" />
              {/* Strawberry */}
              <ellipse cx="50" cy="25" rx="6" ry="8" fill="#FF6B6B" />
              <path
                d="M50 17 Q48 15 46 17"
                stroke="#90EE90"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            {/* Smaller cake piece */}
            <svg
              className="absolute bottom-8 right-2 w-16 h-20"
              viewBox="0 0 80 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cake base */}
              <path
                d="M15 80 L15 30 Q15 15 30 15 L50 15 Q65 15 65 30 L65 80 Z"
                fill="#FFE4B5"
                stroke="#E0C9A0"
                strokeWidth="2"
              />
              {/* Frosting top */}
              <path
                d="M15 30 Q15 15 30 15 L50 15 Q65 15 65 30"
                stroke="#FFB6C1"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Frosting decoration */}
              <circle cx="28" cy="28" r="2.5" fill="#FFB6C1" />
              <circle cx="40" cy="25" r="2.5" fill="#FFB6C1" />
              <circle cx="52" cy="28" r="2.5" fill="#FFB6C1" />
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
          disabled={items.length === 0}
          className="w-full bg-[#C63B0F] text-white py-3 px-6 rounded-[24px] font-semibold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

