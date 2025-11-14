import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';

interface QuantitySelectorProps {
  product: Product;
  quantity: number;
}

export const QuantitySelector = ({ product, quantity }: QuantitySelectorProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(quantity.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < 99) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleQuantityClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input while typing
    if (value === '') {
      setInputValue('');
      return;
    }
    // Only allow numbers
    if (/^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    handleQuantityUpdate();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleQuantityUpdate();
    } else if (e.key === 'Escape') {
      setInputValue(quantity.toString());
      setIsEditing(false);
    }
  };

  const handleQuantityUpdate = () => {
    const numValue = parseInt(inputValue, 10);

    if (isNaN(numValue) || numValue < 0) {
      // Reset to minimum 0 (which will remove the item)
      updateQuantity(product.id, 0);
      setInputValue('0');
    } else if (numValue > 99) {
      // Cap at maximum 99
      updateQuantity(product.id, 99);
      setInputValue('99');
    } else {
      // Valid value (0-99)
      updateQuantity(product.id, numValue);
      setInputValue(numValue.toString());
    }

    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-3 py-2">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 0}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <span className="text-gray-600 font-semibold">−</span>
      </button>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="w-12 text-base font-semibold text-gray-900 text-center border-b-2 border-primary-orange focus:outline-none bg-transparent"
          min="0"
          max="99"
        />
      ) : (
        <span
          onClick={handleQuantityClick}
          className="text-base font-semibold text-gray-900 min-w-[24px] text-center cursor-pointer hover:text-primary-orange transition-colors"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleQuantityClick();
            }
          }}
          aria-label="Click to edit quantity"
        >
          {quantity}
        </span>
      )}
      <button
        onClick={handleIncrease}
        disabled={quantity >= 99}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <span className="text-gray-600 font-semibold">+</span>
      </button>
    </div>
  );
};

