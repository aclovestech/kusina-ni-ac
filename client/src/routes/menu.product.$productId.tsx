// Imports
import { createFileRoute, Link } from '@tanstack/react-router';
import productImage from '../assets/home-hero.jpeg';
import { useState } from 'react';

export const Route = createFileRoute('/menu/product/$productId')({
  component: ProductDetails,
});

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className="mb-8 lg:mx-32 xl:mx-72">
      <div className="breadcrumbs px-4 text-sm">
        <ul>
          <li>
            <Link to="/menu/category/all">All Products</Link>
          </li>
          <li>Product Name</li>
        </ul>
      </div>

      <div className="mb-8 mt-2 flex flex-col justify-center px-4 md:mb-0 md:flex-row">
        <figure className="self-center justify-self-center md:w-1/2">
          <img
            src={productImage}
            alt="Movie"
            className="h-auto w-full rounded-xl object-cover"
          />
        </figure>

        <div className="mt-4 self-center px-2 md:mt-0 md:w-1/2 md:px-4">
          <h1 className="text-2xl font-bold">Adobo</h1>
          <h2 className="mt-2 text-xl font-semibold">$12.99</h2>
          <p className="mt-3">
            Tender chicken or pork marinated in soy sauce, vinegar, and garlic,
            slow-cooked to perfection.
          </p>
          <div
            id="cart-counter"
            className="mt-4 flex items-center justify-center"
          >
            <button
              id="decrement"
              className="btn btn-outline"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              className="w-16 appearance-none bg-inherit text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              id="increment"
              className="btn btn-outline"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>

          <button className="btn btn-outline mt-6 w-full">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
