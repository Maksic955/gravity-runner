type Props = {
  speed: number;
};

export default function Background({ speed }: Props) {
  const animationDuration = Math.max(20, 60 - speed * 40);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2a 50%, #0f0520 100%)',
        zIndex: 0,
      }}
    >
      {/* Parallax layers - distant mountains */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `
            linear-gradient(to top, transparent, rgba(30, 10, 50, 0.3)),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 200px,
              rgba(50, 20, 70, 0.4) 200px,
              rgba(50, 20, 70, 0.4) 400px
            )
          `,
          animation: `slideLeft ${animationDuration * 4}s linear infinite`,
          opacity: 0.6,
        }}
      />

      {/* Parallax layers - closer mountains */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 150px,
              rgba(70, 30, 90, 0.5) 150px,
              rgba(70, 30, 90, 0.5) 300px
            )
          `,
          animation: `slideLeft ${animationDuration * 2}s linear infinite`,
          opacity: 0.7,
        }}
      />

      {/* Stars in the background - slowly moving */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.6) 1.5px, transparent 1.5px),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
            radial-gradient(circle at 30% 80%, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            radial-gradient(circle at 90% 60%, rgba(255, 255, 255, 0.9) 2px, transparent 2px)
          `,
          backgroundSize: '800px 600px, 600px 800px, 1000px 700px, 700px 900px, 900px 500px',
          animation: `slideLeft ${animationDuration * 8}s linear infinite`,
          opacity: 0.4,
        }}
      />

      {/* Additional stars - faster */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 40% 50%, rgba(200, 200, 255, 0.6) 1px, transparent 1px),
            radial-gradient(circle at 70% 30%, rgba(200, 200, 255, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 15% 70%, rgba(200, 200, 255, 0.7) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '500px 400px, 700px 500px, 600px 600px',
          animation: `slideLeft ${animationDuration * 3}s linear infinite`,
          opacity: 0.3,
        }}
      />

      {/* Fog/clouds - fastest */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(80, 40, 120, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(100, 50, 140, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '400px 300px, 500px 400px',
          animation: `slideLeft ${animationDuration}s linear infinite`,
          opacity: 0.5,
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideLeft {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -2000px;
          }
        }
      `}</style>
    </div>
  );
}