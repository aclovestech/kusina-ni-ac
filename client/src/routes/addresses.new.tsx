// Imports
import { createFileRoute, redirect } from '@tanstack/react-router';
import { AddressForm } from '../components';
import isSignedIn from '../utils/getIsSignedIn';

export const Route = createFileRoute('/addresses/new')({
  loader: async () => {
    const user = await isSignedIn();
    if (!user) {
      throw redirect({ to: '/auth/sign-in' });
    }
    return {};
  },
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
