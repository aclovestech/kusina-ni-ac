// Imports
import { useQuery } from '@tanstack/react-query';
import {
  getCategories,
  getAllProducts,
  getProductsByCategory,
  getProductById,
} from '../api';

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
}

export function useGetAllProducts(page: number) {
  return useQuery({
    queryKey: ['allProducts', page],
    queryFn: () => getAllProducts(page),
  });
}

export function useGetProductsByCategory(category_id: number, page: number) {
  return useQuery({
    queryKey: ['products', category_id, page],
    queryFn: () => getProductsByCategory(category_id, page),
  });
}

export function useGetProductById(product_id: string) {
  return useQuery({
    queryKey: ['product', product_id],
    queryFn: () => getProductById(product_id),
  });
}
