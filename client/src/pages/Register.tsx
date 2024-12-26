import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegistrationFormSchema,
  IRegistrationFormInput,
} from '../schemas/registration';
import FormInput from '../components/common/FormInput';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationFormInput>({
    resolver: zodResolver(RegistrationFormSchema),
  });

  const onSubmit: SubmitHandler<IRegistrationFormInput> = (data) => {
    console.log(data);
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
                className="btn btn-primary"
                onClick={handleSubmit(onSubmit)}
              >
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
