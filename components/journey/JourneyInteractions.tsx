"use client";

/**
 * The gestures that move the story forward.
 *
 * One rule governs the whole set: the visitor must *act*, but they can never be
 * wrong. There are no quizzes and no fail states — every gesture is a way of
 * spending a moment inside the beat rather than reading past it. Where a choice
 * looks like a choice (`Choose`), both answers are accepted and the story says
 * so, because the point of that chapter is that the sensible option is not the
 * one he took.
 *
 * Accessibility is not a layer on top here, it is the reason several of these
 * are shaped the way they are:
 *   · `Travel` is a native range input, so arrow keys work for free.
 *   · Everything else is a real <button>, reachable by Tab and fired by Enter.
 *   · `Hold` accepts pointer, touch and a held key, and offers a one-press
 *     escape hatch, because "press and hold for three seconds" is a barrier for
 *     anyone with a motor impairment.
 *   · Reduced motion is respected by the CSS; nothing here animates on its own.
 */

import { useCallback, useEffect, useRef, useState } from "react";

type Props = { onDone: () => void; done: boolean };

const fmt = (n: number) => n.toLocaleString("en-IN");

/* ── A press-and-hold that is never the only way through ─────────────────── */

function useHold(durationMs: number, onComplete: () => void, active: boolean) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  const startedAt = useRef(0);
  const holding = useRef(false);
  // Mirrors `progress` so the loop can resume from it without `start` having to
  // depend on it — a dependency there would rebuild the handler on every frame.
  const progressRef = useRef(0);
  // Kept current in an effect rather than during render: the frame loop needs
  // the latest callback, but writing a ref while rendering is not allowed.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const stop = useCallback(() => {
    holding.current = false;
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  const start = useCallback(() => {
    if (!active || holding.current) return;
    holding.current = true;
    // Resume from where the last hold left off, so letting go by accident is not
    // a punishment that sends you back to zero.
    startedAt.current = Date.now() - progressRef.current * durationMs;

    // Declared inside `start` so the frame loop can recurse on itself. As a
    // useCallback it could only reach its own previous identity, which is both a
    // stale closure and something the hooks lint refuses outright.
    const step = () => {
      if (!holding.current) return;
      const p = Math.min(1, (Date.now() - startedAt.current) / durationMs);
      progressRef.current = p;
      setProgress(p);
      if (p >= 1) {
        stop();
        onCompleteRef.current();
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [active, durationMs, stop]);

  const settle = useCallback((p: number) => {
    progressRef.current = p;
    setProgress(p);
  }, []);

  useEffect(() => stop, [stop]);

  return { progress, start, stop, settle };
}

function Hold({
  label,
  duration,
  onDone,
  done,
  render,
}: Props & { label: string; duration: number; render: (p: number) => React.ReactNode }) {
  const complete = useCallback(() => onDone(), [onDone]);
  const { progress, start, stop, settle } = useHold(duration, complete, !done);
  const p = done ? 1 : progress;

  return (
    <div className="jx-hold">
      <div className="jx-hold-readout">{render(p)}</div>
      <button
        type="button"
        className="jx-btn jx-btn-hold"
        disabled={done}
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            start();
          }
        }}
        onKeyUp={stop}
        onBlur={stop}
      >
        <span className="jx-hold-fill" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
        <span className="jx-btn-label">{done ? "done" : label}</span>
      </button>
      {!done && (
        <button
          type="button"
          className="jx-skip"
          onClick={() => {
            settle(1);
            onDone();
          }}
        >
          or skip the hold
        </button>
      )}
    </div>
  );
}

/* ── 00 · Begin ──────────────────────────────────────────────────────────── */

export function Begin({ onDone, done, cue }: Props & { cue: string }) {
  return (
    <button type="button" className="jx-btn jx-btn-solid" onClick={onDone} disabled={done}>
      {cue}
    </button>
  );
}

/* ── 01 · The sentence he could not make ─────────────────────────────────── */

const WORDS = ["I", "could", "not", "speak", "one", "correct", "sentence"];

