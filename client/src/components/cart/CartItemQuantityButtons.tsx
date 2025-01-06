// Imports
import { CartItem } from '../../api';
import { UseMutateFunction } from '@tanstack/react-query';

type CartItemQuantityButtonsProps = {
  item: CartItem;
  update: UseMutateFunction<
    CartItem,
    Error,
    { product_id: string; quantity: number },
    unknown
  >;
  isPending: boolean;
};

export function CartItemQuantityButtons({
  item,
  update,
  isPending,
}: CartItemQuantityButtonsProps) {
  function handleIncrement() {
    update({ product_id: item.product_id, quantity: item.quantity + 1 });
  }

  function handleDecrement() {
    if (item.quantity > 1) {
      update({ product_id: item.product_id, quantity: item.quantity - 1 });
    }
  }

  const activeButton = 'btn btn-circle btn-outline btn-sm';
  const disabledButton = 'btn btn-circle btn-outline btn-disabled btn-sm';

  return (
    <div className="flex flex-row">
      <button
        className={isPending ? disabledButton : activeButton}
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="w-14 self-center justify-self-center text-center">
        {item.quantity}
      </span>
      <button
        className={isPending ? disabledButton : activeButton}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
