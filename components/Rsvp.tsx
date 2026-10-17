"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/data/wedding";
import Ornament from "./Ornament";

type Status = "idle" | "sending" | "sent";

const GENERIC_ERROR =
  "We couldn't send your RSVP. Check your connection and try again.";

export default function Rsvp() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ name: string; attending: "yes" | "no" } | null>(
    null,
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      attending: String(data.get("attending") ?? ""),
      guests: Number(data.get("guests") ?? 1),
      message: String(data.get("message") ?? ""),
    };

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setError(json.error ?? GENERIC_ERROR);
        setStatus("idle");
        return;
      }
      setSent({
        name: payload.name.trim(),
        attending: payload.attending as "yes" | "no",
      });
      setStatus("sent");
    } catch {
      setError(GENERIC_ERROR);
      setStatus("idle");
    }
  }

  return (
    <section className="rsvp block" aria-labelledby="rsvp-title">
      <div className="wrap">
        <h2 className="h2" id="rsvp-title">
          Will you join us?
        </h2>
        <Ornament />
        <p className="lede">Please reply by {wedding.rsvpBy}.</p>

        <div className="card">
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" && sent ? (
              <motion.div
                key="sent"
                className="sent"
                role="status"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduce ? 0.01 : 0.4 }}
              >
                <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
                  <motion.circle
                    cx="36"
                    cy="36"
                    r="33"
                    stroke="#c8962e"
                    strokeWidth="2"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: reduce ? 0.01 : 0.7 }}
                  />
                  <motion.path
                    d="M22 37l10 10 18-21"
                    stroke="#5e0f26"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: reduce ? 0.01 : 0.5, delay: reduce ? 0 : 0.6 }}
                  />
                </svg>
                <p className="sent-title">RSVP sent</p>
                <p>
                  {sent.attending === "yes"
                    ? `Thank you, ${sent.name}. We'll see you on ${wedding.displayDate}.`
                    : `Thank you for letting us know, ${sent.name}. We'll miss you.`}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="form"
                onSubmit={onSubmit}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.01 : 0.2 }}
              >
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input
                    className="input"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                </div>

                <fieldset className="field">
                  <legend>Can you come?</legend>
                  <div className="choices">
                    <label className="choice">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        required
                        checked={attending === "yes"}
                        onChange={() => setAttending("yes")}
                      />
                      Yes, I&apos;ll be there
                    </label>
                    <label className="choice">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={attending === "no"}
                        onChange={() => setAttending("no")}
                      />
                      No, I can&apos;t make it
                    </label>
                  </div>
                </fieldset>

                {attending === "yes" && (
                  <div className="field">
                    <label htmlFor="guests">Number of guests, including you</label>
                    <select className="input" id="guests" name="guests" defaultValue="1">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="field">
                  <label htmlFor="message">A message for the couple (optional)</label>
                  <textarea
                    className="input"
                    id="message"
                    name="message"
                    rows={3}
                    maxLength={500}
                  />
                </div>

                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}

                <div className="form-actions">
                  <button className="btn" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send RSVP"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
