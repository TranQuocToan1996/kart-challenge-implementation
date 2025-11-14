import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';

interface QuantitySelectorProps {
  product: Product;
  quantity: number;
}

export const QuantitySelector = ({ product, quantity }: QuantitySelectorProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-3 py-2">
      <button
        onClick={handleDecrease}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors"
        aria-label="Decrease quantity"
      >
        <span className="text-gray-600 font-semibold">−</span>
      </button>
      <span className="text-base font-semibold text-gray-900 min-w-[24px] text-center">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors"
        aria-label="Increase quantity"
      >
        <span className="text-gray-600 font-semibold">+</span>
      </button>
    </div>
  );
};

