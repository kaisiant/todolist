import { SelectHTMLAttributes } from "react";

import { ChevronDownIcon } from "@/assets/icons";
import { cn } from "@/utils";

type SelectProps<T> = {
  label?: string;
  isRequired?: boolean;
  errorMsg?: string;
  options?: T[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = <T,>({
  label,
  isRequired,
  errorMsg,
  className,
  name,
  options,
  ...restProps
}: SelectProps<T>) => {
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
      <div className="relative">
        <select
          id={name}
          className={cn(
            "appearance-none rounded bg-white px-4 py-2 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:ring-gray-700",
            className,
          )}
          name={name}
          {...restProps}
        >
          {options?.map((option, i) => (
            <option key={i}>{typeof option === "string" ? option : ""}</option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>
      {!!errorMsg && (
        <div className="mt-1 text-xs text-red-500">{errorMsg}</div>
      )}
    </div>
  );
};

export default Select;
