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
import { toast } from 'sonner';

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
      toast.success(`${data.name} was added to the cart`);
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
      toast.success(`${data.name}'s quantity was updated`);
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
      toast.success(`Item was removed from the cart`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
