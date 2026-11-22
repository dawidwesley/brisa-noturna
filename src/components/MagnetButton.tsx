import { useEffect, useRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface SharedProps {
  children: ReactNode;
  variant?: Variant;
  strength?: number;
  className?: string;
  wrapperClassName?: string;
}

type MagnetAnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type MagnetNativeButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type MagnetButtonProps = MagnetAnchorProps | MagnetNativeButtonProps;

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-silver text-abyss border border-serena-pearl/50 hover:bg-serena-pearl shadow-[0_12px_36px_-14px_rgba(216,211,227,0.45)]',
  secondary:
    'lunar-glass text-starlight border border-silver/20 hover:border-mauve/50 hover:bg-plum/60',
  ghost:
    'bg-transparent text-silver border border-transparent hover:text-starlight hover:border-silver/20',
};

/**
 * Botão/Link magnético inspirado no React Bits.
 * Otimizado para 60fps: manipula transform via requestAnimationFrame direto no DOM (zero re-renders React)
 * e desativa automaticamente em touch (@media hover: none / pointer: coarse) ou prefers-reduced-motion.
 */
export function MagnetButton(props: MagnetButtonProps) {
  const {
    children,
    variant = 'primary',
    strength = 0.24,
    className = '',
    wrapperClassName = '',
    ...rest
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isEnabledRef = useRef<boolean>(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const syncCapability = () => {
      isEnabledRef.current = !motionQuery.matches && pointerQuery.matches;
      if (!isEnabledRef.current && wrapperRef.current) {
        wrapperRef.current.style.transform = '';
        wrapperRef.current.style.transition = '';
      }
    };

    syncCapability();
    motionQuery.addEventListener('change', syncCapability);
    pointerQuery.addEventListener('change', syncCapability);

    return () => {
      motionQuery.removeEventListener('change', syncCapability);
      pointerQuery.removeEventListener('change', syncCapability);
      if (rafRef.current !== 0) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isEnabledRef.current || !wrapperRef.current) return;
    pointerPosRef.current.x = event.clientX;
    pointerPosRef.current.y = event.clientY;

    if (rafRef.current === 0) {
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        const node = wrapperRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = Math.max(-14, Math.min(14, (pointerPosRef.current.x - centerX) * strength));
        const deltaY = Math.max(-10, Math.min(10, (pointerPosRef.current.y - centerY) * strength));
        node.style.transition = 'transform 0.14s ease-out';
        node.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
      });
    }
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== 0) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    const node = wrapperRef.current;
    if (isEnabledRef.current && node) {
      node.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
      node.style.transform = 'translate3d(0px, 0px, 0)';
    }
  };

  const baseClasses = [
    'group relative inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-full px-6 py-3',
    'text-sm font-medium tracking-[0.06em] transition-[background-color,border-color,color,box-shadow,transform] duration-300',
    'cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-mauve',
    'active:scale-[0.98]',
    VARIANT_CLASSES[variant],
    className,
  ].join(' ');

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={['inline-block', wrapperClassName].filter(Boolean).join(' ')}
    >
      {'href' in props && props.href !== undefined ? (
        <a
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
          href={props.href}
          className={baseClasses}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
          className={baseClasses}
        >
          {children}
        </button>
      )}
    </div>
  );
}
