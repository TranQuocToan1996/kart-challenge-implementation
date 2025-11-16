import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants';
import { getAssetPath } from '../utils/assets';
import type { Product, OrderRequest, OrderResponse } from '../types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  // Add CORS configuration
  withCredentials: false, // Don't send cookies
});

// Add request interceptor for CORS
apiClient.interceptors.request.use((config) => {
  // Ensure proper headers for CORS
  if (!import.meta.env.DEV) {
    config.headers['Access-Control-Allow-Origin'] = '*';
  }
  return config;
});

const loadFallbackProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(getAssetPath('/product.json'));
    if (!response.ok) {
      throw new Error('Failed to load fallback products');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load fallback products:', error);
    return [];
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>('/product');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      console.warn('Request timeout, using fallback data:', error);
    } else {
      console.warn('API call failed, using fallback data:', error);
    }
    // Fallback to local JSON file
    return await loadFallbackProducts();
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/product/${id}`);
  return response.data;
};

export const placeOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  try {
    const response = await apiClient.post<OrderResponse>('/order', orderData, {
      headers: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw new Error('Request timeout: The server took too long to respond. Please try again.');
    }
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || 'Failed to place order. Please try again.');
    }
    throw error;
  }
};

