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

export type CloseIconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function CloseIcon({ className, title, ...props }: CloseIconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={className}
      fill="none"
      role={title ? 'img' : undefined}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
