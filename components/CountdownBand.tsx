"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";
import Ornament from "./Ornament";

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Digits({ value, reduce }: { value: string; reduce: boolean }) {
  return (
    <span className="digits" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="digit-inner"
          initial={{ y: reduce ? 0 : "100%" }}
          animate={{ y: 0 }}
          exit={{ y: reduce ? 0 : "-100%", opacity: reduce ? 0 : 1 }}
          transition={{ duration: reduce ? 0.01 : 0.35, ease: "easeOut" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function CountdownBand() {
  const reduce = useReducedMotion() ?? false;
  const target = useMemo(() => new Date(wedding.date).getTime(), []);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const over = now !== null && target - now <= 0;
  const t = now === null ? null : split(target - now);
  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { label: "Days", value: t ? pad(t.days) : "--" },
    { label: "Hours", value: t ? pad(t.hours) : "--" },
    { label: "Minutes", value: t ? pad(t.minutes) : "--" },
    { label: "Seconds", value: t ? pad(t.seconds) : "--" },
  ];

  return (
    <section className="band block" aria-labelledby="countdown-title">
      <div className="wrap">
        <h2 className="h2" id="countdown-title">
          {over ? "The celebration has begun" : "Counting down to the day"}
        </h2>
        <Ornament />
        {!over && (
          <div
            className="count"
            role="timer"
            aria-label={
              t
                ? `${t.days} days, ${t.hours} hours and ${t.minutes} minutes to go`
                : "Countdown"
            }
          >
            {units.map((u) => (
              <div className="unit" key={u.label}>
                <Digits value={u.value} reduce={reduce} />
                <span className="unit-label">{u.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
