// Imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema, ILoginFormInput } from '../schemas/login';
import { useState } from 'react';
import LoginForm from '../components/login/LoginForm';
import { createFileRoute, Link } from '@tanstack/react-router';
import SignInWithGoogle from '../components/common/SignInWithGoogle';
import { useSession } from '../hooks/SessionProvider';

export const Route = createFileRoute('/auth/sign-in')({
  component: SignIn,
});

function SignIn() {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: zodResolver(LoginFormSchema),
  });

  // State for submitting the form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Login hook
  const { login } = useSession();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    // Check if the form is already being submitted to avoid multiple submissions
    if (isSubmitting) {
      return;
    }

    // Set isSubmitting to true to indicate that the form is being submitted
    setIsSubmitting(true);

    // Send the form data to the server
    try {
      await login(data);
    } finally {
      // Set isSubmitting to false to indicate that the form submission is complete
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="card mx-5 my-8 bg-base-300 shadow-xl md:card-side md:mx-32 lg:mx-60">
        <div className="card-body">
          <h1 className="card-title self-center">Sign in</h1>
          <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
          <div className="divider divider-primary">OR</div>
          <div className="card-actions justify-center">
            <SignInWithGoogle />
          </div>
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
