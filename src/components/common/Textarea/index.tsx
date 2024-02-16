import { TextareaHTMLAttributes } from "react";

import { cn } from "@/utils";

type TextareaProps = {
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({
  label,
  isRequired,
  errorMsg,
  className,
  name,
  ...restProps
}: TextareaProps) => {
  return (
    <div className={cn("relative")}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block font-medium leading-6 lg:text-sm"
        >
          {label}
          {isRequired && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        className={cn(
          "appearance-none rounded px-4 py-2 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:ring-gray-700",
          className,
        )}
        name={name}
        {...restProps}
      />
      {!!errorMsg && (
        <div className="mt-1 text-xs text-red-500">{errorMsg}</div>
      )}
    </div>
  );
};

export default Textarea;
