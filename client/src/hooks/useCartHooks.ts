// Imports
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  createNewCart,
  getCart,
  addItemToCart,
  updateItemInCart,
  removeItemFromCart,
} from '../api';

export function useCreateNewCart(onSuccess?: () => void) {
  return useMutation({
    mutationFn: () => createNewCart(),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}

export function useGetCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });
}

export function useAddItemToCart(onSuccess?: () => void) {
  return useMutation({
    mutationFn: ({
      product_id,
      quantity,
    }: {
      product_id: string;
      quantity: number;
    }) => addItemToCart(product_id, quantity),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}

export function useUpdateItemInCart(onSuccess?: () => void) {
  return useMutation({
    mutationFn: ({
      product_id,
      quantity,
    }: {
      product_id: string;
      quantity: number;
    }) => updateItemInCart(product_id, quantity),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}

export function useRemoveItemFromCart(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (product_id: string) => removeItemFromCart(product_id),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
