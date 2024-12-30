// Imports
import { z } from 'zod';

// Login
export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type LoginFormInput = z.infer<typeof LoginFormSchema>;

// Registration
export const RegistrationFormSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine(
    (val) => {
      return val.password === val.confirm_password;
    },
    {
      message: 'Passwords do not match',
      path: ['confirm_password'],
    }
  );
export type RegistrationFormInput = z.infer<typeof RegistrationFormSchema>;

export type FormData = RegistrationFormInput | LoginFormInput;
