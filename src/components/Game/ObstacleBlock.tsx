type Props = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export default function ObstacleBlock({ x, y, w, h }: Props) {
  const isBeam = h <= 26 || w >= 140;

  const base = isBeam ? beamBaseStyle : slabBaseStyle;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: isBeam ? 10 : 14,
        ...base,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* edge highlight */}
      <div style={edgeStyle(isBeam)} />

      {/* inner gloss */}
      <div style={glossStyle(isBeam)} />

      {/* tiny noise (CSS-only, subtelne) */}
      <div style={noiseStyle} />

      {isBeam && <div style={shimmerStyle} />}
    </div>
  );
}

const beamBaseStyle: React.CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(190,120,255,0.45), rgba(120,70,190,0.25))',
  border: '1px solid rgba(255,255,255,0.14)',
  boxShadow:
    '0 10px 24px rgba(0,0,0,0.35), 0 0 18px rgba(180,120,255,0.25)',
};

const slabBaseStyle: React.CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(30,30,40,0.75), rgba(10,10,15,0.55))',
  border: '1px solid rgba(255,255,255,0.10)',
  boxShadow:
    '0 18px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
};

function edgeStyle(isBeam: boolean): React.CSSProperties {
  return {
    position: 'absolute',
    inset: 0,
    borderRadius: isBeam ? 10 : 14,
    pointerEvents: 'none',
    background: isBeam
      ? 'linear-gradient(90deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06), rgba(255,255,255,0.18))'
      : 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))',
    maskImage: 'linear-gradient(#000, #000)',
    opacity: 0.9,
    mixBlendMode: 'screen',
  };
}

function glossStyle(isBeam: boolean): React.CSSProperties {
  return {
    position: 'absolute',
    left: 6,
    right: 6,
    top: 5,
    height: Math.max(8, isBeam ? 10 : 14),
    borderRadius: 999,
    pointerEvents: 'none',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.00))',
    opacity: isBeam ? 0.55 : 0.35,
    filter: 'blur(0.2px)',
  };
}

const noiseStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 14,
  pointerEvents: 'none',
  opacity: 0.08,
  backgroundImage:
    'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
  backgroundSize: '10px 10px',
  mixBlendMode: 'overlay',
};

const shimmerStyle: React.CSSProperties = {
  position: 'absolute',
  inset: -2,
  borderRadius: 12,
  pointerEvents: 'none',
  background:
    'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
  opacity: 0.35,
  filter: 'blur(2px)',
  animation: 'shimmer 1.6s linear infinite',
};

<style jsx>{`
  @keyframes shimmer {
    from { transform: translateX(-120%); }
    to { transform: translateX(120%); }
  }
`}</style>