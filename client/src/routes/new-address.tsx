// Imports
import { createFileRoute } from '@tanstack/react-router';
import { AddressForm } from '../components';

export const Route = createFileRoute('/new-address')({
  component: NewAddress,
});

function NewAddress() {
  return (
    <>
      <div className="card m-4 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="mb-2 text-lg font-bold">Enter address details</h2>
          <AddressForm isCreatingNewAddress={true} />
        </div>
      </div>
    </>
  );
}
