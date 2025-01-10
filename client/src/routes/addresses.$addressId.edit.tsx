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
    <div className="card mx-4 my-8 max-w-3xl bg-base-300 md:mx-8 lg:mx-auto">
      <div className="card-body">
        <h2 className="card-title mb-2 self-center">Enter address details</h2>
        <AddressForm isCreatingNewAddress={false} addressId={addressId} />
        <Link
          to="/addresses"
          className="btn btn-primary mt-4 w-fit self-center"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
