// Imports
import { AuthForm } from '../components';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SignInWithGoogle } from '../components';

export const Route = createFileRoute('/auth/sign-in')({
  component: SignIn,
});

function SignIn() {
  return (
    <>
      <div className="card mx-5 my-8 bg-base-300 shadow-xl md:card-side md:mx-32 lg:mx-60">
        <div className="card-body">
          <h1 className="card-title self-center">Sign in</h1>
          <AuthForm formType="login" />
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
