// Imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { CartItem } from '../components';

export const Route = createFileRoute('/cart')({
  component: Cart,
});

function Cart() {
  function CartItemsEmpty() {
    return (
      <div className="p-4 text-center">
        <p className="text-2xl font-bold">Looks like it's empty!</p>
        <p className="mt-2 text-lg">Why not add something?</p>
        <Link to="/menu/category/all" className="btn btn-primary mt-4">
          Explore Our Menu
        </Link>
      </div>
    );
  }

  function CartItemsNotEmpty() {
    return (
      <>
        <ul className="flex flex-col gap-4">
          <CartItem />
          <CartItem />
        </ul>
        <div className="divider my-0"></div>
        <div className="p-2 text-center">
          <p className="text-lg font-bold">Order Summary</p>
          <p className="text-info">Total: $1000</p>
        </div>
        <div className="divider my-0"></div>
        <div className="card-actions justify-center">
          <button className="btn btn-primary w-full">
            Continue to Checkout
          </button>
        </div>
      </>
    );
  }

  function CartItemsStillLoading() {
    return (
      <div className="loading loading-spinner loading-lg self-center"></div>
    );
  }

  return (
    <div className="card m-4 bg-base-300 shadow-xl">
      <div className="card-body p-4">
        <div className="card-title self-center">Your Cart</div>
        <div className="divider my-0"></div>
        <CartItemsNotEmpty />
      </div>
    </div>
  );
}
