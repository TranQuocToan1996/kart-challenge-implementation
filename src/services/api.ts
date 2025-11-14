import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants';
import type { Product, OrderRequest, OrderResponse } from '../types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const loadFallbackProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/product.json');
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
    console.warn('API call failed, using fallback data:', error);
    // Fallback to local JSON file
    return await loadFallbackProducts();
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/product/${id}`);
  return response.data;
};

export const placeOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  const response = await apiClient.post<OrderResponse>('/order', orderData, {
    headers: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

