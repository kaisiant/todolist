import { cva, type VariantProps } from "class-variance-authority";

import { ButtonHTMLAttributes, PropsWithChildren } from "react";

const button = cva(
  "border border-primary dark:border-gray-700 rounded px-4 py-2 min-w-28 disabled:opacity-50 dark:disabled:opacity-50 transition hover:opacity-90 dark:hover:opacity-80 text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      variant: {
        default: ["bg-primary"],
        outline: [
          "bg-transparent text-primary hover:bg-gray-100 dark:hover:bg-transparent",
        ],
      },
      size: {
        sm: ["w-10", "h-10", "py-2", "px-2"],
        default: ["text-sm"],
        medium: ["text-base", "py-2", "px-4"],
      },
    },
    compoundVariants: [{ variant: "default", size: "default" }],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = {
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

const Button = ({
  variant,
  size,
  children,
  isLoading,
  className,
  disabled,
  ...restProps
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={button({ variant, size, className })}
      disabled={disabled || isLoading}
      {...restProps}
    >
      {isLoading ? "..." : children}
    </button>
  );
};

export default Button;
