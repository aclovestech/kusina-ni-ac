// Imports
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  LoginFormSchema,
  RegistrationFormSchema,
  FormData,
} from '../../schemas/authSchemas';
import { FormInput } from './FormInput';

type AuthFormProps = {
  formType: 'login' | 'register';
  onSubmit: (data: FormData) => void;
  isPending: boolean;
};

export function AuthForm({ formType, onSubmit, isPending }: AuthFormProps) {
  const fields =
    formType === 'login'
      ? [
          { label: 'Email', type: 'email', name: 'email' },
          { label: 'Password', type: 'password', name: 'password' },
        ]
      : [
          { label: 'First Name', type: 'text', name: 'first_name' },
          { label: 'Last Name', type: 'text', name: 'last_name' },
          { label: 'Email', type: 'email', name: 'email' },
          { label: 'Password', type: 'password', name: 'password' },
          {
            label: 'Confirm Password',
            type: 'password',
            name: 'confirm_password',
          },
        ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver:
      formType === 'login'
        ? zodResolver(LoginFormSchema)
        : zodResolver(RegistrationFormSchema),
  });

  return (
    <form
      className="mt-4 w-full max-w-xs self-center"
      onSubmit={handleSubmit(onSubmit, (error) => {
        console.error(error);
      })}
    >
      {fields.map((field) => {
        return (
          <FormInput
            key={field.name}
            label={field.label}
            type={field.type}
            register={register}
            errors={errors}
            name={field.name as keyof FormData}
          />
        );
      })}
      <div className="card-actions mt-8 justify-center">
        <button
          className={isPending ? 'btn btn-disabled' : 'btn btn-primary'}
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {formType === 'login' ? 'Sign in' : 'Register'}
        </button>
      </div>
    </form>
  );
}
