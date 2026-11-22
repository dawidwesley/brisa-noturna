import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Droplets, Feather, Moon } from 'lucide-react';
import { ABOUT_BRAND, BRAND } from '@/data/content';
import { SpotlightCard } from './SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  onNavigate?: (href: string) => void;
}

const STORY_BEAT_ICONS = [Droplets, Moon, Feather] as const;

export function AboutSection({ onNavigate }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-about-reveal]', {
        opacity: 0,
        y: 26,
        force3D: true,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from('[data-about-pillar]', {
        opacity: 0,
        y: 32,
        force3D: true,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-about-pillars-grid]',
          start: 'top 82%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTransitionClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate('#jornada');
  };

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="section-royal section-ambient-glow relative py-20 sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="divider-lunar absolute inset-x-0 top-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Composição Editorial Assimétrica: Leitura Escaneável em 3 Segundos */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Coluna Esquerda: Título, Lead Empático & Medalhão Oficial da Marca */}
          <div className="lg:col-span-5">
            <div data-about-reveal className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-mauve/75" aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-[0.26em] text-mauve uppercase">
                {ABOUT_BRAND.eyebrow}
              </span>
            </div>

            <h2
              data-about-reveal
              className="mt-5 font-display text-[2rem] leading-[1.08] font-medium text-starlight min-[375px]:text-[2.25rem] sm:text-5xl"
            >
              {ABOUT_BRAND.title}
            </h2>

            <p
              data-about-reveal
              className="mt-5 font-display text-2xl leading-snug italic text-serena-dew"
            >
              “{ABOUT_BRAND.lead}”
            </p>

            {/* Medalhão de Referência Visual da Casa Brisa Noturna */}
            <div
              data-about-reveal
              className="mt-8 flex items-center gap-4 rounded-2xl border border-silver/14 bg-abyss/65 p-4"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-silver/20 bg-abyss">
                <img
                  src={BRAND.logoPath}
                  alt="Referência visual oficial da marca Brisa Noturna"
                  width={470}
                  height={515}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg tracking-[0.12em] text-starlight uppercase">
                  {BRAND.name}
                </p>
                <p className="mt-0.5 text-xs tracking-[0.14em] text-mist uppercase">
                  {BRAND.origin}
                </p>
                <p className="mt-1 text-xs font-light text-mist/85">
                  {BRAND.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Frase-Tese + 3 Micro-Fragmentos Escaneáveis + Gancho */}
          <div className="lg:col-span-7 lg:pl-6">
            {/* Frase-Tese de Contraste */}
            <p
              data-about-reveal
              className="border-l border-mauve/55 pl-4 font-display text-[1.3rem] leading-[1.36] font-normal text-serena-pearl min-[375px]:text-[1.45rem] sm:pl-6 sm:text-[1.72rem]"
            >
              {ABOUT_BRAND.thesis}
            </p>

            {/* 3 Micro-Fragmentos Editoriais */}
            <ol className="mt-7 space-y-3.5 sm:mt-8">
              {ABOUT_BRAND.storyBeats.map((beat, index) => {
                const Icon = STORY_BEAT_ICONS[index] ?? Droplets;
                return (
                  <li
                    key={beat.index}
                    data-about-reveal
                    className="group flex items-start gap-3 rounded-2xl border border-silver/12 bg-abyss/55 px-4 py-4 transition-[border-color,background-color] duration-300 hover:border-mauve/35 hover:bg-abyss/75 sm:gap-4 sm:px-5"
                  >
                    <div className="flex shrink-0 items-center gap-2 pt-0.5 sm:gap-2.5">
                      <span className="font-display text-lg italic text-mauve">
                        {beat.index}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-silver/14 bg-plum/55 text-serena-dew transition-colors group-hover:border-mauve/50 group-hover:text-serena-pearl">
                        <Icon size={14} aria-hidden="true" />
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold tracking-[0.14em] text-serena-pearl uppercase sm:tracking-[0.16em]">
                        {beat.label}
                      </h3>
                      <p className="mt-1.5 text-sm leading-[1.68] font-light text-mist sm:text-[0.95rem]">
                        {beat.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Micro-Gancho para "Da Flor ao Repouso" */}
            <div data-about-reveal className="mt-7 flex items-center justify-between gap-4 border-t border-silver/12 pt-5">
              <a
                href="#jornada"
                onClick={handleTransitionClick}
                className="group inline-flex min-h-[44px] items-center gap-3 text-[11px] font-medium tracking-[0.12em] text-serena-dew uppercase transition-colors hover:text-starlight sm:text-xs sm:tracking-[0.16em]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mauve/40 bg-plum/50 text-serena-pearl transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown size={13} aria-hidden="true" />
                </span>
                <span>{ABOUT_BRAND.transitionCue}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Pilares em SpotlightCards */}
        <div
          data-about-pillars-grid
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-24"
        >
          {ABOUT_BRAND.pillars.map((pillar) => (
            <SpotlightCard
              key={pillar.index}
              data-about-pillar
              className="bg-abyss/68 p-7 sm:p-8"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-silver/12 pb-4">
                    <span className="font-display text-3xl italic text-mauve">
                      {pillar.index}
                    </span>
                    <span className="text-[11px] tracking-[0.2em] text-mist uppercase">
                      Pilar
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-medium text-starlight sm:text-[1.75rem]">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium tracking-[0.16em] text-serena-dew uppercase">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-[1.75] font-light text-mist sm:text-[0.95rem]">
                    {pillar.description}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="mt-8 h-[1px] w-24 origin-left scale-x-50 bg-gradient-to-r from-mauve/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
