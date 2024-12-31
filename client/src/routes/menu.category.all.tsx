// Imports
import { createFileRoute } from '@tanstack/react-router';
import { ProductCard, ProductCardSkeleton } from '../components';
import { useGetAllProducts } from '../hooks/useProductsHooks';
import { useState } from 'react';
import productImage from '../assets/home-hero.jpeg';

export const Route = createFileRoute('/menu/category/all')({
  component: AllProducts,
});

function AllProducts() {
  const [page, setPage] = useState(1);
  const { data: products, isPending, isError } = useGetAllProducts(page);

  function createElements(count: number) {
    return Array.from({ length: count }, (_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  }

  function handlePageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const page = parseInt(event.target.getAttribute('aria-label') as string);
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {isError ? (
        <div className="p-8 text-center">
          Error fetching products, please try again later.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
            {isPending && createElements(8)}
            {products &&
              products.map((product) => {
                return (
                  <ProductCard
                    key={product.product_id}
                    data={{
                      imageURL: productImage,
                      name: product.name,
                      description: product.description,
                      category: product.category_name,
                      linkTo: `/menu/product/${product.product_id}`,
                    }}
                  />
                );
              })}
          </div>
          <div className="mb-8 mt-4 flex justify-center">
            <div className="join">
              <input
                type="radio"
                className="btn btn-square join-item"
                name="options"
                aria-label="1"
                defaultChecked
                onChange={handlePageChange}
              />
              <input
                type="radio"
                className="btn btn-square join-item"
                name="options"
                aria-label="2"
                onChange={handlePageChange}
              />
              <input
                type="radio"
                className="btn btn-square join-item"
                name="options"
                aria-label="3"
                onChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
