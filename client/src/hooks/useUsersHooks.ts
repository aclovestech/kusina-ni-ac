// Imports
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUser, updateUser } from '../api';
import { UserUpdateInput } from '../schemas/usersSchemas';

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
