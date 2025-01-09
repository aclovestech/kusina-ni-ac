// Imports
import { useNavigate } from '@tanstack/react-router';
import { UserAddress } from '../../api/usersService';
import { useDeleteUserAddress } from '../../hooks/useUsersHooks';

export function AddressCard({
  addressInfo,
  addressIndex,
  isForCheckout,
  isSelected,
  onClick,
}: {
  addressInfo: UserAddress;
  addressIndex: number;
  isForCheckout?: boolean | undefined;
  isSelected?: (address_id: string) => boolean;
  onClick?: () => void;
}) {
  const { mutate: deleteAddress } = useDeleteUserAddress();
  const navigate = useNavigate();

  function handleEdit() {
    navigate({
      to: '/edit-address/$addressId',
      params: { addressId: addressInfo.address_id },
    });
  }

  function handleDelete() {
    deleteAddress(addressInfo.address_id);
  }

  return (
    <div
      className={
        isForCheckout === true && !isSelected?.(addressInfo.address_id)
          ? 'card my-2 bg-base-100 shadow-xl'
          : 'card my-2 bg-primary text-primary-content shadow-xl'
      }
      onClick={() => onClick?.()}
    >
      <div className="card-body p-6">
        <div className="flex flex-row items-center justify-between">
          <h2 className="card-title">Address {addressIndex + 1}</h2>
          {addressInfo.is_default && (
            <div className="badge badge-outline">Default</div>
          )}
        </div>
        <div>
          <p>{addressInfo.address_line1}</p>
          <p>{addressInfo.address_line2}</p>
          <p>{`${addressInfo.city}, ${addressInfo.state}, ${addressInfo.postal_code}`}</p>
          <p>{addressInfo.phone_number}</p>
        </div>
        {!isForCheckout && (
          <div className="card-actions mt-4 justify-around">
            <button className="font-semibold" onClick={handleEdit}>
              Edit
            </button>
            <button className="font-semibold" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
