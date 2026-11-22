import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Feather, Sparkles } from 'lucide-react';
import { IMAGE_ASSETS, RITUAL_HEADER, RITUAL_STEPS } from '@/data/content';
import type { ImageKey } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const STICKY_Z_VARS = [
  'var(--z-sticky-card-1)',
  'var(--z-sticky-card-2)',
  'var(--z-sticky-card-3)',
] as const;

const IMAGE_DIMENSIONS: Record<ImageKey, { width: number; height: number }> = {
  'lavender-field': { width: 1376, height: 768 },
  'lavender-botanical': { width: 1200, height: 896 },
  'ritual-noturno': { width: 1200, height: 896 },
  'serena-hero': { width: 896, height: 1200 },
};

export function RitualLayers() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop (>= 1024px): carrossel em camadas sticky com ocultação total (autoAlpha: 0)
    // calibrado para manter 100% de opacidade durante a leitura em 720p–1440p e zerar antes da sobreposição
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      cardRefs.current.forEach((card, index) => {
        const nextCard = cardRefs.current[index + 1];
        if (!card || !nextCard) return;

        gsap.fromTo(
          card,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            pointerEvents: 'auto',
          },
          {
            autoAlpha: 0,
            scale: 0.94,
            y: -14,
            pointerEvents: 'none',
            force3D: true,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: nextCard,
              start: () => `top ${Math.min(Math.round(window.innerHeight * 0.78), 640)}px`,
              end: () => `top ${Math.min(Math.round(window.innerHeight * 0.42), 320)}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    // Mobile & Tablet (< 1024px): fluxo vertical respirável sem sobreposição
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 26,
          force3D: true,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    /* ATENÇÃO: Sem overflow-hidden nesta seção nem em ancestrais para preservar position: sticky no desktop */
    <section
      id="ritual"
      ref={sectionRef}
      className="section-abyss relative py-20 sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="divider-lunar absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Cabeçalho da Seção */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-mauve/70" aria-hidden="true" />
            <span className="text-[11px] font-medium tracking-[0.24em] text-mauve uppercase sm:tracking-[0.26em]">
              {RITUAL_HEADER.eyebrow}
            </span>
            <span className="h-[1px] w-8 bg-mauve/70" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-display text-[2.1rem] leading-[1.1] font-medium text-starlight sm:text-5xl lg:text-[3.5rem]">
            {RITUAL_HEADER.title}
          </h2>

          <p className="mt-4 text-base leading-relaxed font-light text-mist sm:text-lg">
            {RITUAL_HEADER.subtitle}
          </p>
        </div>

        {/* Pilha de 3 Camadas Editoriais:
            - Todos os cards desktop ancoram no MESMO lg:top-24 com fundo 100% opaco (#150B26)
            - O passo anterior vai a autoAlpha: 0 antes do próximo assumir o palco */}
        <div className="mt-12 space-y-8 pb-6 sm:mt-14 sm:space-y-10 lg:mt-20 lg:space-y-56 motion-reduce:lg:space-y-12">
          {RITUAL_STEPS.map((step, index) => {
            const asset = IMAGE_ASSETS[step.imageKey];
            const dims = IMAGE_DIMENSIONS[step.imageKey];
            const objectPositionClass =
              step.imageKey === 'ritual-noturno'
                ? 'object-[60%_25%]'
                : 'object-center';

            return (
              <article
                key={step.number}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{ zIndex: STICKY_Z_VARS[index] }}
                className="relative isolate origin-top rounded-[1.75rem] border border-mauve/25 bg-[#150B26] shadow-[0_32px_90px_-24px_rgba(4,2,10,0.98)] sm:rounded-[2rem] lg:sticky lg:top-24 lg:will-change-transform motion-reduce:lg:static"
              >
                <div className="grid grid-cols-1 items-stretch lg:min-h-[460px] lg:grid-cols-12">
                  {/* Conteúdo do Passo */}
                  <div className="flex flex-col justify-between p-5 sm:p-10 lg:col-span-7 lg:p-12">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-silver/12 pb-4 sm:gap-4 sm:pb-5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mauve/45 bg-plum font-display text-lg italic text-serena-pearl">
                            {step.number}
                          </span>
                          <span className="text-[11px] font-medium tracking-[0.2em] text-mauve uppercase sm:tracking-[0.24em]">
                            {step.eyebrow}
                          </span>
                        </div>

                        {/* Indicador discreto de etapa 01 — 02 — 03 */}
                        <div
                          aria-label={`Passo ${index + 1} de 3`}
                          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em]"
                        >
                          {RITUAL_STEPS.map((indicator, idx) => (
                            <span key={indicator.number} className="inline-flex items-center gap-2">
                              <span
                                className={
                                  idx === index
                                    ? 'font-semibold text-serena-pearl'
                                    : 'text-mist/45'
                                }
                              >
                                {indicator.number}
                              </span>
                              {idx < RITUAL_STEPS.length - 1 && (
                                <span
                                  aria-hidden="true"
                                  className="h-[1px] w-3 bg-silver/20"
                                />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="mt-6 font-display text-[1.9rem] leading-[1.08] font-medium text-starlight sm:mt-7 sm:text-4xl lg:text-[2.7rem]">
                        {step.title}
                      </h3>

                      <p className="mt-3 font-display text-xl italic text-serena-dew sm:text-2xl">
                        {step.summary}
                      </p>

                      <p className="mt-4 text-sm leading-[1.82] font-light text-mist sm:mt-5 sm:text-base">
                        {step.description}
                      </p>
                    </div>

                    {/* Metadados do Ritual */}
                    <div className="mt-7 grid grid-cols-1 gap-3 border-t border-silver/12 pt-5 sm:mt-8 sm:grid-cols-3 sm:pt-6">
                      <div className="rounded-xl border border-silver/12 bg-abyss px-4 py-3">
                        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-mist uppercase">
                          <Clock size={12} className="shrink-0 text-mauve" aria-hidden="true" />
                          <span>Momento</span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-serena-pearl">
                          {step.duration}
                        </p>
                      </div>

                      <div className="rounded-xl border border-silver/12 bg-abyss px-4 py-3">
                        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-mist uppercase">
                          <Feather size={12} className="shrink-0 text-mauve" aria-hidden="true" />
                          <span>Foco</span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-serena-pearl">
                          {step.focus}
                        </p>
                      </div>

                      <div className="rounded-xl border border-silver/12 bg-abyss px-4 py-3">
                        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-mist uppercase">
                          <Sparkles size={12} className="shrink-0 text-mauve" aria-hidden="true" />
                          <span>Sinal Sensorial</span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-serena-pearl">
                          {step.cue}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fotografia Atmosférica da Camada */}
                  <div className="relative h-60 overflow-hidden rounded-b-[1.75rem] border-t border-silver/12 bg-abyss sm:h-72 sm:rounded-b-[2rem] lg:col-span-5 lg:h-auto lg:min-h-[420px] lg:rounded-r-[2rem] lg:rounded-bl-none lg:border-t-0 lg:border-l">
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
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#150B26]/80 via-transparent to-abyss/20"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-6 bottom-4 font-display text-7xl leading-none italic text-serena-pearl/25 select-none"
                    >
                      {step.number}
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
