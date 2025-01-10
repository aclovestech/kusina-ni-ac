// Imports
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import productImage from '../assets/home-hero.jpeg';
import { QuantityButtons, AddToCartButton } from '../components';
import { useState } from 'react';
import { useGetProductById } from '../hooks/useProductsHooks';
import { ProductDetailsSkeleton } from '../components';
import { useGetCart } from '../hooks/useCartHooks';

export const Route = createFileRoute('/menu/product/$productId')({
  component: ProductDetails,
});

function ProductDetails() {
  const productId = useParams({
    from: '/menu/product/$productId',
    select: (params) => params.productId,
  });

  const { data: product, isPending, isError } = useGetProductById(productId);
  const { data: cart } = useGetCart();

  const cartItem = cart?.cart_items.find(
    (item) => item.product_id === productId
  );

  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  return (
    <>
      {isError ? (
        <div className="p-8 text-center">
          Error fetching products, please try again later.
        </div>
      ) : (
        <div className="mx-4 mt-2 max-w-3xl md:mx-8 lg:mx-auto">
          {isPending && <ProductDetailsSkeleton />}
          {product && (
            <>
              <div className="breadcrumbs px-4 text-sm">
                <ul>
                  <li>
                    <Link to="/menu/category/all">All Products</Link>
                  </li>
                  <li>{product.name}</li>
                </ul>
              </div>

              <div className="mb-8 mt-2 flex flex-col justify-center px-4 md:mb-0 md:flex-row">
                <figure className="self-center justify-self-center md:w-1/2">
                  <img
                    src={product.image_url || productImage}
                    alt="Product Image"
                    className="aspect-video h-auto w-full rounded-xl object-cover"
                  />
                </figure>

                <div className="mt-4 self-center px-2 md:mt-0 md:w-1/2 md:px-4">
                  <h1 className="text-2xl font-bold">{product.name}</h1>
                  <h2 className="mt-2 text-xl font-semibold">{`$${product.price}`}</h2>
                  <p className="mt-3">
                    {product.description || 'No description available'}
                  </p>
                  <QuantityButtons
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <AddToCartButton
                    isItemInCart={!!cartItem}
                    product_id={productId}
                    quantity={quantity}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
