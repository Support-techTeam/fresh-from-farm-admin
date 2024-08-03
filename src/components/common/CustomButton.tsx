import React from 'react';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const CustomButton = ({
  leftIcon,
  rightIcon,
  label,
  classes,
  type,
  props,
  disabled,
}: any) => {
  return (
    <button
      type={type ? type : 'button'}
      className={`text-gray-900 border focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 ${classes}`}
      {...props}
      disabled={disabled}
    >
      {leftIcon && leftIcon}
      {label}
      {rightIcon && rightIcon}
    </button>
  );
};

export default CustomButton;
