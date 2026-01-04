type Props = {
  onRestart: () => void;
};

export default function GameOverOverlay({ onRestart }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(0,0,0,0.72)',
      }}
    >
      <div
        style={{
          width: 'min(320px, 85%)',
          padding: 20,
          borderRadius: 14,
          border: '1px solid #333',
          background: '#0b0b0b',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
          GAME OVER
        </div>

        <button
          onClick={onRestart}
          style={{
            marginTop: 10,
            width: '100%',
            fontSize: 18,
            padding: '12px 16px',
            borderRadius: 12,
            border: '1px solid #333',
            background: '#111',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}