// Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  registerCustomer,
  loginCustomer,
  checkCustomerSession,
  logoutCustomer,
} from '../api';
import { LoginFormInput, RegistrationFormInput } from '../schemas/authSchemas';

export function useRegisterCustomer(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegistrationFormInput) => registerCustomer(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['customerSession'], data);
      queryClient.refetchQueries({ queryKey: ['cart'], type: 'active' });
      onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customerSession'] });
    },
  });
}

export function useLoginCustomer(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginFormInput) => loginCustomer(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['customerSession'], data);
      queryClient.refetchQueries({ queryKey: ['cart'], type: 'active' });
      onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customerSession'] });
    },
  });
}

export function useCheckCustomerSession() {
  return useQuery({
    queryKey: ['customerSession'],
    queryFn: () => checkCustomerSession(),
    retry: false,
  });
}

export function useLogoutCustomer(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logoutCustomer(),
    onSuccess: () => {
      queryClient.setQueryData(['customerSession'], null);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['userAddresses'] });
      onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customerSession'] });
    },
  });
}
