// Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  registerCustomer,
  loginCustomer,
  checkCustomerSession,
  logoutCustomer,
} from '../api/authService';
import { LoginFormInput, RegistrationFormInput } from '../schemas/authSchemas';

export function useRegisterCustomer(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegistrationFormInput) => registerCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerSession'] });
      onSuccess?.();
    },
  });
}

export function useLoginCustomer(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginFormInput) => loginCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerSession'] });
      onSuccess?.();
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
      queryClient.invalidateQueries({ queryKey: ['customerSession'] });
      onSuccess?.();
    },
  });
}
