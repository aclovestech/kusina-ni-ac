import { createFileRoute } from '@tanstack/react-router';
import { useGetUserAddresses } from '../hooks/useUsersHooks';
import { useState } from 'react';
import { AddressCard } from '../components';
import { useGetCart, useCreateCheckoutSession } from '../hooks/useCartHooks';

export const Route = createFileRoute('/checkout')({
  component: Checkout,
});

function Checkout() {
  const { data: addresses, isLoading, isError } = useGetUserAddresses();
  const { data: cart, isPending: isCartPending } = useGetCart();
  const { mutate: createCheckoutSession } = useCreateCheckoutSession();
  const [isDoneWithStepOne, setIsDoneWithStepOne] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState('');

  function handleSelectAddress(addressId: string) {
    setSelectedAddressId(addressId);
  }

  function checkIfSelected(addressId: string) {
    return selectedAddressId === addressId;
  }

  function ErrorDisplay() {
    return (
      <>
        <p className="self-center text-error">Unable to load addresses</p>
        <button className="btn btn-primary self-center">Retry</button>
      </>
    );
  }

  function LoadingDisplay() {
    return (
      <div className="loading loading-spinner loading-lg self-center"></div>
    );
  }

  function NoAddressesDisplay() {
    return (
      <>
        <p className="self-center">You have no addresses saved</p>
        <div className="btn btn-primary self-center">Add an address here</div>
      </>
    );
  }

  function AddressDisplay() {
    return (
      <>
        {addresses?.map((address, index) => (
          <AddressCard
            key={index}
            addressInfo={address}
            addressIndex={index}
            isForCheckout={true}
            isSelected={(addressId) => checkIfSelected(addressId)}
            onClick={() => handleSelectAddress(address.address_id)}
          />
        ))}
      </>
    );
  }

  function StepOneDisplay() {
    return (
      <>
        {isError ? (
          <ErrorDisplay />
        ) : isLoading ? (
          <LoadingDisplay />
        ) : addresses?.length === 0 ? (
          <NoAddressesDisplay />
        ) : (
          <AddressDisplay />
        )}
        <div className="card-actions self-center">
          <button
            className="btn btn-primary mt-2"
            onClick={() => setIsDoneWithStepOne(true)}
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  function StepTwoDisplay() {
    const selectedAddress = addresses?.find(
      (item) => item.address_id === selectedAddressId
    );

    function handlePlaceOrder() {
      createCheckoutSession(selectedAddressId);
    }

    return (
      <>
        <p className="text-center text-info">Shipping Address</p>
        <div>
          <p>{selectedAddress?.address_line1}</p>
          <p>{selectedAddress?.address_line2}</p>
          <p>{`${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.postal_code}`}</p>
          <p>{selectedAddress?.phone_number}</p>
        </div>
        <p className="text-center text-info">Order Summary</p>
        <div
          className={isCartPending ? 'loading loading-spinner loading-lg' : ''}
        >
          {cart?.cart_items.map((item) => {
            return (
              <div key={item.name}>
                <p>{item.name}</p>
                <p>
                  {item.price} x {item.quantity}
                </p>
              </div>
            );
          })}
          {cart && (
            <p className="text-info">
              {`Total: ${cart.cart_items
                .map((item) => item.price * item.quantity)
                .reduce((a, b) => a + b, 0)}`}
            </p>
          )}
        </div>
        <div className="mt-2 flex flex-col items-center gap-2 self-center">
          <button className="btn btn-primary" onClick={handlePlaceOrder}>
            Place Order
          </button>
          <button
            className="btn btn-primary w-fit"
            onClick={() => setIsDoneWithStepOne(false)}
          >
            Back
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="card m-4 bg-base-300 shadow-xl">
        <div className="card-body">
          <div className="card-title self-center">Checkout</div>
          <ul className="steps mt-2">
            <li className="step step-primary">Shipping</li>
            <li className={isDoneWithStepOne ? 'step step-primary' : 'step'}>
              Review
            </li>
          </ul>
          <div className="divider my-0"></div>
          <div className="mb-2 self-center text-info">
            {isDoneWithStepOne
              ? 'Review your order'
              : 'Select a shipping address'}
          </div>
          {isDoneWithStepOne ? <StepTwoDisplay /> : <StepOneDisplay />}
        </div>
      </div>
    </>
  );
}
