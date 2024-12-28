// Imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema, ILoginFormInput } from '../schemas/login';
import axiosInstance from '../api/config/axiosConfig';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import LoginForm from '../components/login/LoginForm';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: zodResolver(LoginFormSchema),
  });

  // React Router Navigate (for redirecting)
  const navigate = useNavigate();
  // State for submitting the form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    // Check if the form is already being submitted to avoid multiple submissions
    if (isSubmitting) {
      return;
    }

    // Set isSubmitting to true to indicate that the form is being submitted
    setIsSubmitting(true);

    // Send the form data to the server
    try {
      const response = await axiosInstance.post('/auth/login', data);
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
          <h1 className="card-title self-center">Login</h1>
          <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-primary">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
