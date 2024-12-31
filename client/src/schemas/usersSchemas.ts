// Imports
import { z } from 'zod';

export const UserUpdateFormSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  first_name: z.string().min(2).optional(),
  last_name: z.string().min(2).optional(),
  date_of_birth: z.date().optional(),
});
export type UserUpdateInput = z.infer<typeof UserUpdateFormSchema>;
