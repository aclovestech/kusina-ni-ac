// Imports
import { CartItemQuantityButtons, CartItemRemoveButton } from '../';
import productImage from '../../assets/home-hero.jpeg';

export function CartItem() {
  return (
    <li className="flex flex-col items-center justify-evenly gap-3 p-4 md:flex-row">
      <figure>
        <img src={productImage} alt="Product" className="w-40 rounded-xl" />
      </figure>
      <div className="text-lg">Product 1</div>
      <div className="">$10.00</div>

      <div className="">
        <CartItemQuantityButtons />
      </div>
      <div className="text-info">Subtotal: $10.00</div>
      <CartItemRemoveButton />
    </li>
  );
}
