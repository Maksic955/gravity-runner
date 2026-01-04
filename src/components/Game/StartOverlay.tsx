type Props = {
  onStart: () => void;
};

export default function StartOverlay({ onStart }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
          width: '100%',
          maxWidth: 440,
          animation: 'menuIn 500ms ease-out both',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 62,
            fontWeight: 900,
            letterSpacing: '0.10em',
            color: '#fff',
            textAlign: 'center',
            textShadow: '0 0 16px rgba(180,120,255,0.45)',
            lineHeight: 1.05,
          }}
        >
          GRAVITY
          <br />
          RUNNER
        </h1>

        <button
          onClick={onStart}
          style={{
            fontSize: 18,
            padding: '12px 44px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            cursor: 'pointer',
            letterSpacing: '0.16em',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
            transition: 'transform 120ms ease, filter 120ms ease',
          }}
        >
          START
        </button>

        <style jsx>{`
          @keyframes menuIn {
            from {
              opacity: 0;
              transform: translateY(12px) scale(0.98);
              filter: blur(2px);
            }
            to {
              opacity: 1;
              transform: translateY(0px) scale(1);
              filter: blur(0px);
            }
          }

          button:hover {
            transform: translateY(-1px);
            filter: brightness(1.08);
          }
          button:active {
            transform: translateY(0px) scale(0.98);
          }
        `}</style>
      </div>
    </div>
  );
}