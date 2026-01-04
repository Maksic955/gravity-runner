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
      }}
    >
      {/* Centralny kontener */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          width: '100%',
          maxWidth: 420,
          animation: 'fadeIn 0.6s ease-out',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#fff',
            textAlign: 'center',
            textShadow: '0 0 12px rgba(180,120,255,0.35)',
          }}
        >
          GRAVITY
          <br />
          RUNNER
        </h1>

        <button
          onClick={onStart}
          style={{
            fontSize: 20,
            padding: '14px 48px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            cursor: 'pointer',
            letterSpacing: '0.12em',
            backdropFilter: 'blur(6px)',
          }}
        >
          START
        </button>
      </div>
    </div>
  );
}
