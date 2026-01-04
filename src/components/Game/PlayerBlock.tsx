type Props = { 
  x: number; 
  y: number; 
  w: number; 
  h: number;
  direction: 1 | -1;
};

export default function PlayerBlock({ x, y, w, h, direction }: Props) {
  const rotation = direction === -1 ? 180 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        width: w,
        height: h,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Kontener z rotacją */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Główne ciało */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #e35b5b 100%)',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(227, 91, 91, 0.4)',
            animation: 'pulse 0.8s ease-in-out infinite',
          }}
        />
        
        {/* "oczy"*/}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(255,255,255,0.6)',
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(255,255,255,0.6)',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}