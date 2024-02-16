import { SVGProps } from "react";

import { cn } from "@/utils";

const BaseSvg = ({
  className,
  children,
  ...restProps
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("h-6 w-6", className)}
      {...restProps}
    >
      {children}
    </svg>
  );
};

export default BaseSvg;
