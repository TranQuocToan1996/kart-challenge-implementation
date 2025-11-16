import { useCartStore } from '../store/cartStore';
import { LazyImage } from './LazyImage'; // ✅ TODO change: Use lazy loading component
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
      <LazyImage
        src={product.image.thumbnail}
        alt={product.name}
        className="w-16 h-16 object-cover rounded-md"
        rootMargin="20px" // ✅ TODO change: Cart items load when closer to viewport
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
        <p className="text-sm text-gray-600">
          {priceFormattedInCart(product.price, quantity, itemTotal)}
        </p>
      </div>
      <button
        onClick={handleRemove}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors shrink-0"
        aria-label={`Remove ${product.name} from cart`}
      >
        <img
          src="/remove_product_from_cart.png"
          alt={`Remove ${product.name} from cart`}
          className="w-[18px] h-[18px]"
        />
      </button>
    </div>
  );
};

