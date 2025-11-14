import { useMutation } from '@tanstack/react-query';
import { placeOrder } from '../services/api';
import type { OrderRequest, OrderResponse } from '../types';

export const useOrder = () => {
  return useMutation<OrderResponse, Error, OrderRequest>({
    mutationFn: placeOrder,
  });
};

