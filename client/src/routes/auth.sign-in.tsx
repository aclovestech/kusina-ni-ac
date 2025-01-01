// Imports
import { AuthForm } from '../components';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SignInWithGoogle } from '../components';
import { useLoginCustomer } from '../hooks/useAuthHooks';
import { FormData, LoginFormInput } from '../schemas/authSchemas';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/sign-in')({
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    error,
  } = useLoginCustomer(() => {
    navigate({ to: '/' });
  });

  function onSubmit(data: FormData) {
    login(data as LoginFormInput);
  }

  if (error) toast.error(error.message);

  return (
    <>
      <div className="card mx-5 my-8 bg-base-300 shadow-xl md:card-side md:mx-32 lg:mx-60">
        <div className="card-body">
          <h1 className="card-title self-center">Sign in</h1>
          <AuthForm
            formType="login"
            onSubmit={onSubmit}
            isPending={isPending}
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
