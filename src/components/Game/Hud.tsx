type Phase = 'MENU' | 'READY' | 'RUNNING' | 'PAUSED' | 'GAME_OVER';

type Props = {
  phase: Phase;
  distance: number;
  coinsCollected: number;
  onTogglePause: () => void;
};

export default function Hud({ phase, distance, coinsCollected, onTogglePause }: Props) {
  const isPaused = phase === 'PAUSED';
  const canPause = phase === 'RUNNING';
  const canPlay = isPaused;

  return (
    <>
      {/* Górny pasek (center) */}
      <div style={topBarStyle}>
        <div style={pillStyle}>
          <span style={labelStyle}>DIST</span>
          <span style={valueStyle}>{distance}m</span>
        </div>

        <div style={pillStyle}>
          <span style={{ ...labelStyle, color: 'rgba(255,215,0,0.95)' }}>COIN</span>
          <span style={{ ...valueStyle, color: '#ffd700' }}>{coinsCollected}</span>
        </div>
      </div>

      {/* Lewy-górny: Play */}
      <button
        aria-label="Play"
        onClick={() => canPlay && onTogglePause()}
        style={circleBtnStyle({ top: 16, left: 16, disabled: !canPlay })}
      >
        ▶
      </button>

      {/* Prawy-górny: Pause */}
      <button
        aria-label="Pause"
        onClick={() => canPause && onTogglePause()}
        style={circleBtnStyle({ top: 16, right: 16, disabled: !canPause })}
      >
        ❚❚
      </button>

      <style jsx>{`
        button:hover {
          transform: translateY(-1px);
          filter: brightness(1.08);
        }
        button:active {
          transform: translateY(0px) scale(0.98);
        }
      `}</style>
    </>
  );
}

const topBarStyle: React.CSSProperties = {
  position: 'absolute',
  top: 16,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  zIndex: 1000,
  padding: '6px 8px',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'rgba(10,10,20,0.45)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
};

const pillStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
  padding: '8px 14px',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(0,0,0,0.25)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.18em',
  opacity: 0.85,
  color: 'rgba(255,255,255,0.75)',
  fontWeight: 800,
};

const valueStyle: React.CSSProperties = {
  fontSize: 18,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontWeight: 800,
  color: '#fff',
  letterSpacing: '0.02em',
};

function circleBtnStyle(opts: {
  top: number;
  left?: number;
  right?: number;
  disabled?: boolean;
}): React.CSSProperties {
  const disabled = !!opts.disabled;

  return {
    position: 'absolute',
    top: opts.top,
    left: opts.left,
    right: opts.right,
    width: 44,
    height: 44,
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.12)',
    background: disabled ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.45)',
    color: disabled ? 'rgba(255,255,255,0.35)' : '#fff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 26px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
    transition: 'transform 0.12s ease, filter 0.12s ease, opacity 0.12s ease',
    userSelect: 'none',
  };
}
