// Imports
import { createFileRoute, Link } from '@tanstack/react-router';
import { CartItem } from '../components';
import { useGetCart, useUpdateItemInCart } from '../hooks/useCartHooks';

export const Route = createFileRoute('/cart')({
  component: Cart,
});

function Cart() {
  const { data: cart, isPending: isGettingCartDetails, isError } = useGetCart();
  const { mutate: update, isPending: isUpdatingCart } = useUpdateItemInCart();

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

  const total = cart?.cart_items
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  function CartItemsNotEmpty() {
    return (
      <>
        <ul className="flex flex-col gap-4">
          {cart?.cart_items.map((item) => (
            <CartItem
              key={item.name}
              item={item}
              update={update}
              isPending={isUpdatingCart}
            />
          ))}
        </ul>
        <div className="divider my-0"></div>
        <div className="p-2 text-center">
          <p className="text-lg font-bold">Order Summary</p>
          <p className="text-info">Total: ${total?.toFixed(2)}</p>
        </div>
        <div className="divider my-0"></div>
        <div className="card-actions justify-center">
          <Link
            to="/cart/checkout"
            className={
              isUpdatingCart
                ? 'btn btn-disabled btn-primary w-full'
                : 'btn btn-primary w-full'
            }
          >
            Continue to Checkout
          </Link>
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
        {isGettingCartDetails ? (
          <CartItemsStillLoading />
        ) : isError || !cart ? (
          <CartItemsEmpty />
        ) : cart.cart_items.length === 0 ? (
          <CartItemsEmpty />
        ) : (
          <CartItemsNotEmpty />
        )}
      </div>
    </div>
  );
}
