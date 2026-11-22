import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';

// Code-splitting agressivo: todas as seções abaixo da dobra são carregadas via React.lazy
const AboutSection = lazy(() =>
  import('@/components/AboutSection').then((module) => ({
    default: module.AboutSection,
  }))
);

const HorizontalJourney = lazy(() =>
  import('@/components/HorizontalJourney').then((module) => ({
    default: module.HorizontalJourney,
  }))
);

const FilmShowcase = lazy(() =>
  import('@/components/FilmShowcase').then((module) => ({
    default: module.FilmShowcase,
  }))
);

const RitualLayers = lazy(() =>
  import('@/components/RitualLayers').then((module) => ({
    default: module.RitualLayers,
  }))
);

const SerenaProduct = lazy(() =>
  import('@/components/SerenaProduct').then((module) => ({
    default: module.SerenaProduct,
  }))
);

const FaqSection = lazy(() =>
  import('@/components/FaqSection').then((module) => ({
    default: module.FaqSection,
  }))
);

const ContactSection = lazy(() =>
  import('@/components/ContactSection').then((module) => ({
    default: module.ContactSection,
  }))
);

const Footer = lazy(() =>
  import('@/components/Footer').then((module) => ({
    default: module.Footer,
  }))
);

interface SectionPlaceholderProps {
  label: string;
  minHeightClass: string;
  surfaceClass: string;
}

function SectionPlaceholder({
  label,
  minHeightClass,
  surfaceClass,
}: SectionPlaceholderProps) {
  return (
    <section
      aria-label={label}
      className={`${surfaceClass} relative w-full ${minHeightClass}`}
    />
  );
}

