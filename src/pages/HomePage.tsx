import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { OrderConfirmation } from '../components/OrderConfirmation';
import { Pagination } from '../components/Pagination';
import type { OrderResponse } from '../types';

const ITEMS_PER_PAGE = 6; // Reduced for testing - change back to 20 for production

export const HomePage = () => {
  const { data: products, isLoading, error } = useProducts();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const items = useCartStore((state) => state.items);
  const discountCode = useCartStore((state) => state.discountCode);

  const handleConfirmOrder = () => {
    // Show confirmation modal with cart data
    setShowConfirmation(true);
  };

  const handleOrderSuccess = (order: OrderResponse) => {
    setConfirmedOrder(order);
    setShowConfirmation(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmedOrder(null);
  };

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!products) return 0;
    return Math.ceil(products.length / ITEMS_PER_PAGE);
  }, [products]);

  // Ensure currentPage is valid (derived state)
  const validCurrentPage = useMemo(() => {
    if (totalPages === 0) return 1;
    return Math.min(Math.max(1, currentPage), totalPages);
  }, [currentPage, totalPages]);

  // Calculate pagination
  const paginatedProducts = useMemo(() => {
    if (!products) return [];

    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }, [products, validCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div className="lg:col-span-8 order-2 lg:order-1 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="lg:sticky lg:top-8">
              <Cart onOrderSuccess={handleConfirmOrder} />
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal (Before Purchase) */}
      {showConfirmation && (
        <OrderConfirmation
          items={items}
          discountCode={discountCode}
          onClose={handleCloseConfirmation}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Order Success Modal (After Purchase) */}
      {confirmedOrder && (
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
            <button
              onClick={handleCloseConfirmation}
              className="w-full bg-primary-orange text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 transition-colors"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}

      {/* Fixed Pagination - Hide when confirmation modal is open */}
      {totalPages > 0 && !showConfirmation && !confirmedOrder && (
        <Pagination
          currentPage={validCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

