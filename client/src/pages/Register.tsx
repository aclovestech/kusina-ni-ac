// Imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegistrationFormSchema,
  IRegistrationFormInput,
} from '../schemas/registration';
import FormInput from '../components/common/FormInput';
import axiosInstance from '../api/config/axiosConfig';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'sonner';

const Register: React.FC = () => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationFormInput>({
    resolver: zodResolver(RegistrationFormSchema),
  });

  // React Router Navigate (for redirecting)
  const navigate = useNavigate();
  // State for submitting the form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IRegistrationFormInput> = async (data) => {
    // Check if the form is already being submitted to avoid multiple submissions
    if (isSubmitting) {
      return;
    }

    // Set isSubmitting to true to indicate that the form is being submitted
    setIsSubmitting(true);

    // Send the form data to the server
    try {
      const response = await axiosInstance.post('/auth/register', data);
      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        toast.error(error.message);
      }
    } finally {
      // Set isSubmitting to false to indicate that the form submission is complete
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="card bg-base-300 md:card-side mx-5 my-8 shadow-xl md:mx-32 lg:mx-60">
        <div className="card-body items-center">
          <h1 className="card-title">Register</h1>
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
                className={
                  isSubmitting ? 'btn btn-disabled' : 'btn btn-primary'
                }
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
