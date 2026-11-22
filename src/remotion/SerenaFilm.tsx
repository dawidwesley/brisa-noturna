import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { IMAGE_ASSETS, REMOTION_SHOWCASE } from '@/data/content';

export const SERENA_FILM_CONFIG = {
  width: 1280,
  height: 720,
  fps: 30,
  durationInFrames: 300,
} as const;

interface DewParticle {
  id: number;
  x: number;
  baseY: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
}

const DEW_PARTICLES: DewParticle[] = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: 8 + ((index * 53) % 84),
  baseY: 16 + ((index * 37) % 72),
  size: 2.5 + (index % 4) * 1.35,
  speed: 0.45 + (index % 5) * 0.14,
  drift: 8 + (index % 3) * 6,
  phase: index * 0.72,
}));

function ActOneLavenderField() {
  const frame = useCurrentFrame();
  const scene = REMOTION_SHOWCASE.scenes[0];

  const opacity = interpolate(frame, [0, 18, 88, 108], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 108], [1.03, 1.13], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: 'clamp',
  });

  const mistX = interpolate(frame, [0, 108], [-45, 55], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [10, 36], [28, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [10, 32, 82, 100], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: '#07040D', overflow: 'hidden' }}>
      <img
        src={IMAGE_ASSETS['lavender-field'].src}
        alt={IMAGE_ASSETS['lavender-field'].alt}
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale3d(${scale}, ${scale}, 1)`,
        }}
      />

      {/* Névoa ametista-lunar em deriva */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 68% 45% at 50% 68%, rgba(155, 111, 199, 0.28) 0%, rgba(27, 15, 46, 0.38) 55%, rgba(7, 4, 13, 0.88) 100%)',
          transform: `translate3d(${mistX}px, 0, 0)`,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(7, 4, 13, 0.56) 0%, rgba(18, 10, 31, 0.28) 45%, rgba(7, 4, 13, 0.92) 100%)',
        }}
      />

      {/* Tipografia cinética Ato I */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          padding: '64px 78px',
          opacity: titleOpacity,
          transform: `translate3d(0, ${titleY}px, 0)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '14px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '15px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C6A4E6',
          }}
        >
          <span>{scene.act}</span>
          <span
            style={{
              width: '44px',
              height: '1px',
              backgroundColor: 'rgba(228, 223, 240, 0.45)',
            }}
          />
          <span style={{ color: '#E4DFF0' }}>BRISA NOTURNA</span>
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '68px',
            fontWeight: 500,
            lineHeight: 1.04,
            color: '#F7F4FC',
            letterSpacing: '-0.01em',
            maxWidth: '760px',
          }}
        >
          {scene.title}
        </div>

        <div
          style={{
            marginTop: '14px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '21px',
            fontWeight: 300,
            lineHeight: 1.5,
            color: '#E4DFF0',
            maxWidth: '640px',
          }}
        >
          {scene.caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function ActTwoBotanicalCalm() {
  const frame = useCurrentFrame();
  const scene = REMOTION_SHOWCASE.scenes[1];

  const opacity = interpolate(frame, [0, 18, 92, 112], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 112], [1.1, 1.02], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });

  const panY = interpolate(frame, [0, 112], [18, -14], {
    extrapolateRight: 'clamp',
  });

  const waveScale1 = interpolate(frame, [0, 112], [0.78, 1.38]);
  const waveScale2 = interpolate(frame, [18, 112], [0.7, 1.48], {
    extrapolateLeft: 'clamp',
  });
  const waveOpacity1 = interpolate(frame, [0, 40, 112], [0, 0.34, 0]);
  const waveOpacity2 = interpolate(frame, [18, 56, 112], [0, 0.24, 0], {
    extrapolateLeft: 'clamp',
  });

  const textOpacity = interpolate(frame, [12, 34, 86, 104], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textY = interpolate(frame, [12, 36], [24, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: '#120A1F', overflow: 'hidden' }}>
      <img
        src={IMAGE_ASSETS['lavender-botanical'].src}
        alt={IMAGE_ASSETS['lavender-botanical'].alt}
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translate3d(0, ${panY}px, 0) scale3d(${scale}, ${scale}, 1)`,
        }}
      />

      {/* Vinheta veludo-ameixa (substitui CSS filter para 100% compositing GPU) */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 58% 45%, rgba(18, 10, 31, 0.44) 0%, rgba(7, 4, 13, 0.9) 82%)',
        }}
      />

      {/* Ondas concêntricas de calma */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: '420px',
            height: '420px',
            borderRadius: '999px',
            border: '1px solid rgba(228, 223, 240, 0.45)',
            opacity: waveOpacity1,
            transform: `scale(${waveScale1})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            borderRadius: '999px',
            border: '1px solid rgba(198, 164, 230, 0.52)',
            opacity: waveOpacity2,
            transform: `scale(${waveScale2})`,
          }}
        />
      </AbsoluteFill>

      {/* Partículas prateadas de orvalho */}
      <AbsoluteFill>
        {DEW_PARTICLES.map((particle) => {
          const yOffset = -frame * particle.speed * 0.9;
          const xOffset = Math.sin(frame * 0.05 + particle.phase) * particle.drift;
          const particleOpacity =
            0.25 + 0.55 * (0.5 + 0.5 * Math.sin(frame * 0.08 + particle.phase));

          return (
            <div
              key={particle.id}
              style={{
                position: 'absolute',
                left: `${particle.x}%`,
                top: `${particle.baseY}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                borderRadius: '999px',
                backgroundColor: particle.id % 2 === 0 ? '#EFEAF7' : '#C6A4E6',
                boxShadow: '0 0 12px rgba(228, 223, 240, 0.65)',
                opacity: particleOpacity,
                transform: `translate3d(${xOffset}px, ${yOffset}px, 0)`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Conteúdo editorial Ato II */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '64px 78px',
          opacity: textOpacity,
          transform: `translate3d(0, ${textY}px, 0)`,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 18px',
            borderRadius: '999px',
            border: '1px solid rgba(228, 223, 240, 0.24)',
            backgroundColor: 'rgba(22, 12, 38, 0.72)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '14px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#E4DFF0',
            marginBottom: '22px',
          }}
        >
          <span>{scene.act}</span>
          <span style={{ color: '#9B6FC7' }}>•</span>
          <span>5% Lavandula angustifolia</span>
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '70px',
            fontWeight: 500,
            lineHeight: 1.05,
            color: '#F7F4FC',
            maxWidth: '640px',
          }}
        >
          {scene.title}
        </div>

        <div
          style={{
            marginTop: '18px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '21px',
            fontWeight: 300,
            lineHeight: 1.55,
            color: '#D2CBE6',
            maxWidth: '580px',
          }}
        >
          {scene.caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function ActThreeSerenaReveal() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(frame, [0, 18, 92, 105], [0, 1, 1, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bottleSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.9 },
  });

  const textSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 20, stiffness: 75, mass: 1 },
  });

  const bottleY = interpolate(bottleSpring, [0, 1], [36, 0]);
  const bottleScale = interpolate(bottleSpring, [0, 1], [0.94, 1]);
  const textY = interpolate(textSpring, [0, 1], [28, 0]);
  const shimmerX = interpolate(frame, [0, 105], [-120, 420]);

  return (
    <AbsoluteFill
      style={{
        opacity: containerOpacity,
        background:
          'radial-gradient(circle at 30% 48%, rgba(155, 111, 199, 0.34) 0%, #1B0F2E 44%, #07040D 100%)',
        padding: '54px 72px',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '56px',
      }}
    >
      {/* Moldura do Frasco Serena */}
      <div
        style={{
          position: 'relative',
          width: '410px',
          height: '560px',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(228, 223, 240, 0.26)',
          boxShadow: '0 32px 72px -18px rgba(4, 2, 10, 0.94)',
          transform: `translate3d(0, ${bottleY}px, 0) scale3d(${bottleScale}, ${bottleScale}, 1)`,
          flexShrink: 0,
        }}
      >
        <img
          src={IMAGE_ASSETS['serena-hero'].src}
          alt={IMAGE_ASSETS['serena-hero'].alt}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(125deg, transparent 35%, rgba(239, 234, 247, 0.16) 50%, transparent 65%)',
            transform: `translate3d(${shimmerX}px, 0, 0)`,
          }}
        />
      </div>

      {/* Assinatura Poética Final */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: textSpring,
          transform: `translate3d(0, ${textY}px, 0)`,
        }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '14px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#C6A4E6',
            marginBottom: '18px',
          }}
        >
          ATO III • 5% ESSÊNCIA PURA
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '78px',
            fontWeight: 500,
            fontStyle: 'italic',
            lineHeight: 0.96,
            color: '#EFEAF7',
            marginBottom: '20px',
          }}
        >
          Serena
        </div>

        <div
          style={{
            width: '74px',
            height: '1px',
            backgroundColor: 'rgba(228, 223, 240, 0.45)',
            marginBottom: '24px',
          }}
        />

        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '42px',
            fontWeight: 400,
            lineHeight: 1.2,
            color: '#F7F4FC',
            maxWidth: '580px',
          }}
        >
          {REMOTION_SHOWCASE.closingPhrase}
        </div>

        <div
          style={{
            marginTop: '28px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '14px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#B6ACC9',
          }}
        >
          <span>BRISA NOTURNA</span>
          <span style={{ color: '#9B6FC7' }}>•</span>
          <span>LAVANDA FRANCESA 5%</span>
          <span style={{ color: '#9B6FC7' }}>•</span>
          <span>200 ML</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/**
 * Composição Remotion oficial da Brisa Noturna (30fps, 300 frames / 10s, 1280x720).
 * Encena o universo do Serena (5% Lavanda Francesa pura) em 3 atos fluidos.
 */
export function SerenaFilm() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progressPct = (frame / durationInFrames) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: '#07040D' }}>
      <Sequence from={0} durationInFrames={108}>
        <ActOneLavenderField />
      </Sequence>

      <Sequence from={94} durationInFrames={112}>
        <ActTwoBotanicalCalm />
      </Sequence>

      <Sequence from={195} durationInFrames={105}>
        <ActThreeSerenaReveal />
      </Sequence>

      {/* Moldura editorial fina + linha de tempo lunar */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          border: '1px solid rgba(228, 223, 240, 0.14)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            width: '100%',
            transformOrigin: 'left center',
            transform: `scaleX(${Math.max(0, Math.min(1, progressPct / 100))})`,
            background: 'linear-gradient(90deg, #9B6FC7 0%, #E4DFF0 100%)',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
