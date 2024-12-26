import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  placeholder: string;
  type: string;
  register: UseFormRegisterReturn;
  errors?: FieldError;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type,
  register,
  errors,
}) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={
          errors
            ? 'input input-bordered input-error w-full max-w-xs'
            : 'input input-bordered w-full max-w-xs'
        }
      />
      {errors && (
        <div className="label">
          <span className="label-text-alt text-error">{errors.message}</span>
        </div>
      )}
    </label>
  );
};

export default FormInput;
