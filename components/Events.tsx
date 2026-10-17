"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { wedding } from "@/data/wedding";
import Ornament from "./Ornament";

export default function Events() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="block" aria-labelledby="events-title">
      <div className="wrap">
        <h2 className="h2" id="events-title">
          The celebrations
        </h2>
        <Ornament />
        <p className="lede">
          Join us for as many of the events as you can. All times are local.
        </p>

        <div className="timeline" ref={ref}>
          <div className="rail" aria-hidden="true">
            <motion.span
              className="rail-fill"
              style={{ scaleY: reduce ? 1 : fill }}
            />
          </div>
          <ol className="events">
            {wedding.events.map((e) => (
              <motion.li
                className="event"
                key={`${e.day}-${e.title}`}
                initial={reduce ? false : { opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 80, damping: 16 }}
              >
                <motion.span
                  className="event-dot"
                  style={{ background: e.color }}
                  aria-hidden="true"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.2 }}
                />
                <div className="event-when">
                  <span className="event-day">{e.day}</span>
                  <span className="event-month">{e.month}</span>
                  <span className="event-bar" style={{ background: e.color }} />
                </div>
                <div>
                  <h3 className="event-title">{e.title}</h3>
                  <p className="event-meta">
                    {e.time}, {e.place}
                  </p>
                  <p>{e.note}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
