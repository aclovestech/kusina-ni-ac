// Imports

export function AddToCartButton({ quantity }: { quantity: number }) {
  const isItemInCart = false;

  console.log(quantity);

  return (
    <>
      <button className="btn btn-outline mt-6 w-full">
        {isItemInCart ? 'Update Cart' : 'Add to Cart'}
      </button>
    </>
  );
}
