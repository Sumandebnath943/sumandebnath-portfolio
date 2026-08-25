<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project documentation — read before starting

Three documents carry the full context for this repo. They do not overlap.

- **`PROJECT_BIBLE.md`** — how the system is built. Stack, route map, design
  system, subsystems, conventions, and the traps that have already cost real
  debugging time. **Read this first.**
- **`HANDOFF.md`** — where things stand right now, what changed in the last
  session, and what is worth doing next.
- **`PORTFOLIO_HANDOFF.md`** — how the site writes. Voice, what each page
  argues, and the repeatable pattern for building a new product page.
- **`ROBOT_ROLLBACK.md`** — **read this the moment anything about the 3D robot
  mascot looks or behaves wrong.** It is indexed by symptom — frozen, too dark,
  blurry, sliding in, arriving late — and gives the cause, the check, and the
  exact way to undo that one thing without disturbing the rest.
- **`PAGE_OPTIMIZATION.md`** — **read this before running any performance test
  or proposing any performance work.** How to measure this site without fooling
  yourself, what has already been changed and measured, the standing rules, and
  the list of things that were considered and refused on purpose.
- **`BLOG_GUIDELINES.md`** — **read this before writing or editing anything in
  `/notebook`.** The typed-block format, the title and answer-block rules, the
  closed category list, the capped tag vocabulary, the no-duplicate-question
  constraint, the voice rules, and what may never be published.
- **`TARGET_QUERIES.md`** — the prompts this site is trying to be the answer to,
  the grading scale, and the results log. **A person runs it by hand; an agent
  cannot.** Read `§2` before offering to "run the queries".
- **`AEO_PLAYBOOK.md`** — **read this before proposing any SEO, AEO or "get
  cited by AI" work.** What is already in place, the rules for writing
  extractable answers, the one-question-per-URL constraint, the off-site track
  that carries most of the remaining ceiling, and what was refused.

`project_memory.md` and `analysis_results.md` are early-2026 snapshots, kept for
history only. They are superseded by `PROJECT_BIBLE.md` and their file paths no
longer match the codebase — do not follow them.

Seven things that are true regardless of the task:

1. Commit straight to `main`. This project does not use feature branches.
2. `next/image` only accepts `quality={75}` here — `images.qualities` is unset.
3. An ancestor with `overflow-hidden` silently disables `position: sticky`.
4. The body is the scroll container, so `window` scroll listeners never fire.
   Use `IntersectionObserver`.
5. `middleware` is gone. This version uses **`proxy.ts`**, exporting
   `proxy(request)` and a statically-read `config.matcher`, on the Node runtime.
6. **Visitor tracking does nothing under `next dev`** — StrictMode's
   mount/cleanup/remount trips an init guard and the listeners never re-attach.
   Any change to `app/api/track`, `components/analytics/VisitorPing.tsx` or
   `proxy.ts` must be verified against a production build (`prod` in
   `.claude/launch.json`, port 3200).
7. **`saveVisit()` returns `false`; it never throws.** Silent partial failure
   looks exactly like success here — check return values, and never read an
   absence of errors as evidence that something worked.
