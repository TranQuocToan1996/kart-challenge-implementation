import { useCartStore } from '../store/cartStore';
import { QuantitySelector } from './QuantitySelector';
import { LazyImage } from './LazyImage'; // ✅ TODO change: Use lazy loading component
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const cartItem = items.find((item) => item.product.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary-orange focus-within:ring-offset-2 relative">
      <div className="relative w-full aspect-square overflow-visible">
        <div className="absolute inset-0 overflow-hidden">
          <LazyImage
            src={product.image.thumbnail}
            sources={[
              { media: '(min-width: 1440px)', srcSet: product.image.desktop },
              { media: '(min-width: 768px)', srcSet: product.image.tablet },
              { media: '(min-width: 375px)', srcSet: product.image.mobile },
            ]}
            alt={product.name}
            className="w-full h-full object-cover"
            rootMargin="100px" // ✅ TODO change: Start loading 100px before visible
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 z-10">
          <div className="transform translate-y-1/2 w-full">
            {isInCart ? (
              <QuantitySelector product={product} quantity={cartItem.quantity} />
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full px-4 py-2.5 bg-white text-black rounded-[19px] border border-[#B8A1A2] font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] relative z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 relative z-0 pt-8">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-base font-semibold text-gray-900 mb-2">{product.name}</h3>
        <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

