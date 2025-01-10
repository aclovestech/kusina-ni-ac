// Imports
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUser,
  updateUser,
  getUserAddresses,
  createNewUserAddress,
  updateUserAddress,
  deleteUserAddress,
  UserAddress,
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
    mutationKey: ['updateUser'],
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createUserAddress'],
    mutationFn: (data: UserAddressInput) => createNewUserAddress(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['userAddresses'], (oldData: UserAddress[]) => {
        return [...oldData, data];
      });
      onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
    },
  });
}

export function useUpdateUserAddress(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUserAddress'],
    mutationFn: ({
      address_id,
      data,
    }: {
      address_id: string;
      data: UserAddressUpdateInput;
    }) => updateUserAddress(address_id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['userAddresses'], (oldData: UserAddress[]) => {
        return oldData.map((address) =>
          address.address_id === data.address_id
            ? { ...address, ...data }
            : address
        );
      });
      onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
    },
  });
}

export function useDeleteUserAddress(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteUserAddress'],
    mutationFn: (address_id: string) => deleteUserAddress(address_id),
    onSuccess: (_data, address_id) => {
      queryClient.setQueryData(['userAddresses'], (oldData: UserAddress[]) => {
        return oldData.filter((address) => address.address_id !== address_id);
      });
      onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
    },
  });
}
