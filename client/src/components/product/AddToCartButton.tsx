// Imports
import {
  useAddItemToCart,
  useUpdateItemInCart,
} from '../../hooks/useCartHooks';

type AddToCartButtonProps = {
  isItemInCart: boolean | undefined;
  product_id: string;
  quantity: number;
};

export function AddToCartButton({
  isItemInCart,
  product_id,
  quantity,
}: AddToCartButtonProps) {
  const { mutate: addItemToCart } = useAddItemToCart();
  const { mutate: updateItemInCart } = useUpdateItemInCart();

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
