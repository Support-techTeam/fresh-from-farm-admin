/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
const InputField = ({
  classess,
  name,
  placeholder,
  label,
  type,
  labelClasses,
  required,
  props,
  onChange,
}: any) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative my-8">
      <input
        type={showPassword && type === 'password' ? 'text' : type}
        name={name}
        placeholder={placeholder}
        className={`peer relative h-10 w-full z-10 rounded border border-green-500 px-4 text-sm text-slate-500 focus:placeholder-transparent outline-none transition-all invalid:border-pink-500 invalid:text-pink-500 focus:border-green-700 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400  ${classess}`}
        {...props}
        onChange={onChange}
      />

      <label
        htmlFor={name}
        className={`absolute left-3 -top-2 z-[1] cursor-text px-2 py-1 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-6 peer-required:after:text-pink-500 peer-required:after:content-['\\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-6 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent ${labelClasses} rounded-full`}
      >
        {label}
        {required && <span className="text-pink-500"> *</span>}
      </label>
      {type === 'password' &&
        (!showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 z-20 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-4 description-4"
            role="graphics-symbol"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <title id="title-4">Do Not Show Password</title>
            <desc id="description-4">Do Not View Password when toggled</desc>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 z-20 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-4 description-4"
            role="graphics-symbol"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <title id="title-4">Show Password</title>
            <desc id="description-4">View Password when toggled</desc>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5C7.305 4.5 3.562 7.776 2.25 12c1.312 4.224 5.055 7.5 9.75 7.5s8.438-3.276 9.75-7.5C20.438 7.776 16.695 4.5 12 4.5zM12 15a3 3 0 110-6 3 3 0 010 6z"
            />
          </svg>
        ))}
    </div>
  );
};

export default InputField;
