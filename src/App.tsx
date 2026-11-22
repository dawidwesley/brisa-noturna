import { Suspense, lazy, useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { HorizontalJourney } from '@/components/HorizontalJourney';
import { RitualLayers } from '@/components/RitualLayers';
import { SerenaProduct } from '@/components/SerenaProduct';
import { FaqSection } from '@/components/FaqSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const FilmShowcase = lazy(() =>
  import('@/components/FilmShowcase').then((module) => ({
    default: module.FilmShowcase,
  }))
);

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  // Inicialização do Lenis Smooth Scroll sincronizado com GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
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

    // Recalcula triggers após fontes/imagens assentarem
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      window.clearTimeout(refreshTimer);
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  // Navegação suave via Lenis para todas as âncoras e CTAs
  const handleNavigate = useCallback((href: string) => {
    if (!href.startsWith('#')) return;
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

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
        <AboutSection onNavigate={handleNavigate} />
        <HorizontalJourney />
        <Suspense
          fallback={
            <section
              id="filme"
              aria-label="Carregando estudo cinematográfico Serena"
              className="section-velvet relative py-24 sm:py-28 lg:py-36"
            >
              <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="aspect-[16/9] w-full animate-pulse rounded-[2rem] border border-silver/12 bg-abyss/80" />
              </div>
            </section>
          }
        >
          <FilmShowcase />
        </Suspense>
        <RitualLayers />
        <SerenaProduct onNavigate={handleNavigate} />
        <FaqSection onNavigate={handleNavigate} />
        <ContactSection />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
