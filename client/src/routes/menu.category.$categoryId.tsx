// Imports
import { createFileRoute, useParams } from '@tanstack/react-router';
import { useGetProductsByCategory } from '../hooks/useProductsHooks';
import { useState } from 'react';
import { ProductsList } from '../components';

export const Route = createFileRoute('/menu/category/$categoryId')({
  component: ProductsPerCategory,
});

function ProductsPerCategory() {
  const [page, setPage] = useState(1);

  const category_id = parseInt(
    useParams({
      from: '/menu/category/$categoryId',
      select: (params) => params.categoryId,
    })
  );

  const {
    data: products,
    isPending,
    isError,
  } = useGetProductsByCategory(category_id, page);

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