function LazyMountSignal({ onMounted }: { onMounted: () => void }) {
  useEffect(() => {
    onMounted();
  }, [onMounted]);
  return null;
}

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTriggerRefreshRef = useRef<(() => void) | null>(null);
  const refreshDebounceRef = useRef<number | null>(null);
  const pendingAnchorRef = useRef<string | null>(null);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  // Dispara um único ScrollTrigger.refresh() consolidado após a montagem das seções lazy
  const scheduleScrollTriggerRefresh = useCallback(() => {
    if (refreshDebounceRef.current !== null) {
      window.clearTimeout(refreshDebounceRef.current);
    }
    refreshDebounceRef.current = window.setTimeout(() => {
      refreshDebounceRef.current = null;
      scrollTriggerRefreshRef.current?.();
    }, 180);
  }, []);

  // Monta o bloco abaixo da dobra de forma escalonada após o primeiro paint harmônico do Hero
  useEffect(() => {
    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;
    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    const unlockBelowFold = () => {
      if (!cancelled) {
        setBelowFoldReady(true);
      }
    };

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (cancelled) return;
        const win = window as Window & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          cancelIdleCallback?: (id: number) => void;
        };

        if (typeof win.requestIdleCallback === 'function') {
          idleHandle = win.requestIdleCallback(unlockBelowFold, { timeout: 140 });
        } else {
          timeoutHandle = window.setTimeout(unlockBelowFold, 120);
        }
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      if (idleHandle !== null) {
        const win = window as Window & { cancelIdleCallback?: (id: number) => void };
        win.cancelIdleCallback?.(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, []);

  // Inicialização diferida do Lenis + GSAP ScrollTrigger (~160ms pós-paint) para 60fps no Hero
  useEffect(() => {
    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;
    let initTimer: number | null = null;
    let cleanupScrollEngine: (() => void) | null = null;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const startScrollEngine = () => {
      Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')])
        .then(([{ default: LenisCtor }, { gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;

          gsap.registerPlugin(ScrollTrigger);
          scrollTriggerRefreshRef.current = () => ScrollTrigger.refresh();

          let lenis: Lenis | null = null;
          let tickerCallback: ((time: number) => void) | null = null;

          if (!prefersReducedMotion) {
            lenis = new LenisCtor({
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              smoothWheel: true,
              wheelMultiplier: 0.95,
              touchMultiplier: 1.5,
            });

            lenisRef.current = lenis;
            lenis.on('scroll', ScrollTrigger.update);

            tickerCallback = (time: number) => {
              lenis?.raf(time * 1000);
            };

            gsap.ticker.add(tickerCallback);
            gsap.ticker.lagSmoothing(0);
          }

          scheduleScrollTriggerRefresh();

          cleanupScrollEngine = () => {
            if (tickerCallback) {
              gsap.ticker.remove(tickerCallback);
            }
            if (lenis) {
              lenis.off('scroll', ScrollTrigger.update);
              lenis.destroy();
            }
            lenisRef.current = null;
            scrollTriggerRefreshRef.current = null;
          };
        })
        .catch(() => {
          // Mantém rolagem nativa funcional em caso de falha na importação diferida
        });
    };

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (cancelled) return;
        initTimer = window.setTimeout(startScrollEngine, 160);
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      if (initTimer !== null) {
        window.clearTimeout(initTimer);
      }
      if (refreshDebounceRef.current !== null) {
        window.clearTimeout(refreshDebounceRef.current);
      }
      cleanupScrollEngine?.();
    };
  }, [scheduleScrollTriggerRefresh]);

  const scrollToElement = useCallback((targetElement: HTMLElement) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, {
        offset: -72,
        duration: 1.25,
      });
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  // Navegação suave via Lenis para todas as âncoras e CTAs (com destravamento imediato se clicado cedo)
  const handleNavigate = useCallback(
    (href: string) => {
      if (!href.startsWith('#')) return;
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        scrollToElement(targetElement);
        return;
      }

      pendingAnchorRef.current = targetId;
      setBelowFoldReady(true);
    },
    [scrollToElement]
  );

  // Completa navegação pendente assim que uma seção lazy termina de montar
  const handleLazySectionMounted = useCallback(() => {
    scheduleScrollTriggerRefresh();
    if (pendingAnchorRef.current) {
      const target = document.getElementById(pendingAnchorRef.current);
      if (target) {
        pendingAnchorRef.current = null;
        window.requestAnimationFrame(() => scrollToElement(target));
      }
    }
  }, [scheduleScrollTriggerRefresh, scrollToElement]);

  return (
    <div className="min-h-screen bg-abyss text-starlight">
      {/* Link de acessibilidade para navegação por teclado */}
      <a
        href="#conteudo-principal"
        className="sr-only fixed top-3 left-3 z-[80] rounded-full bg-silver px-4 py-2 text-xs font-medium text-abyss focus:not-sr-only"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar onNavigate={handleNavigate} />

      <main id="conteudo-principal">
        <HeroSection onNavigate={handleNavigate} />

        {belowFoldReady ? (
          <>
            <Suspense
              fallback={
                <SectionPlaceholder
                  label="Carregando seção Sobre a Brisa Noturna"
                  minHeightClass="min-h-[820px]"
                  surfaceClass="bg-royal-night"
                />
              }
            >
              <AboutSection onNavigate={handleNavigate} />
              <LazyMountSignal onMounted={handleLazySectionMounted} />
            </Suspense>

            <Suspense
              fallback={
                <SectionPlaceholder
                  label="Carregando jornada sensorial"
                  minHeightClass="min-h-screen"
                  surfaceClass="bg-abyss"
                />
              }
            >
              <HorizontalJourney />
              <LazyMountSignal onMounted={handleLazySectionMounted} />
            </Suspense>

            <Suspense
              fallback={
                <section
                  aria-label="Carregando estudo cinematográfico Serena"
                  className="bg-midnight relative py-20 sm:py-28 lg:py-36"
                >
                  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                    <div className="aspect-[16/9] w-full rounded-[2rem] border border-silver/12 bg-abyss/85" />
                  </div>
                </section>
              }
            >
              <FilmShowcase />
              <LazyMountSignal onMounted={handleLazySectionMounted} />
            </Suspense>

            <Suspense
              fallback={
                <SectionPlaceholder
                  label="Carregando ritual noturno"
                  minHeightClass="min-h-[900px]"
                  surfaceClass="bg-abyss"
                />
              }
            >
              <RitualLayers />
              <LazyMountSignal onMounted={handleLazySectionMounted} />
            </Suspense>

            <Suspense
              fallback={
                <SectionPlaceholder
                  label="Carregando produto Serena e ficha técnica"
                  minHeightClass="min-h-[1100px]"
                  surfaceClass="bg-royal-night"
                />
              }
            >
              <SerenaProduct onNavigate={handleNavigate} />
              <LazyMountSignal onMounted={handleLazySectionMounted} />
            </Suspense>

            <Suspense
              fallback={
                <SectionPlaceholder
                  label="Carregando perguntas frequentes"
                  minHeightClass="min-h-[760px]"
                  surfaceClass="bg-abyss"
                />
              }
            >
              <FaqSection onNavigate={handleNavigate} />
              <LazyMountSignal onMounted={handleLazySectionMounted} />
            </Suspense>

            <Suspense
              fallback={
                <SectionPlaceholder
                  label="Carregando canais de atendimento do atelier"
                  minHeightClass="min-h-[820px]"
                  surfaceClass="bg-midnight"
                />
              }
            >
              <ContactSection />
              <LazyMountSignal onMounted={handleLazySectionMounted} />
            </Suspense>
          </>
        ) : (
          <div aria-hidden="true">
            <SectionPlaceholder
              label="Preparando seção Sobre"
              minHeightClass="min-h-[820px]"
              surfaceClass="bg-royal-night"
            />
            <SectionPlaceholder
              label="Preparando jornada"
              minHeightClass="min-h-screen"
              surfaceClass="bg-abyss"
            />
            <SectionPlaceholder
              label="Preparando filme"
              minHeightClass="min-h-[640px]"
              surfaceClass="bg-midnight"
            />
            <SectionPlaceholder
              label="Preparando ritual"
              minHeightClass="min-h-[900px]"
              surfaceClass="bg-abyss"
            />
            <SectionPlaceholder
              label="Preparando produto Serena"
              minHeightClass="min-h-[1100px]"
              surfaceClass="bg-royal-night"
            />
            <SectionPlaceholder
              label="Preparando perguntas frequentes"
              minHeightClass="min-h-[760px]"
              surfaceClass="bg-abyss"
            />
            <SectionPlaceholder
              label="Preparando contato"
              minHeightClass="min-h-[820px]"
              surfaceClass="bg-midnight"
            />
          </div>
        )}
      </main>

      {belowFoldReady ? (
        <Suspense
          fallback={
            <footer
              aria-label="Carregando rodapé"
              className="min-h-[280px] w-full bg-abyss"
            />
          }
        >
          <Footer onNavigate={handleNavigate} />
          <LazyMountSignal onMounted={handleLazySectionMounted} />
        </Suspense>
      ) : (
        <footer aria-hidden="true" className="min-h-[280px] w-full bg-abyss" />
      )}
    </div>
  );
}
