// Imports
import { AuthForm } from '../components';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { SignInWithGoogle } from '../components';
import { useRegisterCustomer } from '../hooks/useAuthHooks';
import { FormData, RegistrationFormInput } from '../schemas/authSchemas';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import isSignedIn from '../utils/getIsSignedIn';

export const Route = createFileRoute('/auth/register')({
  loader: async () => {
    const user = await isSignedIn();
    if (user) {
      throw redirect({ to: '/' });
    }
    return {};
  },
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
    <div className="card mx-4 my-8 max-w-3xl bg-base-300 md:mx-8 lg:mx-auto">
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
  );
}
