import { useCartStore } from '../store/cartStore';
import type { OrderResponse } from '../types';

interface OrderConfirmationProps {
  order: OrderResponse;
  onClose: () => void;
}

export const OrderConfirmation = ({ order, onClose }: OrderConfirmationProps) => {
  const clearCart = useCartStore((state) => state.clearCart);

  const handleStartNewOrder = () => {
    clearCart();
    onClose();
  };

  // Calculate order total from items and products
  const orderTotal = order.items.reduce((total, item) => {
    const product = order.products.find((p) => p.id === item.productId);
    if (product) {
      return total + product.price * item.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed</h2>
          <p className="text-gray-600">We hope you enjoy your food!</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          {order.items.map((item) => {
            const product = order.products.find((p) => p.id === item.productId);
            if (!product) return null;
            
            const itemTotal = product.price * item.quantity;
            return (
              <div key={`${product.id}-${item.productId}`} className="flex items-center gap-3">
                <img
                  src={product.image.thumbnail}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.quantity}x @ ${product.price.toFixed(2)} ${itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-base font-semibold text-gray-900">Order Total</span>
            <span className="text-xl font-bold text-gray-900">${orderTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleStartNewOrder}
          className="w-full bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

