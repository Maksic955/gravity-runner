'use client';

import { useRef } from 'react';
import { useGame } from '@/hooks/useGame';
import styles from './GameView.module.css';
import StartOverlay from '@/components/Game/StartOverlay';
import GameOverOverlay from '@/components/Game/GameOverlay';
import Hud from '@/components/Game/Hud';
import PlayerBlock from '@/components/Game/PlayerBlock';
import ObstacleBlock from '@/components/Game/ObstacleBlock';
import CoinBlock from '@/components/Game/CoinBlock';
import Background from '@/components/Game/Background';

export default function GameView() {
  const { 
    phase, 
    start, 
    restart, 
    togglePause, 
    onSpace, 
    player, 
    obstacles, 
    coins,
    distance, 
    coinsCollected,
    direction 
  } = useGame();

  const stageRef = useRef<HTMLDivElement | null>(null);

  const handleStart = () => {
    start();
    requestAnimationFrame(() => stageRef.current?.focus());
  };

  const speedFactor = Math.min(distance / 1000, 1);

  return (
    <div className={styles.screen}>
      <div
        className={styles.stage}
        ref={stageRef}
        tabIndex={0}
        onPointerDown={() => stageRef.current?.focus()}
        onKeyDown={(e) => {
          if (e.code === 'Space') {
            e.preventDefault();
            onSpace();
          }
        }}
      >
        {/* Animowane tło */}
        <Background speed={speedFactor} />

        {phase !== 'MENU' && (
          <Hud 
            phase={phase} 
            distance={distance} 
            coinsCollected={coinsCollected}
            onTogglePause={togglePause} 
          />
        )}

        {phase !== 'MENU' && (
          <PlayerBlock 
            x={player.x} 
            y={player.y} 
            w={player.w} 
            h={player.h}
            direction={direction}
          />
        )}

        {phase !== 'MENU' &&
          obstacles.map((o) => (
            <ObstacleBlock 
              key={o.id} 
              x={o.x} 
              y={o.y} 
              w={o.w} 
              h={o.h}
              variant={o.variant}
            />
          ))}

        {phase !== 'MENU' &&
          coins.map((c) => (
            <CoinBlock 
              key={c.id} 
              x={c.x} 
              y={c.y} 
              w={c.w} 
              h={c.h}
            />
          ))}

        {phase === 'MENU' && <StartOverlay onStart={handleStart} />}

        {phase === 'GAME_OVER' && <GameOverOverlay onRestart={restart} />}
      </div>
    </div>
  );
}