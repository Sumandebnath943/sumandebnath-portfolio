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

`project_memory.md` and `analysis_results.md` are early-2026 snapshots, kept for
history only. They are superseded by `PROJECT_BIBLE.md` and their file paths no
longer match the codebase — do not follow them.

Four things that are true regardless of the task:

1. Commit straight to `main`. This project does not use feature branches.
2. `next/image` only accepts `quality={75}` here — `images.qualities` is unset.
3. An ancestor with `overflow-hidden` silently disables `position: sticky`.
4. The body is the scroll container, so `window` scroll listeners never fire.
   Use `IntersectionObserver`.
