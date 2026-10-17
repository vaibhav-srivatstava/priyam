"use client";

import { motion, useReducedMotion } from "framer-motion";

// A hanging marigold toran: a rail of flowers with swaying strands and mango leaves.
const WIDTH = 1200;
const STRAND_COUNT = 24;

const strands = Array.from({ length: STRAND_COUNT }, (_, i) => ({
  i,
  x: Math.round(25 + (i * (WIDTH - 50)) / (STRAND_COUNT - 1)),
  len: Math.round(
    56 + 104 * Math.abs(Math.sin((i / (STRAND_COUNT - 1)) * Math.PI * 3)),
  ),
}));

const rail = Array.from({ length: 60 }, (_, i) => 10 + i * 20);

export default function Toran({ started }: { started: boolean }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="toran"
      aria-hidden="true"
      initial={{ y: -280 }}
      animate={{ y: started ? 0 : -280 }}
      transition={
        reduce
          ? { duration: 0.01 }
          : { type: "spring", stiffness: 55, damping: 9, delay: 0.3 }
      }
    >
      <svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMin slice">
        <line x1="0" y1="8" x2="1200" y2="8" stroke="#c8962e" strokeWidth="2" />
        {rail.map((cx, i) => (
          <g key={cx}>
            <circle cx={cx} cy={8} r={8} fill={i % 2 ? "#d2255f" : "#f4a300"} />
            <circle cx={cx} cy={8} r={3.5} fill={i % 2 ? "#f6dfa4" : "#c2410c"} />
          </g>
        ))}
        {strands.map(({ i, x, len }) => (
          <g key={x} transform={`translate(${x} 8)`}>
            <g
              className="strand"
              style={{
                animationDelay: `${(-(i % 7) * 0.55).toFixed(2)}s`,
                animationDuration: `${(3.2 + (i % 5) * 0.35).toFixed(2)}s`,
              }}
            >
              <line x1="0" y1="0" x2="0" y2={len} stroke="#c8962e" strokeWidth="1.2" />
              {Array.from({ length: Math.floor(len / 15) }, (_, k) => {
                const y = 16 + k * 15;
                return (
                  <g key={k}>
                    <circle cx={0} cy={y} r={7} fill={k % 2 ? "#ffb81c" : "#f4a300"} />
                    <circle cx={0} cy={y} r={2.8} fill="#c2410c" />
                  </g>
                );
              })}
              <path
                d={`M0 ${len} c-9 8 -9 22 0 34 c9 -12 9 -26 0 -34z`}
                fill="#2f7a4a"
              />
            </g>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
