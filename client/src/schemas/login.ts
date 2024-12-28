// Imports
import * as z from 'zod';

// Schema
export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type ILoginFormInput = z.infer<typeof LoginFormSchema>;
