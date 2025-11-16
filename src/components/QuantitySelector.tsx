import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { getAssetPath } from '../utils/assets';
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
    <div className="flex items-center gap-0 bg-primary-quantity-selector rounded-[21px] border border-[#B94825] bg-[#C63B0F] w-full px-3 py-2 justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] relative z-10">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 0}
        className="flex items-center justify-center hover:opacity-80 focus:outline-none transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <img
          src={getAssetPath('/decrement_numb_icon.png')}
          alt="Decrease quantity"
          className="w-[18px] h-[18px]"
        />
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
          className="text-base font-semibold text-white text-center border-b-2 border-white focus:outline-none bg-transparent w-8 mx-8"
          min="0"
          max="99"
        />
      ) : (
        <span
          onClick={handleQuantityClick}
          className="text-base font-semibold text-white min-w-[24px] text-center cursor-pointer hover:opacity-80 transition-opacity mx-8"
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
        className="flex items-center justify-center hover:opacity-80 focus:outline-none transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <img
          src={getAssetPath('/increment_numb_icon.png')}
          alt="Increase quantity"
          className="w-[18px] h-[18px]"
        />
      </button>
    </div>
  );
};

