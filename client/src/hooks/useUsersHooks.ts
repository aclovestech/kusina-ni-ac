// Imports
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getUser,
  updateUser,
  getUserAddresses,
  createNewUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from '../api';
import {
  UserUpdateInput,
  UserAddressInput,
  UserAddressUpdateInput,
} from '../schemas/usersSchemas';

export function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
}

export function useUpdateUser(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: UserUpdateInput) => updateUser(data),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}

export function useGetUserAddresses() {
  return useQuery({
    queryKey: ['userAddresses'],
    queryFn: () => getUserAddresses(),
  });
}

export function useCreateNewUserAddress(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: UserAddressInput) => createNewUserAddress(data),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}

export function useUpdateUserAddress(onSuccess?: () => void) {
  return useMutation({
    mutationFn: ({
      address_id,
      data,
    }: {
      address_id: string;
      data: UserAddressUpdateInput;
    }) => updateUserAddress(address_id, data),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}

export function useDeleteUserAddress(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (address_id: string) => deleteUserAddress(address_id),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
