"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotation: number;
  color: string;
};

const COLORS = ["#f4a300", "#ffc233", "#ff7a1a", "#d2255f", "#f9c6d3"];

function make(count: number, burst: boolean): Petal[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    size: burst ? 12 + Math.random() * 14 : 10 + Math.random() * 12,
    duration: burst ? 3.2 + Math.random() * 3 : 9 + Math.random() * 8,
    delay: burst ? Math.random() * 1.2 : Math.random() * 8,
    drift: (Math.random() - 0.5) * (burst ? 260 : 160),
    rotation: Math.random() * 360,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

function Layer({ items, className }: { items: Petal[]; className: string }) {
  return (
    <div className={className} aria-hidden="true">
      {items.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              background: p.color,
              "--drift": `${p.drift}px`,
              "--rot": `${p.rotation}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

// Ambient petals drifting behind the hero.
export default function Petals() {
  const [items, setItems] = useState<Petal[]>([]);

  // Generated after mount so server and client markup match.
  useEffect(() => {
    setItems(make(22, false));
  }, []);

  return <Layer items={items} className="petals" />;
}

// A one-off burst of petals. Remount it (change its key) to trigger another.
export function Shower() {
  const [items, setItems] = useState<Petal[]>([]);
  const [alive, setAlive] = useState(true);

  useEffect(() => {
    setItems(make(70, true));
    const t = setTimeout(() => setAlive(false), 7500);
    return () => clearTimeout(t);
  }, []);

  if (!alive) return null;
  return <Layer items={items} className="shower" />;
}
