import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

export const DiscountCodeInput = () => {
  const discountCode = useCartStore((state) => state.discountCode);
  const discountCodeError = useCartStore((state) => state.discountCodeError);
  const setDiscountCode = useCartStore((state) => state.setDiscountCode);
  const validateAndApplyDiscountCode = useCartStore((state) => state.validateAndApplyDiscountCode);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);

  const discountAmount = getDiscountAmount();

  // Sync input value with discount code when it changes externally
  useEffect(() => {
    setDiscountCode(discountCode);
  }, [discountCode, setDiscountCode]);

  const handleApply = () => {
    validateAndApplyDiscountCode();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => {
            setDiscountCode(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Enter discount code"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
        />
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors"
        >
          Apply
        </button>
      </div>
      {discountCodeError && (
        <p className="text-sm text-red-600">{discountCodeError}</p>
      )}
      {discountAmount > 0 && !discountCodeError && (
        <p className="text-sm text-green-600">
          Discount applied: -${discountAmount.toFixed(2)}
        </p>
      )}
    </div>
  );
};

