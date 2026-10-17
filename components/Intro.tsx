"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";
import Mandala from "./Mandala";

type Phase = "closed" | "opening" | "done";

export default function Intro({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const reduce = useReducedMotion();

  // Keep the page from scrolling behind the doors until they open.
  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  const opening = phase === "opening";
  const duration = reduce ? 0.01 : 1.8;
  const ease = [0.7, 0, 0.2, 1] as const;

  function open() {
    if (phase !== "closed") return;
    setPhase("opening");
    onOpen();
  }

  return (
    <div className="intro" role="dialog" aria-label="Wedding invitation">
      <motion.div
        className="door door-left"
        animate={{ x: opening ? "-101%" : 0 }}
        transition={{ duration, ease }}
        onAnimationComplete={() => opening && setPhase("done")}
      />
      <motion.div
        className="door door-right"
        animate={{ x: opening ? "101%" : 0 }}
        transition={{ duration, ease }}
      />
      <motion.div
        className="intro-center"
        animate={opening ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0.01 : 0.7, ease: "easeIn" }}
      >
        {wedding.greeting && <p className="intro-greeting">{wedding.greeting}</p>}
        <motion.button
          type="button"
          className="seal"
          onClick={open}
          whileHover={reduce || opening ? undefined : { scale: 1.05 }}
          whileTap={reduce || opening ? undefined : { scale: 0.97 }}
        >
          <Mandala className="seal-mandala spin-fast" />
          <span className="seal-core">
            <span className="seal-initials">
              {wedding.partner1[0]} &amp; {wedding.partner2[0]}
            </span>
            <span className="seal-hint">Open invitation</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
