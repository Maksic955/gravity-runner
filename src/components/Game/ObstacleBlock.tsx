type Props = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export default function ObstacleBlock({ x, y, w, h }: Props) {
  const isBeam = h <= 26 || w >= 140;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: isBeam ? 12 : 16,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform',
        overflow: 'hidden',

        background: isBeam
          ? 'linear-gradient(180deg, rgba(255,120,235,0.85), rgba(120,80,255,0.45))'
          : 'linear-gradient(180deg, rgba(40,40,60,0.85), rgba(10,10,18,0.55))',

        border: isBeam
          ? '1px solid rgba(255,255,255,0.22)'
          : '1px solid rgba(255,255,255,0.12)',

        boxShadow: isBeam
          ? '0 14px 34px rgba(0,0,0,0.45), 0 0 26px rgba(255,120,235,0.45), 0 0 36px rgba(120,80,255,0.28)'
          : '0 18px 44px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: isBeam ? 12 : 16,
          background: isBeam
            ? 'linear-gradient(90deg, rgba(255,255,255,0.28), rgba(255,255,255,0.06), rgba(255,255,255,0.22))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))',
          opacity: 0.9,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          top: 6,
          height: Math.max(10, isBeam ? 12 : 14),
          borderRadius: 999,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.00))',
          opacity: isBeam ? 0.65 : 0.35,
          pointerEvents: 'none',
        }}
      />

      {isBeam && (
        <div
          style={{
            position: 'absolute',
            inset: -6,
            borderRadius: 14,
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.24), transparent)',
            opacity: 0.40,
            filter: 'blur(2px)',
            animation: 'shimmer 1.5s linear infinite',
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(120%);
          }
        }
      `}</style>
    </div>
  );
}