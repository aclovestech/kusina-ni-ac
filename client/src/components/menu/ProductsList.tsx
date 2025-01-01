// Imports
import { Products } from '../../api';
import { ProductCard } from './ProductCard';
import productImage from '../../assets/home-hero.jpeg';
import {
  ProductsPaginationButtons,
  ProductCardSkeleton,
} from '../../components';

export function ProductsList({
  products,
  isError,
  isPending,
  page,
  setPage,
}: ProductsListProps) {
  function createSkeletonElements(count: number) {
    return Array.from({ length: count }, (_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  }

  return (
    <>
      {isError ? (
        <div className="p-8 text-center">
          Error fetching products, please try again later.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
            {isPending && createSkeletonElements(8)}
            {products &&
              products.products.map((product) => {
                return (
                  <ProductCard
                    key={product.product_id}
                    data={{
                      imageURL: product.image_url || productImage,
                      name: product.name,
                      description: product.description,
                      category: product.category_name,
                      linkTo: `/menu/product/${product.product_id}`,
                      price: product.price,
                    }}
                  />
                );
              })}
          </div>
          <div className="mb-8 mt-4 flex justify-center">
            <div className="join">
              <ProductsPaginationButtons
                products={products}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

type ProductsListProps = {
  isError: boolean;
  isPending: boolean;
  products: Products | undefined;
  page: number;
  setPage: (page: number) => void;
};
