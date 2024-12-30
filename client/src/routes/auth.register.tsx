// Imports
import { AuthForm } from '../components';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SignInWithGoogle } from '../components';

export const Route = createFileRoute('/auth/register')({
  component: Register,
});

function Register() {
  return (
    <>
      <div className="card mx-5 my-8 bg-base-300 shadow-xl md:card-side md:mx-32 lg:mx-60">
        <div className="card-body">
          <h1 className="card-title self-center">Register</h1>
          <AuthForm formType="register" />
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
