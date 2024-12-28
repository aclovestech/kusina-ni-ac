// Imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegistrationFormSchema,
  IRegistrationFormInput,
} from '../schemas/registration';
import axiosInstance from '../api/config/axiosConfig';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import RegistrationForm from '../components/registration/RegistrationForm';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register')({
  component: Register,
});

function Register() {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationFormInput>({
    resolver: zodResolver(RegistrationFormSchema),
  });

  // Tanstack Router Navigate (for redirecting)
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
        navigate({ to: '/' });
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
      <div className="card mx-5 my-8 bg-base-300 shadow-xl md:card-side md:mx-32 lg:mx-60">
        <div className="card-body">
          <h1 className="card-title self-center">Register</h1>
          <RegistrationForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
          <div className="mt-4 text-center">
            <p>Already have an account?</p>
            <Link to="/auth/login" className="font-bold text-primary">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
