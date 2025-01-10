// Imports
import {
  createFileRoute,
  useParams,
  Link,
  redirect,
} from '@tanstack/react-router';
import { AddressForm } from '../components';
import isSignedIn from '../utils/getIsSignedIn';

export const Route = createFileRoute('/addresses/$addressId/edit')({
  loader: async () => {
    const user = await isSignedIn();
    if (!user) {
      throw redirect({ to: '/auth/sign-in' });
    }
    return {};
  },
  component: EditAddress,
});

function EditAddress() {
  const addressId = useParams({
    from: '/addresses/$addressId/edit',
    select: (params) => params.addressId,
  });

  return (
    <>
      <div className="card m-4 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="mb-2 text-lg font-bold">Enter address details</h2>
          <AddressForm isCreatingNewAddress={false} addressId={addressId} />
          <Link
            to="/addresses"
            className="btn btn-primary mt-4 w-fit self-center"
          >
            Back
          </Link>
        </div>
      </div>
    </>
  );
}
