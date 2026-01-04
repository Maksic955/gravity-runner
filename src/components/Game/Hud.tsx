type Phase = 'MENU' | 'READY' | 'RUNNING' | 'PAUSED' | 'GAME_OVER';

type Props = {
  phase: Phase;
  distance: number;
  coinsCollected: number;
  onTogglePause: () => void;
};

export default function Hud({ phase, distance, coinsCollected, onTogglePause }: Props) {
  const isPaused = phase === 'PAUSED';

  return (
    <>
      {/* Licznik dystansu - lewa strona u góry */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        {/* Dystans */}
        <div
          style={{
            padding: '8px 20px',
            borderRadius: 20,
            border: '1px solid #333',
            background: '#0d0d0d',
            color: '#fff',
            fontSize: 18,
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
          }}
        >
          {distance}m
        </div>

        {/* Monety */}
        <div
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            border: '1px solid #333',
            background: '#0d0d0d',
            color: '#ffd700',
            fontSize: 18,
            fontWeight: 700,
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>💰</span>
          {coinsCollected}
        </div>
      </div>

      {/* Lewy-górny: Play */}
      <button
        aria-label="Play"
        onClick={() => {
          if (isPaused) onTogglePause();
        }}
        style={circleBtnStyle({ top: 16, left: 16, disabled: !isPaused })}
      >
        ▶
      </button>

      {/* Prawy-górny: Pause */}
      <button
        aria-label="Pause"
        onClick={() => {
          if (!isPaused && phase === 'RUNNING') onTogglePause();
        }}
        style={circleBtnStyle({ top: 16, right: 16, disabled: phase !== 'RUNNING' })}
      >
        ❚❚
      </button>
    </>
  );
}

function circleBtnStyle(opts: {
  top: number;
  left?: number;
  right?: number;
  disabled?: boolean;
}): React.CSSProperties {
  return {
    position: 'absolute',
    top: opts.top,
    left: opts.left,
    right: opts.right,
    width: 44,
    height: 44,
    borderRadius: 999,
    border: '1px solid #333',
    background: opts.disabled ? '#0d0d0d' : '#111',
    color: opts.disabled ? '#555' : '#fff',
    cursor: opts.disabled ? 'not-allowed' : 'pointer',
    opacity: opts.disabled ? 0.6 : 1,
    zIndex: 1000,
  };
}