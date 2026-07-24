import type { SVGProps } from 'react';

export type MenuIconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function MenuIcon({ className, title, ...props }: MenuIconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={className}
      fill="none"
      role={title ? 'img' : undefined}
      viewBox="0 0 16 12"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M14.666 11H1.333m13.333-5H1.333m13.333-5H1.333"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
