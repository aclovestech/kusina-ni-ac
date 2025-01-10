// Imports
import { useNavigate } from '@tanstack/react-router';
import {
  useAddItemToCart,
  useUpdateItemInCart,
} from '../../hooks/useCartHooks';
import isSignedIn from '../../utils/getIsSignedIn';

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
  const navigate = useNavigate();
  const { mutate: addItemToCart } = useAddItemToCart();
  const { mutate: updateItemInCart } = useUpdateItemInCart();

  async function handleOnClick() {
    const user = await isSignedIn();
    if (!user) {
      navigate({ to: '/auth/sign-in' });
    }

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
