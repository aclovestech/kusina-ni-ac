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

export const UserAddressFormSchema = z.object({
  address_line1: z.string().min(2),
  address_line2: z.string().min(2).optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postal_code: z.string().min(2),
  country: z.string().min(2),
  phone_number: z.string(),
  is_default: z.boolean(),
});
export type UserAddressInput = z.infer<typeof UserAddressFormSchema>;

export const UserAddressUpdateFormSchema = z.object({
  address_line1: z.string().min(2).optional(),
  address_line2: z.string().min(2).optional(),
  city: z.string().min(2).optional(),
  state: z.string().min(2).optional(),
  postal_code: z.string().min(2).optional(),
  country: z.string().min(2).optional(),
  phone_number: z.string().optional(),
  is_default: z.boolean().optional(),
});
export type UserAddressUpdateInput = z.infer<
  typeof UserAddressUpdateFormSchema
>;
