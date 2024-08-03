/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
const InputSearchField = ({
  classess,
  name,
  placeholder,
  type,
  props,
}: any) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative my-8">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`peer relative h-10 rounded border border-green-500 px-4 text-sm text-slate-500 focus:placeholder-transparent outline-none transition-all invalid:border-pink-500 invalid:text-pink-500 focus:border-green-700 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${classess}`}
        {...props}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute text-gray-800 right-4 top-3 h-6 w-6 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        aria-label="Search icon"
        role="graphics-symbol"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  );
};

export default InputSearchField;
