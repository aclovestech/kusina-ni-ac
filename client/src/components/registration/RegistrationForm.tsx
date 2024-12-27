// Imports
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  SubmitHandler,
} from 'react-hook-form';
import FormInput from '../common/FormInput';
import { IRegistrationFormInput } from '../../schemas/registration';

// Interface for the RegistrationForm component
interface RegistrationFormProps {
  register: UseFormRegister<IRegistrationFormInput>;
  handleSubmit: UseFormHandleSubmit<IRegistrationFormInput>;
  errors: FieldErrors<IRegistrationFormInput>;
  isSubmitting: boolean;
  onSubmit: SubmitHandler<IRegistrationFormInput>;
}

// RegistrationForm component
const RegistrationForm: React.FC<RegistrationFormProps> = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
      <FormInput
        label="First Name"
        placeholder="First Name"
        type="text"
        register={register('first_name')}
        errors={errors.first_name}
      />
      <FormInput
        label="Last Name"
        placeholder="Last Name"
        type="text"
        register={register('last_name')}
        errors={errors.last_name}
      />
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
      <FormInput
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        register={register('confirm_password')}
        errors={errors.confirm_password}
      />
      <div className="card-actions justify-center pt-4">
        <button
          className={isSubmitting ? 'btn btn-disabled' : 'btn btn-primary'}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
