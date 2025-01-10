// Imports
import apiClient from './apiClient';

export async function createNewCart() {
  return await apiClient.post<NewlyCreatedCartDetails>('cart').json();
}

export async function getCart() {
  return await apiClient.get<CartDetails>('cart').json();
}

export async function addItemToCart(product_id: string, quantity: number) {
  return await apiClient
    .post<CartItem>('cart', {
      json: { product_id: product_id, quantity: quantity },
    })
    .json();
}

export async function updateItemInCart(product_id: string, quantity: number) {
  return await apiClient
    .patch<CartItem>('cart', {
      json: { product_id: product_id, quantity: quantity },
    })
    .json();
}

export async function removeItemFromCart(product_id: string) {
  return await apiClient
    .delete('cart', { json: { product_id: product_id } })
    .json();
}

export async function createCheckoutSession(address_id: string) {
  const { url } = await apiClient
    .post<CreateSessionData>('cart/create-checkout-session', {
      json: { address_id: address_id },
    })
    .json();
  window.location.href = url;
}

export type NewlyCreatedCartDetails = {
  cart_id: string;
  customer_id: string;
  created_at: string;
  updated_at: string;
  is_checked_out: boolean;
};

export type CartDetails = {
  cart_id: string;
  cart_items: CartItem[];
};

export type CartItem = {
  product_id: string;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
};

export type CreateSessionData = {
  url: string;
};
