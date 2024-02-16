import { InputHTMLAttributes } from "react";

import { cn } from "@/utils";

import ErrorMessage from "../ErrorMessage";

type TextInputProps = {
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  containerClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({
  label,
  isRequired,
  errorMsg,
  containerClassName,
  className,
  name,
  ...restProps
}: TextInputProps) => {
  return (
    <div className={cn("relative", containerClassName)}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block font-medium leading-6 lg:text-sm"
        >
          {label}
          {isRequired && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        className={cn(
          "appearance-none rounded px-4 py-2 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:ring-gray-700",
          className,
        )}
        name={name}
        {...restProps}
      />
      {!!errorMsg && <ErrorMessage text={errorMsg} />}
    </div>
  );
};

export default TextInput;
