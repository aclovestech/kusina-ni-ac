// Imports
import apiClient from './apiClient';

export async function getCategories() {
  return await apiClient.get<Category[]>('products/categories').json();
}

export async function getAllProducts(page: number) {
  const params = new URLSearchParams({ page: page.toString() });
  return await apiClient
    .get<Products>('products/all', { searchParams: params })
    .json();
}

export async function getProductsByCategory(category_id: number, page: number) {
  const params = new URLSearchParams({
    category_id: category_id.toString(),
    page: page.toString(),
  });
  return await apiClient
    .get<Products>('products', { searchParams: params })
    .json();
}

export async function getProductById(product_id: string) {
  return await apiClient.get<Product>(`products/${product_id}`).json();
}

export type Category = {
  category_id: number;
  name: string;
  description: string;
};

export type Product = {
  category_id: number;
  category_name: string;
  product_id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  is_available: boolean;
  image_url: string;
};

export type Products = {
  totalPages: number;
  totalItems: number;
  maxItemsPerPage: number;
  products: Product[];
};
