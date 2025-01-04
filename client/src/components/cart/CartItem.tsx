// Imports
import { CartItemQuantityButtons, CartItemRemoveButton } from '../';
import productImage from '../../assets/home-hero.jpeg';
import { type CartItem } from '../../api';
import { UseMutateFunction } from '@tanstack/react-query';

type CartItemProps = {
  item: CartItem;
  update: UseMutateFunction<
    CartItem,
    Error,
    { product_id: string; quantity: number },
    unknown
  >;
  isPending: boolean;
};

export function CartItem({ item, update, isPending }: CartItemProps) {
  return (
    <li className="flex flex-col items-center justify-evenly gap-3 p-4 md:flex-row">
      <figure>
        <img
          src={item.image_url || productImage}
          alt="Product"
          className="w-40 rounded-xl"
        />
      </figure>
      <div className="text-lg">{item.name}</div>
      <div className="">${item.price}</div>

      <div className="">
        <CartItemQuantityButtons
          item={item}
          update={update}
          isPending={isPending}
        />
      </div>
      <div className="text-info">Subtotal: ${item.price * item.quantity}</div>
      <CartItemRemoveButton item={item} isPending={isPending} />
    </li>
  );
}
