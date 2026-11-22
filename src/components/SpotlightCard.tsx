import { useEffect, useRef } from 'react';
import type { CSSProperties, HTMLAttributes, MouseEvent, ReactNode } from 'react';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  spotlightColor?: string;
}

/**
 * Cartão editorial com iluminação radial sutil seguindo o cursor (estilo React Bits).
 * Otimizado para 60fps: atualiza CSS variables via requestAnimationFrame (zero re-renders React)
 * e desativa completamente o rastreamento em dispositivos touch ou prefers-reduced-motion.
 */
export function SpotlightCard({
  children,
  spotlightColor = 'rgba(198, 164, 230, 0.18)',
  className = '',
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const pointerEnabledRef = useRef<boolean>(false);

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncPointerCapability = () => {
      pointerEnabledRef.current = hoverQuery.matches && !motionQuery.matches;
    };

    syncPointerCapability();
    hoverQuery.addEventListener('change', syncPointerCapability);
    motionQuery.addEventListener('change', syncPointerCapability);

    return () => {
      hoverQuery.removeEventListener('change', syncPointerCapability);
      motionQuery.removeEventListener('change', syncPointerCapability);
      if (rafRef.current !== 0) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(event);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (pointerEnabledRef.current && cardRef.current) {
      pointerPosRef.current.x = event.clientX;
      pointerPosRef.current.y = event.clientY;

      if (rafRef.current === 0) {
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = 0;
          const node = cardRef.current;
          if (!node) return;
          const rect = node.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;

          const x = ((pointerPosRef.current.x - rect.left) / rect.width) * 100;
          const y = ((pointerPosRef.current.y - rect.top) / rect.height) * 100;
          node.style.setProperty('--spotlight-x', `${x.toFixed(1)}%`);
          node.style.setProperty('--spotlight-y', `${y.toFixed(1)}%`);
        });
      }
    }
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (rafRef.current !== 0) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    onMouseLeave?.(event);
  };

  const mergedStyle = {
    ...style,
    '--spotlight-color': spotlightColor,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={mergedStyle}
      className={[
        'spotlight-card group relative rounded-2xl border border-silver/12 bg-midnight/75 transition-[border-color,box-shadow] duration-500',
        'hover:border-mauve/35 hover:shadow-[0_24px_60px_-24px_rgba(9,7,16,0.9)]',
        className,
      ].join(' ')}
      {...props}
    >
      <div
        aria-hidden="true"
        className="spotlight-glow pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
