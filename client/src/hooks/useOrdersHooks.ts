// Imports
import { useQuery } from '@tanstack/react-query';
import { getOrders, getOrderById } from '../api';

export function useGetOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
  });
}

export function useGetOrderById(order_id: string) {
  return useQuery({
    queryKey: ['order', order_id],
    queryFn: () => getOrderById(order_id),
  });
}