export function Assemble({ onDone, done }: Props) {
  const [placed, setPlaced] = useState<number[]>([]);
  const all = done || placed.length === WORDS.length;

  useEffect(() => {
    if (placed.length === WORDS.length && !done) onDone();
  }, [placed.length, done, onDone]);

  return (
    <div className="jx-assemble">
      <p className="jx-line" aria-live="polite">
        {WORDS.map((w, i) => (
          <span key={w} className={`jx-word ${all || placed.includes(i) ? "is-set" : ""}`}>
            {w}
          </span>
        ))}
        <span className={`jx-word jx-word-end ${all ? "is-set" : ""}`}>.</span>
      </p>
      {!all && (
        <div className="jx-chips">
          {WORDS.map((w, i) =>
            placed.includes(i) ? null : (
              <button
                key={w}
                type="button"
                className="jx-chip"
                onClick={() => setPlaced((p) => [...p, i])}
              >
                {w}
              </button>
            ),
          )}
        </div>
      )}
      {all && <p className="jx-aside">Two years later: a star mark in English.</p>}
    </div>
  );
}

/* ── 02 · Two doors, and it does not matter which ────────────────────────── */

export function Choose({ onDone, done }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const show = done || picked !== null;

  return (
    <div className="jx-choose">
      {!show ? (
        <div className="jx-doors">
          <button type="button" className="jx-door" onClick={() => setPicked("english")}>
            <span className="jx-door-k">English</span>
            <span className="jx-door-v">the subject he was suddenly good at</span>
          </button>
          <button type="button" className="jx-door" onClick={() => setPicked("commerce")}>
            <span className="jx-door-k">Commerce</span>
            <span className="jx-door-v">what everyone around him was doing</span>
          </button>
        </div>
      ) : (
        <div className="jx-verdict">
          <p>
            {picked === "commerce"
              ? "You picked commerce. So did I — for the same reason, which is no reason at all."
              : "You picked English. So would I, now. I picked commerce."}
          </p>
          {!done && (
            <button type="button" className="jx-btn jx-btn-solid" onClick={onDone}>
              Go through it anyway
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── 03 · Count the days he attended ─────────────────────────────────────── */

const TERM_DAYS = 72;
const ATTENDED = 7;

export function Attend({ onDone, done }: Props) {
  const [marked, setMarked] = useState<number[]>([]);
  const spent = done || marked.length >= ATTENDED;

  useEffect(() => {
    if (marked.length >= ATTENDED && !done) onDone();
  }, [marked.length, done, onDone]);

  return (
    <div className="jx-attend">
      <p className="jx-counter" aria-live="polite">
        <strong>{done ? ATTENDED : marked.length}</strong>
        <span>of {TERM_DAYS} days marked</span>
      </p>
      <div className="jx-grid" role="group" aria-label="Days of the term">
        {Array.from({ length: TERM_DAYS }, (_, i) => {
          const on = done ? i < ATTENDED : marked.includes(i);
          return (
            <button
              key={i}
              type="button"
              className={`jx-day ${on ? "is-on" : ""} ${spent && !on ? "is-spent" : ""}`}
              disabled={spent}
              aria-label={`Day ${i + 1}`}
              onClick={() => setMarked((m) => (m.includes(i) ? m : [...m, i]))}
            />
          );
        })}
      </div>
      {spent && (
        <p className="jx-aside">
          That is about how many. The rest of those days I was at home on a dial-up connection,
          learning something nobody had assigned.
        </p>
      )}
    </div>
  );
}

/* ── 04 · Grow the page ──────────────────────────────────────────────────── */

const PEAK = 82000;

export function Grow(props: Props) {
  return (
    <Hold
      {...props}
      label="hold to grow"
      duration={3200}
      render={(p) => (
        <>
          <span className="jx-big" aria-live="polite">
            {fmt(Math.round(PEAK * p))}
          </span>
          <span className="jx-big-l">followers</span>
        </>
      )}
    />
  );
}

/* ── 05 · Unlock what he taught himself ──────────────────────────────────── */

const TOOLS = [
  "SEO",
  "Google Ads",
  "Analytics",
  "Photoshop",
  "Premiere Pro",
  "After Effects",
  "Lightroom",
  "Web build",
];

export function Unlock({ onDone, done }: Props) {
  const [open, setOpen] = useState<string[]>([]);
  const all = done || open.length === TOOLS.length;

  useEffect(() => {
    if (open.length === TOOLS.length && !done) onDone();
  }, [open.length, done, onDone]);

  return (
    <div className="jx-unlock">
      <div className="jx-tools">
        {TOOLS.map((t) => {
          const on = done || open.includes(t);
          return (
            <button
              key={t}
              type="button"
              className={`jx-tool ${on ? "is-on" : ""}`}
              disabled={on}
              onClick={() => setOpen((o) => [...o, t])}
            >
              {on ? t : "?"}
            </button>
          );
        })}
      </div>
      <p className="jx-aside" aria-live="polite">
        {all ? "None of it assigned. None of it examined." : "Tap each one to see what it was."}
      </p>
    </div>
  );
}

/* ── 06 · Kolkata → Pune ─────────────────────────────────────────────────── */

export function Travel({ onDone, done }: Props) {
  const [v, setV] = useState(done ? 100 : 0);
  useEffect(() => {
    if (v >= 100 && !done) onDone();
  }, [v, done, onDone]);

  return (
    <div className="jx-travel">
      <div className="jx-rail">
        <span className="jx-rail-a">Kolkata</span>
        <span className="jx-rail-b">Pune</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={done ? 100 : v}
        disabled={done}
        aria-label="Travel from Kolkata to Pune"
        className="jx-range"
        onChange={(e) => setV(Number(e.target.value))}
      />
      <p className="jx-aside">{v >= 100 || done ? "1,800 km. Nobody he knew." : "Drag all the way across."}</p>
    </div>
  );
}

/* ── 07 · Uncover the mark ───────────────────────────────────────────────── */

export function Reveal(props: Props) {
  return (
    <Hold
      {...props}
      label="hold to uncover"
      duration={1600}
      render={(p) => (
        <span className="jx-reveal-note">{p >= 1 ? "Artificially Real. 2016." : "Nine years in a folder."}</span>
      )}
    />
  );
}

/* ── 08 · Close the door yourself ────────────────────────────────────────── */

export function Shut({ onDone, done }: Props) {
  const [shut, setShut] = useState(false);
  const closed = done || shut;
  return (
    <div className="jx-shut">
      <button
        type="button"
        className={`jx-doorway ${closed ? "is-shut" : ""}`}
        disabled={closed}
        onClick={() => {
          setShut(true);
          onDone();
        }}
      >
        <span className="jx-doorway-panel" aria-hidden="true" />
        <span className="jx-btn-label">{closed ? "closed" : "close it"}</span>
      </button>
      {closed && <p className="jx-aside">No lesson in it. He just did not get through.</p>}
    </div>
  );
}

/* ── 09 · Open the work ──────────────────────────────────────────────────── */

export function Open({ onDone, done }: Props) {
  return (
    <button
      type="button"
      className="jx-btn jx-btn-solid"
      onClick={onDone}
      disabled={done}
    >
      {done ? "he saw it" : "Put the work on the table"}
    </button>
  );
}

/* ── 10 · One more responsibility ────────────────────────────────────────── */

const LOADS = [
  "Design",
  "+ Brochures",
  "+ Social creatives",
  "+ Logos",
  "+ Video",
  "+ Digital marketing",
  "+ SEO",
  "+ Taking interviews",
];

export function Pile({ onDone, done }: Props) {
  const [n, setN] = useState(done ? LOADS.length : 1);
  const full = done || n >= LOADS.length;

  useEffect(() => {
    if (n >= LOADS.length && !done) onDone();
  }, [n, done, onDone]);

  return (
    <div className="jx-pile">
      <ul className="jx-stack" aria-live="polite">
        {LOADS.slice(0, done ? LOADS.length : n).map((l) => (
          <li key={l} className="jx-load">
            {l}
          </li>
        ))}
      </ul>
      {!full ? (
        <button type="button" className="jx-btn" onClick={() => setN((x) => x + 1)}>
          Take on one more thing
        </button>
      ) : (
        <p className="jx-aside">He was twenty-three, and taking the interviews.</p>
      )}
    </div>
  );
}

/* ── 11 · Wait it out ────────────────────────────────────────────────────── */

const MONTHS = ["October", "November", "December", "January", "February"];

export function Wait(props: Props) {
  return (
    <Hold
      {...props}
      label="hold to wait"
      duration={4000}
      render={(p) => {
        const i = Math.min(MONTHS.length - 1, Math.floor(p * MONTHS.length));
        return (
          <>
            <span className="jx-big jx-big-sm" aria-live="polite">
              {MONTHS[i]}
            </span>
            <span className="jx-big-l">{p >= 1 ? "PIBM said yes" : "still nothing"}</span>
          </>
        );
      }}
    />
  );
}

/* ── 12 · Seven years, opened ────────────────────────────────────────────── */

export function Expand({ onDone, done }: Props) {
  return (
    <button type="button" className="jx-btn jx-btn-solid" onClick={onDone} disabled={done}>
      {done ? "opened" : "Open the seven years"}
    </button>
  );
}

/* ── 13 · Ship them ──────────────────────────────────────────────────────── */

const SHIPPED = [
  "MIGI", "PentaCMD", "Qdex-1.5B", "AEGIS VAULT", "Pentashell", "PACT Agent",
  "Imprint", "Legatus", "Cite", "PixelVille", "Forget Anything", "D-PE",
  "Ember", "Geek Collectibles", "Soul Canvas", "Migi App", "Fun Apps",
  "Shraddha", "Learning Portfolio", "This site",
];

export function Build({ onDone, done }: Props) {
  const [n, setN] = useState(done ? SHIPPED.length : 0);
  const full = done || n >= SHIPPED.length;

  useEffect(() => {
    if (n >= SHIPPED.length && !done) onDone();
  }, [n, done, onDone]);

  return (
    <div className="jx-build">
      <p className="jx-counter" aria-live="polite">
        <strong>{done ? SHIPPED.length : n}</strong>
        <span>shipped</span>
      </p>
      <div className="jx-ships">
        {SHIPPED.slice(0, done ? SHIPPED.length : n).map((s) => (
          <span key={s} className="jx-ship">
            {s}
          </span>
        ))}
      </div>
      {!full ? (
        <button type="button" className="jx-btn" onClick={() => setN((x) => x + 1)}>
          Ship one
        </button>
      ) : (
        <p className="jx-aside">Twenty of them. Without knowing how to code.</p>
      )}
    </div>
  );
}

/* ── 14 · Four into one ──────────────────────────────────────────────────── */

const FACETS = [
  { k: "Business", v: "what it costs, what it returns" },
  { k: "Marketing", v: "because he has run one" },
  { k: "Demand", v: "created it with no budget" },
  { k: "Development", v: "because he builds now" },
];

export function ConvergeIx({ onDone, done }: Props) {
  const [on, setOn] = useState<string[]>([]);
  const all = done || on.length === FACETS.length;

  useEffect(() => {
    if (on.length === FACETS.length && !done) onDone();
  }, [on.length, done, onDone]);

  return (
    <div className="jx-converge">
      <div className="jx-facets">
        {FACETS.map((f) => {
          const lit = done || on.includes(f.k);
          return (
            <button
              key={f.k}
              type="button"
              className={`jx-facet ${lit ? "is-on" : ""}`}
              disabled={lit}
              onClick={() => setOn((o) => [...o, f.k])}
            >
              <span className="jx-facet-k">{f.k}</span>
              <span className="jx-facet-v">{lit ? f.v : "tap to add"}</span>
            </button>
          );
        })}
      </div>
      {all && <p className="jx-aside">Most people have one. Some have two.</p>}
    </div>
  );
}

/* ── 15 · The ask ────────────────────────────────────────────────────────── */

export function Finish({ onDone, done }: Props) {
  return (
    <button type="button" className="jx-btn jx-btn-solid" onClick={onDone} disabled={done}>
      {done ? "—" : "Read the last line"}
    </button>
  );
}
