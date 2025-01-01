// Imports
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { FormData } from '../../schemas/authSchemas';

type FormInputProps = {
  label: string;
  type: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FieldValues>;
  name: keyof FormData;
};

export function FormInput({
  label,
  type,
  register,
  errors,
  name,
}: FormInputProps) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...register(name)}
        type={type}
        placeholder={label}
        className={
          errors[name]
            ? 'input input-bordered input-error w-full max-w-xs'
            : 'input input-bordered w-full max-w-xs'
        }
      />
      {errors[name] && (
        <div className="label">
          <span className="label-text-alt text-error">
            {errors[name].message as string}
          </span>
        </div>
      )}
    </label>
  );
}
