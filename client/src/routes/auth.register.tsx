// Imports
import { AuthForm } from '../components';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SignInWithGoogle } from '../components';
import { useRegisterCustomer } from '../hooks/useAuthHooks';
import { FormData, RegistrationFormInput } from '../schemas/authSchemas';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register')({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const {
    mutate: register,
    isPending,
    error,
  } = useRegisterCustomer(() => {
    navigate({ to: '/' });
  });

  function onSubmit(data: FormData) {
    register(data as RegistrationFormInput);
  }

  if (error) toast.error('Unable to register. Please try again.');

  return (
    <>
      <div className="card mx-5 my-8 bg-base-300 shadow-xl md:card-side md:mx-32 lg:mx-60">
        <div className="card-body">
          <h1 className="card-title self-center">Register</h1>
          <AuthForm
            formType="register"
            onSubmit={onSubmit}
            isPending={isPending}
          />
          <div className="divider divider-primary">OR</div>
          <div className="card-actions justify-center">
            <SignInWithGoogle />
          </div>
          <div className="mt-4 text-center">
            <p>Already have an account?</p>
            <Link to="/auth/sign-in">
              <span className="font-bold text-primary">Sign in here</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
