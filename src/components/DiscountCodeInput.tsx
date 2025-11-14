import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { DISCOUNT_CODES } from '../constants';

export const DiscountCodeInput = () => {
  const discountCode = useCartStore((state) => state.discountCode);
  const setDiscountCode = useCartStore((state) => state.setDiscountCode);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  
  const [inputValue, setInputValue] = useState(discountCode || '');
  const [error, setError] = useState<string | null>(null);

  const discountAmount = getDiscountAmount();

  const handleApply = () => {
    const code = inputValue.trim().toUpperCase();
    
    if (!code) {
      setDiscountCode(undefined);
      setError(null);
      return;
    }

    // Validate discount code
    const validCodes = Object.values(DISCOUNT_CODES);
    if (validCodes.includes(code as typeof DISCOUNT_CODES[keyof typeof DISCOUNT_CODES])) {
      setDiscountCode(code);
      setError(null);
    } else {
      setError('Invalid discount code');
    }
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
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(null);
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
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {discountAmount > 0 && !error && (
        <p className="text-sm text-green-600">
          Discount applied: -${discountAmount.toFixed(2)}
        </p>
      )}
    </div>
  );
};

