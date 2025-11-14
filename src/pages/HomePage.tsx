import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { OrderConfirmation } from '../components/OrderConfirmation';
import type { OrderResponse } from '../types';

export const HomePage = () => {
  const { data: products, isLoading, error } = useProducts();
  const [confirmedOrder, setConfirmedOrder] = useState<OrderResponse | null>(null);

  const handleOrderSuccess = (order: OrderResponse) => {
    setConfirmedOrder(order);
  };

  const handleCloseConfirmation = () => {
    setConfirmedOrder(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load products</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Desserts</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Products Section */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="lg:sticky lg:top-8">
              <Cart onOrderSuccess={handleOrderSuccess} />
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {confirmedOrder && (
        <OrderConfirmation order={confirmedOrder} onClose={handleCloseConfirmation} />
      )}
    </div>
  );
};

