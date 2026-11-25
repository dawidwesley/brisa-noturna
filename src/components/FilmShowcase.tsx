import { useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import type { PlayerRef } from '@remotion/player';
import { Film, Play } from 'lucide-react';
import { IMAGE_ASSETS, REMOTION_SHOWCASE } from '@/data/content';
import { SERENA_FILM_CONFIG, SerenaFilm } from '@/remotion/SerenaFilm';
import { LunarMark } from './LunarMark';

const ACT_START_FRAMES = [0, 100, 200] as const;

export function FilmShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const seekTimerRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [forcePlayFilm, setForcePlayFilm] = useState(false);
  const [activeActIndex, setActiveActIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => {
      mediaQuery.removeEventListener('change', update);
      if (seekTimerRef.current !== null) {
        window.clearTimeout(seekTimerRef.current);
      }
    };
  }, []);

  const showInteractivePlayer = !prefersReducedMotion || forcePlayFilm;

  // Pausa o Player Remotion fora da viewport para eliminar uso ocioso de CPU/GPU
  useEffect(() => {
    if (!showInteractivePlayer) return;
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = playerRef.current;
        if (!player) return;
        if (entry.isIntersecting) {
          if (!prefersReducedMotion || forcePlayFilm) {
            player.play();
          }
        } else {
          player.pause();
        }
      },
      { rootMargin: '80px 0px', threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [showInteractivePlayer, prefersReducedMotion, forcePlayFilm]);

  useEffect(() => {
    if (!showInteractivePlayer) return;
    const player = playerRef.current;
    if (!player) return;

    const handleFrameUpdate = (event: { detail: { frame: number } }) => {
      const currentFrame = event.detail.frame;
      const nextAct = currentFrame < 98 ? 0 : currentFrame < 198 ? 1 : 2;
      setActiveActIndex((prev) => (prev === nextAct ? prev : nextAct));
    };

    player.addEventListener('frameupdate', handleFrameUpdate);
    return () => {
      player.removeEventListener('frameupdate', handleFrameUpdate);
    };
  }, [showInteractivePlayer]);

  const handleSelectAct = (index: number) => {
    setActiveActIndex(index);
    if (!showInteractivePlayer) {
      setForcePlayFilm(true);
      if (seekTimerRef.current !== null) {
        window.clearTimeout(seekTimerRef.current);
      }
      seekTimerRef.current = window.setTimeout(() => {
        seekTimerRef.current = null;
        playerRef.current?.seekTo(ACT_START_FRAMES[index]);
        playerRef.current?.play();
      }, 60);
      return;
    }
    playerRef.current?.seekTo(ACT_START_FRAMES[index]);
    playerRef.current?.play();
  };

  return (
    <section
      id="filme"
      ref={sectionRef}
      className="section-velvet section-ambient-glow relative py-20 sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="divider-lunar absolute inset-x-0 top-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Cabeçalho Editorial */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-silver/15 bg-abyss/65 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.18em] text-mauve uppercase sm:gap-2.5 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
            <Film size={13} className="shrink-0" aria-hidden="true" />
            <span>{REMOTION_SHOWCASE.eyebrow}</span>
          </div>

          <h2 className="mt-5 font-display text-[2.1rem] leading-[1.1] font-medium text-starlight sm:text-5xl lg:text-[3.4rem]">
            {REMOTION_SHOWCASE.title}
          </h2>

          <p className="mt-4 text-base leading-relaxed font-light text-mist sm:text-lg">
            {REMOTION_SHOWCASE.description}
          </p>
        </div>

        {/* Moldura Editorial do Player Remotion */}
        <div className="relative mt-10 sm:mt-12 lg:mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-[2.6rem] opacity-70 sm:-inset-6"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(155, 111, 199, 0.18) 0%, rgba(27, 15, 46, 0.08) 52%, transparent 74%)',
            }}
          />

          <div className="relative rounded-2xl lunar-glass-strong p-2.5 sm:rounded-[2rem] sm:p-4 lg:p-5">
            {/* Barra Superior Editorial da Moldura */}
            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-1.5 py-1 text-[10px] tracking-[0.14em] text-mist uppercase sm:mb-3 sm:px-2 sm:text-[11px] sm:tracking-[0.2em]">
              <span className="flex items-center gap-2 text-serena-dew">
                <LunarMark size={13} className="shrink-0 text-mauve" />
                <span>Brisa Noturna • Filme Programático Serena</span>
              </span>
              <span className="text-mist/90">{REMOTION_SHOWCASE.replayHint}</span>
            </div>

            {/* Viewport 16:9 */}
            <div className="relative overflow-hidden rounded-xl border border-silver/15 bg-abyss sm:rounded-2xl">
              {showInteractivePlayer ? (
                <Player
                  ref={playerRef}
                  component={SerenaFilm}
                  durationInFrames={SERENA_FILM_CONFIG.durationInFrames}
                  compositionWidth={SERENA_FILM_CONFIG.width}
                  compositionHeight={SERENA_FILM_CONFIG.height}
                  fps={SERENA_FILM_CONFIG.fps}
                  autoPlay={false}
                  loop
                  controls
                  clickToPlay
                  initiallyMuted
                  acknowledgeRemotionLicense
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    display: 'block',
                  }}
                />
              ) : (
                /* Fallback Elegante para prefers-reduced-motion: reduce (1:1 integral sem cortes) */
                <div className="relative grid grid-cols-12 overflow-hidden bg-abyss md:aspect-[16/9]">
                  <div className="relative col-span-12 flex aspect-square items-center justify-center bg-[#080410] p-3 md:col-span-5 md:aspect-auto md:p-4">
                    <img
                      src={IMAGE_ASSETS['serena-hero'].src}
                      alt={IMAGE_ASSETS['serena-hero'].alt}
                      width={1254}
                      height={1254}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <div className="col-span-12 flex flex-col justify-center p-5 sm:p-7 md:col-span-7 lg:p-10">
                    <span className="text-[11px] tracking-[0.2em] text-mauve uppercase sm:tracking-[0.24em]">
                      Modo Movimento Reduzido Ativo
                    </span>
                    <p className="mt-3 font-display text-2xl italic text-serena-pearl sm:text-3xl lg:text-4xl">
                      {REMOTION_SHOWCASE.closingPhrase}
                    </p>
                    <p className="mt-3 text-sm font-light text-mist">
                      A reprodução automática foi pausada em respeito às preferências do seu sistema.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setForcePlayFilm(true)}
                        className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-silver/25 bg-silver/12 px-5 py-2.5 text-xs font-medium tracking-[0.14em] text-serena-pearl uppercase transition-colors hover:bg-silver hover:text-abyss sm:w-auto sm:tracking-[0.16em]"
                      >
                        <Play size={14} className="shrink-0" aria-hidden="true" />
                        <span>Assistir ao estudo cinematográfico</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Storyboard Interativo dos 3 Atos */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-8 md:grid-cols-3">
          {REMOTION_SHOWCASE.scenes.map((scene, index) => {
            const isActive = activeActIndex === index;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleSelectAct(index)}
                aria-pressed={isActive}
                className={[
                  'group flex min-h-[44px] flex-col justify-between rounded-2xl border p-5 text-left transition-[background-color,border-color] duration-300',
                  'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-mauve',
                  isActive
                    ? 'border-mauve/55 bg-plum/45 shadow-[0_18px_40px_-22px_rgba(141,106,168,0.45)]'
                    : 'border-silver/12 bg-abyss/55 hover:border-silver/25 hover:bg-abyss/80',
                ].join(' ')}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium tracking-[0.22em] text-mauve uppercase">
                      {scene.act}
                    </span>
                    <span className="font-mono text-[11px] text-mist/90">
                      {scene.timestamp}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-medium text-starlight">
                    {scene.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-light text-mist">
                    {scene.caption}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-silver/10"
                >
                  <div
                    className={[
                      'h-full w-full origin-left rounded-full transition-transform duration-500',
                      isActive
                        ? 'scale-x-100 bg-gradient-to-r from-lavender via-mauve to-serena-pearl'
                        : 'scale-x-[0.18] bg-silver/35 group-hover:scale-x-[0.32]',
                    ].join(' ')}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
