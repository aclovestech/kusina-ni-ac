// Imports
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNewCart,
  getCart,
  addItemToCart,
  updateItemInCart,
  removeItemFromCart,
  CartDetails,
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
    retry: false,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addItemToCart'],
    mutationFn: ({
      product_id,
      quantity,
    }: {
      product_id: string;
      quantity: number;
    }) => addItemToCart(product_id, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], (oldData: CartDetails) => {
        return {
          ...oldData,
          cart_items: [...oldData.cart_items, data],
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateItemInCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateItemInCart'],
    mutationFn: ({
      product_id,
      quantity,
    }: {
      product_id: string;
      quantity: number;
    }) => updateItemInCart(product_id, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], (oldData: CartDetails) => {
        return {
          ...oldData,
          cart_items: oldData.cart_items.map((item) => {
            if (item.product_id === data.product_id) {
              return data;
            }
            return item;
          }),
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveItemFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['removeItemFromCart'],
    mutationFn: (product_id: string) => removeItemFromCart(product_id),
    onSuccess: (_data, product_id) => {
      queryClient.setQueryData(['cart'], (oldData: CartDetails) => {
        return {
          ...oldData,
          cart_items: oldData.cart_items.filter(
            (item) => item.product_id !== product_id
          ),
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
