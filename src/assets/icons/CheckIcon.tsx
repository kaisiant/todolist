import { SVGProps } from "react";

import BaseSvg from "./BaseSvg";

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <BaseSvg {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </BaseSvg>
  );
};

export default CheckIcon;
