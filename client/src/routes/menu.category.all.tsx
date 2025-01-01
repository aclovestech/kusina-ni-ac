// Imports
import { createFileRoute } from '@tanstack/react-router';
import { useGetAllProducts } from '../hooks/useProductsHooks';
import { useState } from 'react';
import { ProductsList } from '../components';

export const Route = createFileRoute('/menu/category/all')({
  component: AllProducts,
});

function AllProducts() {
  const [page, setPage] = useState(1);
  const { data: products, isPending, isError } = useGetAllProducts(page);

  return (
    <>
      <ProductsList
        products={products}
        isPending={isPending}
        isError={isError}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
