export function CartItemQuantityButtons() {
  function handleIncrement() {}

  function handleDecrement() {
    // if (quantity > 1) {
    // }
  }

  return (
    <div className="flex flex-row">
      <button className="btn btn-circle btn-outline btn-sm">-</button>
      <span className="w-14 self-center justify-self-center text-center">
        1
      </span>
      <button className="btn btn-circle btn-outline btn-sm">+</button>
    </div>
  );
}
