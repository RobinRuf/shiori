import * as React from "react";
import type { SVGProps } from "react";
const SvgTerminalDarkmode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="#000"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19h9M3 5l8 7-8 7"
    />
  </svg>
);
export default SvgTerminalDarkmode;
