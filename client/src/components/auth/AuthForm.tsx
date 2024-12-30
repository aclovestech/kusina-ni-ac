import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  LoginFormSchema,
  RegistrationFormSchema,
} from '../../schemas/authSchemas';
import { FormInput } from './FormInput';

type AuthFormProps = {
  formType: 'login' | 'register';
};

export function AuthForm({ formType }: AuthFormProps) {
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
  } = useForm({
    resolver:
      formType === 'login'
        ? zodResolver(LoginFormSchema)
        : zodResolver(RegistrationFormSchema),
  });

  const isSubmitting = false;

  return (
    <form
      className="mt-4 w-full max-w-xs self-center"
      onSubmit={handleSubmit(() => {})}
    >
      {fields.map((field) => {
        return (
          <FormInput
            key={field.name}
            label={field.label}
            type={field.type}
            register={register}
            errors={errors}
            name={field.name}
          />
        );
      })}
      <div className="card-actions mt-8 justify-center">
        <button
          className={isSubmitting ? 'btn btn-disabled' : 'btn btn-primary'}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {formType === 'login' ? 'Sign in' : 'Register'}
        </button>
      </div>
    </form>
  );
}
