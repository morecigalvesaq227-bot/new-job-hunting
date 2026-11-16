declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";
  type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  export const ArrowDown: Icon;
  export const ArrowRight: Icon;
  export const ArrowUpRight: Icon;
  export const Mail: Icon;
  export const Phone: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Download: Icon;
  export const Github: Icon;
}
