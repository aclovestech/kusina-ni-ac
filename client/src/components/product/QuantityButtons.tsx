export function QuantityButtons({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <>
      <div id="cart-counter" className="mt-4 flex items-center justify-center">
        <button
          id="decrement"
          className="btn btn-outline"
          onClick={handleDecrement}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          readOnly
          className="w-16 appearance-none bg-inherit text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          id="increment"
          className="btn btn-outline"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </>
  );
}
