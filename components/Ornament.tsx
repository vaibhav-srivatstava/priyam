// Small divider: a line, an eight-petal flower, a line. Colour comes from `color`.
export default function Ornament() {
  return (
    <div className="orn" aria-hidden="true">
      <span />
      <svg viewBox="-12 -12 24 24" width="26" height="26">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-6"
            rx="2.4"
            ry="5"
            fill="currentColor"
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle r="2" fill="var(--paper)" />
      </svg>
      <span />
    </div>
  );
}
