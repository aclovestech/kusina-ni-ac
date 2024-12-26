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

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationFormInput>({
    resolver: zodResolver(RegistrationFormSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegistrationFormInput> = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post('/auth/register', data);
      console.log(response);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        const modal = document.getElementById(
          'error_modal'
        ) as HTMLDialogElement;
        modal?.showModal();
      }
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
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
