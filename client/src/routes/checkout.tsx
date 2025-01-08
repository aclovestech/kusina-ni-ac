import { createFileRoute } from '@tanstack/react-router';
import { useGetUserAddresses } from '../hooks/useUsersHooks';
import { useState } from 'react';

export const Route = createFileRoute('/checkout')({
  component: Checkout,
});

function Checkout() {
  const { data: addresses, isLoading, isError } = useGetUserAddresses();
  const [isDoneWithStepOne, setIsDoneWithStepOne] = useState(false);

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
        <div></div>
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
    return (
      <>
        <p className="text-center">Shipping Address</p>
        <p className="text-center">Order Summary</p>
        <div className="mt-2 flex flex-col items-center gap-2 self-center">
          <button className="btn btn-primary">Place Order</button>
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
