import type { SVGProps } from 'react';

interface LunarMarkProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Emblema minimalista oficial da Brisa Noturna:
 * lua crescente fina acompanhada por estrela noturna de quatro pontas.
 */
export function LunarMark({ size = 24, className = '', ...props }: LunarMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M21.8 20.6C17.4 20.6 13.8 17 13.8 12.6C13.8 9.9 15.1 7.5 17.2 6C11.9 6.3 7.8 10.7 7.8 16.1C7.8 21.7 12.3 26.2 17.9 26.2C21.8 26.2 25.1 24 26.8 20.8C25.3 20.7 23.6 20.6 21.8 20.6Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2 7.2L24 9.5L26.3 10.3L24 11.1L23.2 13.4L22.4 11.1L20.1 10.3L22.4 9.5L23.2 7.2Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}
