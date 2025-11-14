import { useCartStore } from '../store/cartStore';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  const handleRemove = () => {
    removeItem(product.id);
  };

  const priceFormattedInCart = (price: number, quantity: number, totalItemPrice: number) => {
    return `${quantity}x $${price.toFixed(2)} = $${totalItemPrice.toFixed(2)}`
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0">
      <img
        src={product.image.thumbnail}
        alt={product.name}
        className="w-16 h-16 object-cover rounded-md"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
        <p className="text-sm text-gray-600">
          {priceFormattedInCart(product.price, quantity, itemTotal)}
        </p>
      </div>
      <button
        onClick={handleRemove}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors flex-shrink-0"
        aria-label={`Remove ${product.name} from cart`}
      >
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

