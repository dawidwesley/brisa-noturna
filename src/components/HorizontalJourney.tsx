import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HORIZONTAL_JOURNEY,
  HORIZONTAL_JOURNEY_HEADER,
  IMAGE_ASSETS,
} from '@/data/content';
import type { ImageKey } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const IMAGE_DIMENSIONS: Record<ImageKey, { width: number; height: number }> = {
  'lavender-field': { width: 1376, height: 768 },
  'lavender-botanical': { width: 1200, height: 896 },
  'ritual-noturno': { width: 1200, height: 896 },
  'serena-hero': { width: 896, height: 1200 },
};

interface NightStar {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: string;
  delay: string;
  isFourPoint: boolean;
  tone: 'silver' | 'mauve';
}

// 24 estrelas sutis determinísticas (20 pontos de luz + 4 estrelas finas de 4 pontas)
const NIGHT_STARS: NightStar[] = [
  { id: 1, x: 6, y: 11, size: 2, duration: '4.4s', delay: '0.2s', isFourPoint: false, tone: 'silver' },
  { id: 2, x: 14, y: 22, size: 12, duration: '5.8s', delay: '1.1s', isFourPoint: true, tone: 'silver' },
  { id: 3, x: 21, y: 8, size: 1.8, duration: '4.9s', delay: '2.0s', isFourPoint: false, tone: 'mauve' },
  { id: 4, x: 29, y: 16, size: 2.2, duration: '6.1s', delay: '0.6s', isFourPoint: false, tone: 'silver' },
  { id: 5, x: 36, y: 6, size: 1.6, duration: '5.2s', delay: '1.8s', isFourPoint: false, tone: 'silver' },
  { id: 6, x: 44, y: 14, size: 2, duration: '4.6s', delay: '3.1s', isFourPoint: false, tone: 'mauve' },
  { id: 7, x: 52, y: 9, size: 11, duration: '6.4s', delay: '0.8s', isFourPoint: true, tone: 'mauve' },
  { id: 8, x: 61, y: 18, size: 1.8, duration: '5.0s', delay: '2.4s', isFourPoint: false, tone: 'silver' },
  { id: 9, x: 69, y: 7, size: 2.2, duration: '4.2s', delay: '1.3s', isFourPoint: false, tone: 'silver' },
  { id: 10, x: 77, y: 15, size: 1.7, duration: '5.7s', delay: '2.9s', isFourPoint: false, tone: 'mauve' },
  { id: 11, x: 85, y: 10, size: 13, duration: '6.2s', delay: '0.4s', isFourPoint: true, tone: 'silver' },
  { id: 12, x: 93, y: 19, size: 2, duration: '4.8s', delay: '1.7s', isFourPoint: false, tone: 'silver' },
  { id: 13, x: 9, y: 42, size: 1.6, duration: '5.5s', delay: '2.6s', isFourPoint: false, tone: 'mauve' },
  { id: 14, x: 94, y: 44, size: 1.8, duration: '4.7s', delay: '0.9s', isFourPoint: false, tone: 'silver' },
  { id: 15, x: 5, y: 74, size: 2, duration: '6.0s', delay: '1.5s', isFourPoint: false, tone: 'silver' },
  { id: 16, x: 18, y: 88, size: 1.7, duration: '5.1s', delay: '3.4s', isFourPoint: false, tone: 'mauve' },
  { id: 17, x: 33, y: 92, size: 2.1, duration: '4.5s', delay: '0.5s', isFourPoint: false, tone: 'silver' },
  { id: 18, x: 48, y: 89, size: 1.6, duration: '5.9s', delay: '2.2s', isFourPoint: false, tone: 'silver' },
  { id: 19, x: 64, y: 93, size: 10, duration: '6.6s', delay: '1.4s', isFourPoint: true, tone: 'mauve' },
  { id: 20, x: 79, y: 87, size: 1.9, duration: '4.3s', delay: '2.8s', isFourPoint: false, tone: 'silver' },
  { id: 21, x: 91, y: 78, size: 2.2, duration: '5.4s', delay: '0.7s', isFourPoint: false, tone: 'mauve' },
  { id: 22, x: 25, y: 27, size: 1.5, duration: '6.3s', delay: '1.9s', isFourPoint: false, tone: 'silver' },
  { id: 23, x: 73, y: 26, size: 1.6, duration: '5.3s', delay: '3.2s', isFourPoint: false, tone: 'silver' },
  { id: 24, x: 88, y: 31, size: 1.8, duration: '4.6s', delay: '1.2s', isFourPoint: false, tone: 'mauve' },
];

function StarfieldOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 'var(--z-ambient)' }}
    >
      {NIGHT_STARS.map((star) => {
        const starStyle = {
          left: `${star.x}%`,
          top: `${star.y}%`,
          '--star-duration': star.duration,
          '--star-delay': star.delay,
        } as CSSProperties;

        if (star.isFourPoint) {
          return (
            <svg
              key={star.id}
              width={star.size}
              height={star.size}
              viewBox="0 0 16 16"
              fill="none"
              style={starStyle}
              className={[
                'star-twinkle absolute',
                star.tone === 'silver' ? 'text-silver/80' : 'text-mauve/75',
              ].join(' ')}
            >
              <path
                d="M8 0.8L9.2 6.8L15.2 8L9.2 9.2L8 15.2L6.8 9.2L0.8 8L6.8 6.8L8 0.8Z"
                fill="currentColor"
              />
            </svg>
          );
        }

        return (
          <span
            key={star.id}
            style={{
              ...starStyle,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            className={[
              'star-twinkle absolute rounded-full',
              star.tone === 'silver'
                ? 'bg-silver/85 shadow-[0_0_8px_rgba(228,223,240,0.45)]'
                : 'bg-mauve/80 shadow-[0_0_8px_rgba(198,164,230,0.4)]',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
}

export function HorizontalJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  // Pausa as estrelas CSS quando a seção está fora da viewport (0% GPU ociosa)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '120px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pinStage = pinStageRef.current;
    const track = trackRef.current;
    if (!section || prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop (>= 1024px) com movimento permitido: Scroll Horizontal Pinado
    if (pinStage && track) {
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - pinStage.clientWidth);

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinStage,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            start: 'top top',
            end: () => `+=${Math.max(getScrollDistance(), window.innerHeight * 1.4)}`,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                const scaledProgress = 0.25 + self.progress * 0.75;
                progressBarRef.current.style.transform = `scaleX(${scaledProgress})`;
              }
              const nextIndex = Math.min(
                HORIZONTAL_JOURNEY.length - 1,
                Math.floor(self.progress * HORIZONTAL_JOURNEY.length)
              );
              setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
            },
          },
        });

        // Paralaxe interna suave das imagens durante a travessia horizontal
        // Overscan de 124% garante zero exposição de borda/subpixel em [-5%, +5%]
        const parallaxImages = track.querySelectorAll<HTMLElement>('[data-journey-parallax]');
        parallaxImages.forEach((imgEl) => {
          gsap.fromTo(
            imgEl,
            { xPercent: -5 },
            {
              xPercent: 5,
              force3D: true,
              ease: 'none',
              scrollTrigger: {
                trigger: imgEl.closest('[data-journey-panel]') ?? imgEl,
                containerAnimation: horizontalTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      });
    }

    // Mobile/Tablet: revelação vertical limpa sem pin
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = section.querySelectorAll<HTMLElement>('[data-journey-mobile-card]');
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
            once: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="jornada"
      ref={sectionRef}
      className={['section-abyss relative', !isInView ? 'anim-paused' : '']
        .filter(Boolean)
        .join(' ')}
      style={{ zIndex: 'var(--z-horizontal)' }}
    >
      <div aria-hidden="true" className="divider-lunar absolute inset-x-0 top-0" />

      {/* =====================================================================
          DESKTOP (>= 1024px): Palco Pinado de Transição Horizontal Scroll-Driven
          (Desativado automaticamente sob prefers-reduced-motion: reduce)
         ===================================================================== */}
      {!prefersReducedMotion && (
        <div
          ref={pinStageRef}
          className="relative hidden min-h-screen flex-col justify-center overflow-x-clip py-14 lg:flex xl:py-16"
        >
          {/* Céu estrelado sutil em GPU (24 estrelas, pausado fora da viewport) */}
          <StarfieldOverlay />

          {/* Cabeçalho + Barra de Progresso Lunar */}
          <div className="relative z-10 mx-auto mb-6 flex w-full max-w-7xl items-end justify-between px-10 xl:mb-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-mauve/70" aria-hidden="true" />
                <span className="text-[11px] font-medium tracking-[0.26em] text-mauve uppercase">
                  {HORIZONTAL_JOURNEY_HEADER.eyebrow}
                </span>
              </div>
              <h2 className="mt-3 font-display text-4xl font-medium text-starlight xl:text-5xl">
                {HORIZONTAL_JOURNEY_HEADER.title}
              </h2>
            </div>

            <div className="flex flex-col items-end gap-2.5">
              <div className="flex items-baseline gap-2 font-display">
                <span className="text-3xl italic text-serena-pearl">
                  0{activeIndex + 1}
                </span>
                <span className="text-sm text-mist">/ 04</span>
              </div>
              <div
                aria-hidden="true"
                className="h-[2px] w-44 overflow-hidden rounded-full bg-silver/15"
              >
                <div
                  ref={progressBarRef}
                  className="h-full origin-left bg-gradient-to-r from-lavender via-mauve to-serena-pearl will-change-transform"
                  style={{ transform: 'scaleX(0.25)' }}
                />
              </div>
              <span className="text-[11px] tracking-[0.18em] text-mist uppercase">
                {HORIZONTAL_JOURNEY[activeIndex].eyebrow}
              </span>
            </div>
          </div>

          {/* Trilho Horizontal */}
          <div
            ref={trackRef}
            className="relative z-10 flex w-max items-stretch gap-8 px-10 will-change-transform xl:gap-10 xl:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
          >
            {HORIZONTAL_JOURNEY.map((chapter) => {
              const asset = IMAGE_ASSETS[chapter.imageKey];
              const dims = IMAGE_DIMENSIONS[chapter.imageKey];
              const objectPositionClass =
                chapter.imageKey === 'ritual-noturno'
                  ? 'object-[60%_25%]'
                  : 'object-center';

              return (
                <article
                  key={chapter.number}
                  data-journey-panel
                  className="relative isolate grid h-[58vh] min-h-[410px] max-h-[580px] w-[78vw] max-w-[1040px] shrink-0 transform-gpu grid-cols-12 overflow-hidden rounded-[2rem] border border-silver/16 bg-midnight shadow-[0_32px_80px_-28px_rgba(4,2,10,0.94)] [backface-visibility:hidden]"
                >
                  {/* Imagem com Overscan Real + Paralaxe GPU sem costura/seam */}
                  <div className="relative col-span-7 overflow-hidden bg-midnight">
                    <img
                      data-journey-parallax
                      src={asset.src}
                      alt={asset.alt}
                      width={dims.width}
                      height={dims.height}
                      loading="lazy"
                      decoding="async"
                      className={`absolute -top-[4%] -left-[12%] h-[108%] w-[124%] max-w-none transform-gpu object-cover [backface-visibility:hidden] ${objectPositionClass}`}
                    />
                    {/* Gradiente de fusão suave na borda direita em camada GPU eliminando qualquer linha subpixel */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -right-[3px] w-28 transform-gpu bg-gradient-to-r from-transparent via-midnight/80 to-midnight [backface-visibility:hidden]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-5 left-7 font-display text-8xl leading-none italic text-serena-pearl/18 select-none"
                    >
                      {chapter.number}
                    </span>
                  </div>

                  {/* Conteúdo Editorial do Capítulo (-ml-[2px] + bg-midnight sólido em GPU) */}
                  <div className="relative z-10 col-span-5 -ml-[2px] flex transform-gpu flex-col justify-between bg-midnight p-8 [backface-visibility:hidden] xl:p-11">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-silver/14 pb-4">
                        <span className="text-[11px] font-medium tracking-[0.24em] text-mauve uppercase">
                          Capítulo {chapter.number}
                        </span>
                        <span className="text-[11px] tracking-[0.16em] text-mist uppercase">
                          {chapter.eyebrow}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-3xl leading-[1.12] font-medium text-starlight xl:mt-7 xl:text-[2.35rem]">
                        {chapter.title}
                      </h3>

                      <p className="mt-4 text-[0.95rem] leading-[1.76] font-light text-mist xl:mt-5 xl:text-[0.98rem]">
                        {chapter.text}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-silver/14 pt-5">
                      <span className="h-1.5 w-1.5 rounded-full bg-mauve" aria-hidden="true" />
                      <span className="text-xs tracking-[0.16em] text-serena-dew uppercase">
                        {chapter.detail}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          MOBILE & TABLET (< 1024px) + FALLBACK REDUCED MOTION:
          Cards Editoriais com céu estrelado sutil e zero overflow horizontal
         ===================================================================== */}
      <div
        className={[
          'relative mx-auto px-5 py-20 sm:px-8',
          prefersReducedMotion ? 'max-w-7xl lg:px-10 lg:py-28' : 'max-w-4xl lg:hidden',
        ].join(' ')}
      >
        <StarfieldOverlay />

        <div className="relative z-10 mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-mauve/70" aria-hidden="true" />
            <span className="text-[11px] font-medium tracking-[0.24em] text-mauve uppercase">
              {HORIZONTAL_JOURNEY_HEADER.eyebrow}
            </span>
          </div>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.1] font-medium text-starlight sm:text-5xl">
            {HORIZONTAL_JOURNEY_HEADER.title}
          </h2>
          <p className="mt-3 text-base font-light text-mist">
            {HORIZONTAL_JOURNEY_HEADER.subtitle}
          </p>
        </div>

        <div
          className={[
            'relative z-10',
            prefersReducedMotion ? 'grid grid-cols-1 gap-8 lg:grid-cols-2' : 'space-y-7 sm:space-y-8',
          ].join(' ')}
        >
          {HORIZONTAL_JOURNEY.map((chapter) => {
            const asset = IMAGE_ASSETS[chapter.imageKey];
            const dims = IMAGE_DIMENSIONS[chapter.imageKey];
            const objectPositionClass =
              chapter.imageKey === 'ritual-noturno'
                ? 'object-[60%_25%]'
                : 'object-center';

            return (
              <article
                key={chapter.number}
                data-journey-mobile-card
                className="overflow-hidden rounded-3xl border border-silver/16 bg-midnight"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-midnight">
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    width={dims.width}
                    height={dims.height}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${objectPositionClass}`}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent"
                  />
                  <span className="absolute top-3.5 left-3.5 rounded-full border border-silver/20 bg-abyss/85 px-3 py-1 text-[10px] tracking-[0.18em] text-serena-pearl uppercase sm:top-4 sm:left-4 sm:px-3.5 sm:text-[11px]">
                    Capítulo {chapter.number}
                  </span>
                </div>

                <div className="p-5 sm:p-8">
                  <p className="text-[11px] font-medium tracking-[0.2em] text-mauve uppercase">
                    {chapter.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-[1.7rem] leading-[1.14] font-medium text-starlight sm:text-3xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-3.5 text-sm leading-[1.78] font-light text-mist sm:mt-4 sm:text-base">
                    {chapter.text}
                  </p>
                  <div className="mt-5 flex items-center gap-2.5 border-t border-silver/14 pt-4 sm:mt-6">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mauve" aria-hidden="true" />
                    <span className="text-xs tracking-[0.14em] text-serena-dew uppercase sm:tracking-[0.16em]">
                      {chapter.detail}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
