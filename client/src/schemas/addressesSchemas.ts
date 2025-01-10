// Imports
import { z } from 'zod';

export const AddressFormSchema = z.object({
  address_line1: z.string().min(1, 'Address line 1 is required'),
  address_line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  is_default: z.boolean(),
});
export type AddressFormInput = z.infer<typeof AddressFormSchema>;
