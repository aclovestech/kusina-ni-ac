// Imports
import {
  useGetCart,
  useAddItemToCart,
  useUpdateItemInCart,
} from '../../hooks/useCartHooks';

export function AddToCartButton({
  product_id,
  quantity,
}: {
  product_id: string;
  quantity: number;
}) {
  const { data: cart } = useGetCart();
  const { mutate: addItemToCart } = useAddItemToCart();
  const { mutate: updateItemInCart } = useUpdateItemInCart();

  const isItemInCart = cart?.cart_items.some(
    (item) => item.product_id === product_id
  );

  function handleOnClick() {
    if (isItemInCart) {
      updateItemInCart({ product_id, quantity });
    } else {
      addItemToCart({ product_id, quantity });
    }
  }

  return (
    <>
      <button className="btn btn-outline mt-6 w-full" onClick={handleOnClick}>
        {isItemInCart ? 'Update Cart' : 'Add to Cart'}
      </button>
    </>
  );
}
