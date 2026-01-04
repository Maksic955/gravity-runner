'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Phase = 'MENU' | 'READY' | 'RUNNING' | 'PAUSED' | 'GAME_OVER';

type Rect = { x: number; y: number; w: number; h: number };
type Obstacle = Rect & { id: string; variant: number };
type Coin = Rect & { id: string };

const PLAYER_W = 34;
const PLAYER_H = 34;

const BASE_SPEED = 180;      
const MAX_SPEED = 450;      
const SPEED_INCREASE = 15; 

const GRAVITY = 1800;
const FLIP_IMPULSE = 950;

export function useGame() {
  const [phase, setPhase] = useState<Phase>('MENU');

  const [stageSize, setStageSize] = useState(() => ({
    w: typeof window === 'undefined' ? 0 : window.innerWidth,
    h: typeof window === 'undefined' ? 0 : window.innerHeight,
  }));

  const [player, setPlayer] = useState<Rect>(() => ({
    x: 40,
    y: 0,
    w: PLAYER_W,
    h: PLAYER_H,
  }));

  const [obstacles, setObstacles] = useState<Obstacle[]>(() => []);
  const [coins, setCoins] = useState<Coin[]>(() => []);
  const [distance, setDistance] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const playerRef = useRef<Rect>(player);
  const obstaclesRef = useRef<Obstacle[]>(obstacles);
  const coinsRef = useRef<Coin[]>(coins);
  const distanceRef = useRef(0);
  const coinsCollectedRef = useRef(0);
  const currentSpeedRef = useRef(BASE_SPEED);

  const vyRef = useRef(0);
  const dirRef = useRef<1 | -1>(1);
  const lastTRef = useRef<number | null>(null);

  const margin = 0;
  const ceilY = margin;
  const floorY = Math.max(ceilY, stageSize.h - PLAYER_H - margin);

  useEffect(() => {
    const onResize = () => setStageSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  const seedObstacles = useCallback((): Obstacle[] => {
    const stageW = stageSize.w || 800;
    const result: Obstacle[] = [];
    
    // generate 8 initial obstacles
    for (let i = 0; i < 8; i++) {
      const x = stageW * 0.4 + i * 200 + Math.random() * 100;
      const type = Math.random();
      let y: number;
      
      if (type < 0.35) y = floorY;
      else if (type < 0.7) y = ceilY;
      else y = ceilY + 60 + Math.random() * (Math.max(floorY - ceilY - 120, 50));
      
      const obstW = 80 + Math.random() * 80;
      const obstH = 20 + Math.random() * 25;
      result.push(makeObstacle(`o${i}`, x, y, obstW, obstH));
    }
    
    return result;
  }, [stageSize.w, floorY, ceilY]);

  const seedCoins = useCallback((): Coin[] => {
    const stageW = stageSize.w || 800;
    const result: Coin[] = [];
    
    // generate 5 initial coins
    for (let i = 0; i < 5; i++) {
      const x = stageW * 0.5 + i * 300 + Math.random() * 150;
      const type = Math.random();
      let y: number;
      
      if (type < 0.33) y = floorY + 5;
      else if (type < 0.66) y = ceilY + 5;
      else y = (ceilY + floorY) / 2;
      
      result.push(makeCoin(`c${i}`, x, y));
    }
    
    return result;
  }, [stageSize.w, floorY, ceilY]);

  const resetWorld = useCallback(() => {
    lastTRef.current = null;
    vyRef.current = 0;
    dirRef.current = 1;
    distanceRef.current = 0;
    coinsCollectedRef.current = 0;
    currentSpeedRef.current = BASE_SPEED;

    const nextPlayer: Rect = { x: 40, y: floorY, w: PLAYER_W, h: PLAYER_H };
    const nextObstacles = seedObstacles();
    const nextCoins = seedCoins();

    playerRef.current = nextPlayer;
    obstaclesRef.current = nextObstacles;
    coinsRef.current = nextCoins;

    setPlayer(nextPlayer);
    setObstacles(nextObstacles);
    setCoins(nextCoins);
    setDistance(0);
    setCoinsCollected(0);
    setDirection(1);
  }, [floorY, seedObstacles, seedCoins]);

  const start = useCallback(() => {
    resetWorld();
    setPhase('READY');
  }, [resetWorld]);

  const restart = useCallback(() => {
    resetWorld();
    setPhase('READY');
  }, [resetWorld]);

  const togglePause = useCallback(() => {
    setPhase((p) => (p === 'PAUSED' ? 'RUNNING' : 'PAUSED'));
    lastTRef.current = null;
  }, []);

  const onSpace = useCallback(() => {
    if (phase === 'READY') {
      const nextX = Math.max(120, Math.floor(stageSize.w * 0.15));
      const nextPlayer = { ...playerRef.current, x: nextX };

      playerRef.current = nextPlayer;
      setPlayer(nextPlayer);

      dirRef.current = -1;
      vyRef.current = -FLIP_IMPULSE;
      setDirection(-1);

      setPhase('RUNNING');
    } else if (phase === 'RUNNING') {
      dirRef.current = dirRef.current === 1 ? -1 : 1;
      vyRef.current = dirRef.current === 1 ? FLIP_IMPULSE : -FLIP_IMPULSE;
      setDirection(dirRef.current);
    }
  }, [phase, stageSize.w]);

  useEffect(() => {
    if (phase !== 'READY' && phase !== 'RUNNING') return;

    setPlayer((pl) => {
      const mid = (ceilY + floorY) / 2;
      const y = pl.y <= mid ? ceilY : floorY;
      const next = { ...pl, y };
      playerRef.current = next;
      return next;
    });
  }, [ceilY, floorY, phase]);

  useEffect(() => {
    let raf = 0;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);

      if (phase !== 'RUNNING') return;

      if (lastTRef.current == null) {
        lastTRef.current = t;
        return;
      }

      const dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;

      // calculate speed based on distance
      const speedBoost = Math.floor(distanceRef.current / 1000) * SPEED_INCREASE;
      currentSpeedRef.current = Math.min(BASE_SPEED + speedBoost, MAX_SPEED);

      // distance tracking
      {
        distanceRef.current += currentSpeedRef.current * dt;
        setDistance(Math.floor(distanceRef.current / 10));
      }

      // Player integrate
      {
        const pl = playerRef.current;
        const g = GRAVITY * dirRef.current;

        let vy = vyRef.current + g * dt;
        let y = pl.y + vy * dt;

        if (y <= ceilY) {
          y = ceilY;
          vy = 0;
        } else if (y >= floorY) {
          y = floorY;
          vy = 0;
        }

        vyRef.current = vy;

        const next = { ...pl, y };
        playerRef.current = next;
        setPlayer(next);
      }

      // obstacles move + recycle
      {
        const moved = obstaclesRef.current.map((o) => ({
          ...o,
          x: o.x - currentSpeedRef.current * dt,
        }));

        const next = recycleObstacles(moved, stageSize.w || 800, stageSize.h || 600, ceilY, floorY);
        obstaclesRef.current = next;
        setObstacles(next);
      }

      // coins move + recycle
      {
        const moved = coinsRef.current.map((c) => ({
          ...c,
          x: c.x - currentSpeedRef.current * dt,
        }));

        const next = recycleCoins(moved, stageSize.w || 800, stageSize.h || 600, ceilY, floorY);
        coinsRef.current = next;
        setCoins(next);
      }

      // coin collection
      {
        const pl = playerRef.current;
        const collected: string[] = [];
        
        for (const c of coinsRef.current) {
          if (aabb(pl, c)) {
            collected.push(c.id);
            coinsCollectedRef.current++;
            setCoinsCollected(coinsCollectedRef.current);
          }
        }
        
        if (collected.length > 0) {
          const filtered = coinsRef.current.filter(c => !collected.includes(c.id));
          coinsRef.current = filtered;
          setCoins(filtered);
        }
      }

      // collisions
      {
        const pl = playerRef.current;
        for (const o of obstaclesRef.current) {
          if (aabb(pl, o)) {
            setPhase('GAME_OVER');
            lastTRef.current = null;
            return;
          }
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, stageSize.w, stageSize.h, ceilY, floorY]);

  return useMemo(
    () => ({
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
      direction,
    }),
    [phase, start, restart, togglePause, onSpace, player, obstacles, coins, distance, coinsCollected, direction]
  );
}

function aabb(a: Rect, b: Rect) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function makeObstacle(id: string, x: number, y: number, w: number, h: number): Obstacle {
  return { id, x, y, w, h, variant: Math.floor(Math.random() * 4) };
}

function makeCoin(id: string, x: number, y: number): Coin {
  return { id, x, y, w: 17, h: 17 };
}

function recycleObstacles(
  obstacles: Obstacle[],
  stageW: number,
  stageH: number,
  ceilY: number,
  floorY: number
) {
  const rightEdge = stageW + 100;

  return obstacles.map((o) => {
    if (o.x + o.w > -60) return o;

    const type = Math.random();
    
    let laneY: number;
    if (type < 0.35) {
      laneY = floorY;
    } else if (type < 0.7) {
      laneY = ceilY;
    } else {
      const minY = ceilY + 60;
      const maxY = Math.max(floorY - 60, minY + 50);
      laneY = minY + Math.random() * (maxY - minY);
    }

    const w = 70 + Math.floor(Math.random() * 90);
    const h = 18 + Math.floor(Math.random() * 28);
    const x = rightEdge + Math.floor(Math.random() * 200);

    return { ...o, x, y: laneY, w, h, variant: Math.floor(Math.random() * 4) };
  });
}

function recycleCoins(
  coins: Coin[],
  stageW: number,
  stageH: number,
  ceilY: number,
  floorY: number
) {
  const rightEdge = stageW + 100;

  return coins.map((c) => {
    if (c.x + c.w > -30) return c;

    const type = Math.random();
    let laneY: number;
    
    if (type < 0.33) laneY = floorY + 5;
    else if (type < 0.66) laneY = ceilY + 5;
    else laneY = (ceilY + floorY) / 2 - 8; 

    const x = rightEdge + 150 + Math.floor(Math.random() * 300);

    return { ...c, x, y: laneY };
  });
}