import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../constants';
import type { Product, OrderRequest, OrderResponse } from '../types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>('/product');
  return response.data;
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

