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
          <div className="mb-4">
            <img
              src="/empty_cart_icon.png"
              alt="Empty cart"
              className="w-40 h-40"
            />
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

        <div className="flex items-center justify-center p-3 mb-6 bg-[#FBF7F4] border border-gray-200 rounded-lg shadow-sm">
          <img
            src="/neutral_carbon_icon.png"
            alt="Carbon neutral"
            className="w-[18px] h-[18px] mr-2"
          />
          <span className="text-sm text-gray-800">
            This is a <strong className="font-bold">carbon-neutral </strong> delivery
          </span>
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

