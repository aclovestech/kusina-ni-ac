// Imports
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRemoveItemFromCart } from '../../hooks/useCartHooks';
import { CartItem } from '../../api';

type CartItemRemoveButtonProps = {
  item: CartItem;
  isPending: boolean;
};

export function CartItemRemoveButton({
  item,
  isPending,
}: CartItemRemoveButtonProps) {
  const [areYouSure, setAreYouSure] = useState(false);
  const { mutate: remove, isPending: isRemoving } = useRemoveItemFromCart();

  function handleRemove() {
    if (areYouSure) {
      remove(item.product_id);
    } else {
      setAreYouSure(true);
      setTimeout(() => {
        setAreYouSure(false);
      }, 5000);
    }
  }

  return (
    <div
      className={
        isPending || isRemoving
          ? 'btn btn-disabled w-fit'
          : areYouSure
            ? 'btn btn-error w-fit'
            : 'btn btn-outline w-fit'
      }
      onClick={handleRemove}
    >
      <Trash2 width={16} height={16} />
    </div>
  );
}
