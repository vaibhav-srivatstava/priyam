"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";
import Mandala from "./Mandala";
import Toran from "./Toran";
import Petals, { Shower } from "./Petals";

const ease = [0.2, 0.7, 0.1, 1] as const;
const STEP = 0.07;

function Word({
  text,
  start,
  delay,
  reduce,
}: {
  text: string;
  start: boolean;
  delay: number;
  reduce: boolean;
}) {
  return (
    <span className="name-row" aria-label={text}>
      {text.split("").map((char, i) => (
        <span className="mask" key={i} aria-hidden="true">
          <motion.span
            className="char"
            initial={{ y: "115%" }}
            animate={start ? { y: 0 } : { y: "115%" }}
            transition={{
              duration: reduce ? 0.01 : 0.9,
              delay: reduce ? 0 : delay + i * STEP,
              ease,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// The gold arch draws itself from the bottom left, over the top, and down the right.
function Arch({ started, reduce }: { started: boolean; reduce: boolean }) {
  const outer = "M4 796 V330 C4 190 130 100 300 8 C470 100 596 190 596 330 V796";
  const inner = "M26 796 V334 C26 208 140 124 300 40 C460 124 574 208 574 334 V796";
  return (
    <svg
      className="arch"
      viewBox="0 0 600 800"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={outer}
        stroke="#c8962e"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: started ? 1 : 0 }}
        transition={{ duration: reduce ? 0.01 : 2.6, delay: reduce ? 0 : 0.8, ease: "easeInOut" }}
      />
      <motion.path
        d={inner}
        stroke="#f6dfa4"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: started ? 1 : 0 }}
        transition={{ duration: reduce ? 0.01 : 2.6, delay: reduce ? 0 : 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function Hero({ started }: { started: boolean }) {
  const reduce = useReducedMotion() ?? false;
  const [showers, setShowers] = useState(0);

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: started ? 1 : 0 },
    transition: { duration: reduce ? 0.01 : 1, delay: reduce ? 0 : delay },
  });

  const first = wedding.partner1;
  const second = wedding.partner2;
  const t1 = 1.4;
  const tAmp = t1 + first.length * STEP + 0.2;
  const t2 = t1 + first.length * STEP + 0.7;
  const tEnd = t2 + second.length * STEP + 0.9;

  return (
    <section className="hero" aria-labelledby="names">
      <div className="hero-mandala-wrap" aria-hidden="true">
        <motion.div
          className="hero-mandala"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={started ? { opacity: 0.22, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: reduce ? 0.01 : 2.4, delay: reduce ? 0 : 0.4, ease: "easeOut" }}
        >
          <Mandala className="spin" />
        </motion.div>
      </div>

      <Toran started={started} />
      {started && <Petals />}

      <div className="frame">
        <Arch started={started} reduce={reduce} />
        <div className="hero-inner">
          {wedding.greeting && (
            <motion.p className="hero-greeting" {...fade(1)}>
              {wedding.greeting}
            </motion.p>
          )}
          <motion.p className="hero-invite" {...fade(1.2)}>
            {wedding.inviteTop}
          </motion.p>

          <h1 className="names" id="names">
            <Word text={first} start={started} delay={t1} reduce={reduce} />
            <motion.span className="amp" aria-hidden="true" {...fade(tAmp)}>
              &amp;
            </motion.span>
            <Word text={second} start={started} delay={t2} reduce={reduce} />
          </h1>

          <motion.p className="hero-invite-bottom" {...fade(tEnd)}>
            {wedding.inviteBottom}
          </motion.p>
          <motion.p className="hero-date" {...fade(tEnd + 0.3)}>
            {wedding.displayDate}
          </motion.p>
          <motion.p className="hero-place" {...fade(tEnd + 0.5)}>
            {wedding.venue.name}, {wedding.venue.city}
          </motion.p>
        </div>
      </div>

      <motion.button
        type="button"
        className="btn btn-ghost hero-shower"
        onClick={() => setShowers((n) => n + 1)}
        {...fade(tEnd + 0.8)}
      >
        Shower petals
      </motion.button>
      {showers > 0 && <Shower key={showers} />}
    </section>
  );
}
