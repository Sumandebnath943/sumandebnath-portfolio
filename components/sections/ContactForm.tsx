"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { CONTACT_INTENTS } from "@/lib/contact-intents";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 font-manrope text-[15px] text-[#1D1D1F] " +
  "placeholder:text-[#9a9aa2] outline-none transition-colors focus:border-[#1D1D1F]/45 " +
  "focus:ring-4 focus:ring-black/[0.04]";

const LABEL =
  "block font-manrope text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5a5a63] mb-2";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [intent, setIntent] = useState<string>(CONTACT_INTENTS[0]);

  // When the form became interactive. The server rejects anything submitted in
  // under two seconds — no human reads four fields that fast, but a script fills
  // them instantly. Paired with the hidden `company` honeypot below.
  //
  // Stamped in an effect rather than during render: reading the clock while
  // rendering is impure, and mount is the more honest moment anyway.
  const mountedAt = useRef<number | null>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          intent,
          message: data.get("message"),
          company: data.get("company"), // honeypot — always empty for a person
          // A null stamp means the mount effect somehow never ran. Sending the
          // epoch makes elapsed enormous, which passes the timing check —
          // deliberately the forgiving direction, since the cost of wrongly
          // rejecting a real person is far higher than letting one bot through
          // the honeypot.
          elapsedMs: Date.now() - (mountedAt.current ?? 0),
        }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setError(payload?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError(
        "Couldn't reach the server. Check your connection, or email sumandebnath944@gmail.com directly.",
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-black/[0.08] bg-white p-8 text-center"
      >
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#2E8B57]/[0.12]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1f7a4d"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-manrope font-semibold text-xl tracking-tight text-[#1D1D1F] mb-2">
          Message sent.
        </h3>
        <p className="font-manrope text-[14.5px] text-[#5a5a63] leading-relaxed max-w-sm mx-auto">
          It landed on Suman&apos;s phone. He usually replies within a day or two —
          if it&apos;s urgent, the phone number above is faster.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-manrope text-[13px] font-semibold text-[#1D1D1F] underline decoration-black/25 underline-offset-[5px] hover:decoration-black/60"
        >
          Send another
        </button>
      </m.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-black/[0.08] bg-white p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="contact-name">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Priya Sharma"
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
      </div>

      {/* Intent — radio group rather than a <select> so all four options are
          visible at a glance, and so the choice reads as part of the page. */}
      <fieldset className="mt-6">
        <legend className={LABEL}>What&apos;s this about?</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_INTENTS.map((option) => {
            const active = intent === option;
            return (
              <label
                key={option}
                className={`cursor-pointer rounded-full border px-4 py-2 font-manrope text-[13px] transition-colors ${
                  active
                    ? "border-[#1D1D1F] bg-[#1D1D1F] text-white"
                    : "border-black/[0.12] bg-white text-[#4a4a53] hover:border-black/30"
                }`}
              >
                <input
                  type="radio"
                  name="intent"
                  value={option}
                  checked={active}
                  onChange={() => setIntent(option)}
                  className="sr-only"
                />
                {option}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <label className={LABEL} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder="What are you working on, and where might I fit?"
          className={`${FIELD} resize-y min-h-[140px]`}
        />
      </div>

      {/* Honeypot. Hidden from people and from screen readers; a form-filling
          bot sees an ordinary "Company" input and cannot resist it. Positioned
          off-screen rather than display:none, which some bots check for. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-500/25 bg-red-500/[0.06] px-4 py-3 font-manrope text-[13.5px] leading-relaxed text-[#a12626]"
        >
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2.5 rounded-full bg-[#1A1A1A] px-7 py-3 font-manrope text-[13.5px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="font-manrope text-[12.5px] text-[#63636D]">
          Goes straight to Suman — no mailing list, no autoresponder.
        </p>
      </div>
    </form>
  );
}
