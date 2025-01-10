import { createFileRoute, redirect } from '@tanstack/react-router';
import { useGetUserAddresses } from '../hooks/useUsersHooks';
import { useState } from 'react';
import { AddressCard } from '../components';
import { useGetCart, useCreateCheckoutSession } from '../hooks/useCartHooks';
import isSignedIn from '../utils/getIsSignedIn';

export const Route = createFileRoute('/cart/checkout')({
  loader: async () => {
    const user = await isSignedIn();
    if (!user) {
      throw redirect({ to: '/auth/sign-in' });
    }
    return {};
  },
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
        <div className="m-4 text-center">
          <p>{selectedAddress?.address_line1}</p>
          <p>{selectedAddress?.address_line2}</p>
          <p>{`${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.postal_code}`}</p>
          <p>{selectedAddress?.phone_number}</p>
        </div>
        <p className="text-center text-info">Order Summary</p>
        <div
          className={
            isCartPending ? 'loading loading-spinner loading-lg m-4' : 'm-4'
          }
        >
          {cart?.cart_items.map((item) => {
            return (
              <div key={item.name} className="text-center">
                <p>{item.name}</p>
                <p>
                  {item.price} x {item.quantity}
                </p>
              </div>
            );
          })}
        </div>
        {cart && (
          <p className="text-center text-info">
            {`Total: ${cart.cart_items
              .map((item) => item.price * item.quantity)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}`}
          </p>
        )}
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
    <div className="card mx-4 my-8 max-w-3xl bg-base-300 shadow-xl md:mx-8 lg:mx-auto">
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
  );
}
