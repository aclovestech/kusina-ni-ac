// Imports
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  SubmitHandler,
} from 'react-hook-form';
import FormInput from '../common/FormInput';
import { ILoginFormInput } from '../../schemas/login';

// Interface for the LoginForm component
interface LoginFormProps {
  register: UseFormRegister<ILoginFormInput>;
  handleSubmit: UseFormHandleSubmit<ILoginFormInput>;
  errors: FieldErrors<ILoginFormInput>;
  isSubmitting: boolean;
  onSubmit: SubmitHandler<ILoginFormInput>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 w-full max-w-xs self-center"
    >
      <FormInput
        label="Email"
        placeholder="Email"
        type="email"
        register={register('email')}
        errors={errors.email}
      />
      <FormInput
        label="Password"
        placeholder="Password"
        type="password"
        register={register('password')}
        errors={errors.password}
      />

      <div className="card-actions mt-8 justify-center">
        <button
          className={isSubmitting ? 'btn btn-disabled' : 'btn btn-primary'}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
