import * as React from "react";
import type { SVGProps } from "react";
const SvgTerminalLightmode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19h9M3 5l8 7-8 7"
    />
  </svg>
);
export default SvgTerminalLightmode;
