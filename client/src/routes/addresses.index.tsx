// Imports
import { createFileRoute, redirect } from '@tanstack/react-router';
import { AddressCard, NewAddressButton } from '../components';
import { useGetUserAddresses } from '../hooks/useUsersHooks';
import isSignedIn from '../utils/getIsSignedIn';

export const Route = createFileRoute('/addresses/')({
  loader: async () => {
    const user = await isSignedIn();
    if (!user) {
      throw redirect({ to: '/auth/sign-in' });
    }
    return {};
  },
  component: Addresses,
});

function Addresses() {
  const { data: addresses, isPending, isError } = useGetUserAddresses();

  return (
    <>
      <div className="card m-4 bg-base-300">
        <div className="card-body p-6">
          <div className="card-title">Addresses</div>

          {isPending ? (
            <span className="loading loading-spinner loading-lg self-center"></span>
          ) : isError ? (
            <p className="text-center">
              Unable to retrieve addresses, please try again later.
            </p>
          ) : (
            <>
              {addresses?.length > 0 &&
                addresses.map((address, index) => (
                  <AddressCard
                    key={index}
                    addressInfo={address}
                    addressIndex={index}
                  />
                ))}
              <NewAddressButton />
            </>
          )}
        </div>
      </div>
    </>
  );
}
