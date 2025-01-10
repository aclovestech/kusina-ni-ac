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
      <div className="card mx-4 my-8 max-w-3xl bg-base-300 md:mx-8 lg:mx-auto">
        <div className="card-body p-6">
          <h2 className="card-title self-center">Addresses</h2>

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
