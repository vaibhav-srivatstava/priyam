const RINGS = [
  { n: 8, r: 28, rx: 9, ry: 26 },
  { n: 12, r: 62, rx: 10, ry: 30 },
  { n: 16, r: 98, rx: 9, ry: 28 },
  { n: 24, r: 138, rx: 7, ry: 24 },
  { n: 32, r: 176, rx: 5, ry: 18 },
];

// Concentric rings of petals. Colour comes from the parent's `color`.
export default function Mandala({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-200 -200 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      {RINGS.map(({ n, r, rx, ry }) => (
        <g key={r}>
          {Array.from({ length: n }, (_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy={-r}
              rx={rx}
              ry={ry}
              transform={`rotate(${Math.round((i * 360 * 100) / n) / 100})`}
            />
          ))}
        </g>
      ))}
      <circle r="196" />
      <circle r="188" strokeDasharray="2 6" />
      <circle r="12" />
    </svg>
  );
}
