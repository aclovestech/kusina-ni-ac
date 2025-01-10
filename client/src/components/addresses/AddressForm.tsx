// Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import {
  AddressFormSchema,
  AddressFormInput,
} from '../../schemas/addressesSchemas';
import {
  useCreateNewUserAddress,
  useUpdateUserAddress,
} from '../../hooks/useUsersHooks';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { UserAddress } from '../../api';

type AddressFormProps = {
  isCreatingNewAddress: boolean;
  addressId?: string | undefined;
};

type FormInputProps = {
  label: string;
  type: string;
  name: keyof AddressFormInput;
  register: UseFormRegister<AddressFormInput>;
  errors: FieldErrors;
};

const fields = [
  { label: 'Address Line 1', type: 'text', name: 'address_line1' },
  { label: 'Address Line 2', type: 'text', name: 'address_line2' },
  { label: 'City', type: 'text', name: 'city' },
  { label: 'State', type: 'text', name: 'state' },
  { label: 'Postal Code', type: 'text', name: 'postal_code' },
  { label: 'Country', type: 'text', name: 'country' },
  { label: 'Phone Number', type: 'text', name: 'phone_number' },
];

export function AddressForm({
  isCreatingNewAddress,
  addressId,
}: AddressFormProps) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const userAddresses = queryClient.getQueryData<UserAddress[]>([
    'userAddresses',
  ]);
  const address = userAddresses?.find(
    (address) => address.address_id === addressId
  );

  const { mutate: create, isPending: isCreatePending } =
    useCreateNewUserAddress(() => {
      navigate({ to: '/addresses' });
    });
  const { mutate: update, isPending: isUpdatePending } = useUpdateUserAddress(
    () => {
      navigate({ to: '/addresses' });
    }
  );

  const isPending = () => isCreatePending || isUpdatePending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormInput>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: address
      ? {
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          country: address.country,
          phone_number: address.phone_number,
          is_default: address.is_default,
        }
      : {},
  });

  function onSubmit(data: AddressFormInput) {
    if (isCreatingNewAddress) {
      create(data);
    } else {
      update({ address_id: addressId as string, data: data });
    }
  }

  return (
    <form
      className="w-full max-w-xs self-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((field) => {
        return (
          <FormInput
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name as keyof AddressFormInput}
            register={register}
            errors={errors}
          />
        );
      })}

      <div className="form-control mt-2">
        <label className="label cursor-pointer">
          <span className="label-text">Set as default address</span>
          <input
            {...register('is_default')}
            type="checkbox"
            className="checkbox"
          />
        </label>
      </div>

      <div className="card-actions mt-4 justify-center">
        <button
          className={isPending() ? 'btn btn-disabled' : 'btn btn-primary'}
          disabled={isPending()}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending() && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          Save
        </button>
      </div>
    </form>
  );
}

function FormInput({ label, name, type, register, errors }: FormInputProps) {
  return (
    <label className="form-control w-full max-w-xs gap-2">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...register(name)}
        type={type}
        placeholder={label}
        className={
          errors[name]
            ? 'input input-bordered input-error w-full max-w-xs'
            : 'input input-bordered w-full max-w-xs'
        }
      />
      {errors[name] && (
        <div className="label">
          <span className="label-text-alt text-error">
            {errors[name].message as string}
          </span>
        </div>
      )}
    </label>
  );
}
