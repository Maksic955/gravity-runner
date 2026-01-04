type Props = { x: number; y: number; w: number; h: number };

export default function CoinBlock({ x, y, w, h }: Props) {
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
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
          borderRadius: '50%',
          border: '2px solid #b8860b',
          boxShadow: '0 4px 12px rgba(255, 215, 0, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
          animation: 'coinSpin 2s linear infinite, coinFloat 1.5s ease-in-out infinite',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 900,
            color: '#b8860b',
            textShadow: '0 1px 2px rgba(255,255,255,0.5)',
          }}
        >
          $
        </div>
      </div>

      <style jsx>{`
        @keyframes coinSpin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        
        @keyframes coinFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}