// Imports
import apiClient from './apiClient';

export async function getOrders() {
  return await apiClient.get<Order[]>('orders').json();
}

export async function getOrderById(order_id: string) {
  return await apiClient.get<Order>(`orders/${order_id}`).json();
}

export type Order = {
  order_details: OrderDetails;
  address_details: OrderAddressDetails;
  order_items: OrderItem[];
};

export type OrderDetails = {
  customer_id: string;
  order_id: string;
  status: string;
  total_amount: number;
  order_date: string;
  updated_at: string;
};

export type OrderAddressDetails = {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone_number: string;
};

export type OrderItem = {
  product_name: string;
  product_image_url: string;
  quantity: number;
  base_price: number;
  subtotal_amount: number;
};
