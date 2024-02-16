import { SVGProps } from "react";

import BaseSvg from "./BaseSvg";

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <BaseSvg {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </BaseSvg>
  );
};

export default ChevronDownIcon;
