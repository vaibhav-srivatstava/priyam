export default function Diya({ delay = 0 }: { delay?: number }) {
  const d = `${-delay}s`;
  return (
    <svg className="diya" viewBox="0 0 64 64" aria-hidden="true">
      <circle
        className="diya-glow"
        cx="32"
        cy="22"
        r="20"
        fill="#f4a300"
        style={{ filter: "blur(7px)", animationDelay: d }}
      />
      <g className="flame" style={{ animationDelay: d }}>
        <path d="M32 4c6 8 9 13 9 19a9 9 0 0 1-18 0c0-6 3-11 9-19z" fill="#ffb81c" />
        <path d="M32 15c3 4 4.5 7 4.5 10a4.5 4.5 0 0 1-9 0c0-3 1.5-6 4.5-10z" fill="#fff3c4" />
      </g>
      <path d="M6 36h52c0 14-11 22-26 22S6 50 6 36z" fill="#c8962e" />
      <path d="M6 36h52" stroke="#f6dfa4" strokeWidth="2" />
    </svg>
  );
}
