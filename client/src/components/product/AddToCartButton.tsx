export function AddToCartButton({ quantity }: { quantity: number }) {
  const isItemInCart = false;

  function handleOnClick() {
    console.log(`Add to cart button clicked with quantity: ${quantity}`);
  }

  return (
    <>
      <button className="btn btn-outline mt-6 w-full" onClick={handleOnClick}>
        {isItemInCart ? 'Update Cart' : 'Add to Cart'}
      </button>
    </>
  );
}
