# Suman Debnath — Portfolio

The personal site of Suman Debnath, an AI-native product marketer who builds the
things he markets. Live at **https://sumandebnath.houseofnamus.com**.

It is not a template portfolio. Almost every route is a bespoke landing page for
something he shipped — an autonomous agent fleet, a native Android client, a
language model, a CLI, a game, an encrypted notepad — each with its own palette
and its own argument.

## Documentation

| File | Read it for |
|---|---|
| **[PROJECT_BIBLE.md](PROJECT_BIBLE.md)** | Architecture, route map, design system, subsystems, conventions, known traps |
| **[HANDOFF.md](HANDOFF.md)** | Current state, the last session's changes, next steps |
| **[PORTFOLIO_HANDOFF.md](PORTFOLIO_HANDOFF.md)** | Voice, what each page argues, the pattern for a new product page |
| **[BLOG_GUIDELINES.md](BLOG_GUIDELINES.md)** | Writing for `/notebook` — format, titles, categories, the no-duplicate-question rule, what may never be published |
| **[NOTEBOOK_COVERS.md](NOTEBOOK_COVERS.md)** | Cover art — the one house style, an image prompt per article, and how to wire one in |
| **[AEO_PLAYBOOK.md](AEO_PLAYBOOK.md)** | Being found and cited: what is in place, the standing rules, and what was refused |
| **[TARGET_QUERIES.md](TARGET_QUERIES.md)** | The prompts this site is trying to be the answer to, and the log of what the engines said |
| **[SEO_AUDIT.md](SEO_AUDIT.md)** | Every article's title, meta title, description and target keywords — applied, with the reasoning |
| **[PAGE_OPTIMIZATION.md](PAGE_OPTIMIZATION.md)** | Performance — how to measure this site without fooling yourself |
| **[ROBOT_ROLLBACK.md](ROBOT_ROLLBACK.md)** | The 3D mascot, indexed by symptom, with a per-item undo |

`project_memory.md` and `analysis_results.md` are superseded historical
snapshots, kept only for reference.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind 3.4 · framer-motion 12
· three + React Three Fiber · Neon Postgres · Groq · deployed on Vercel.

## Running locally

```bash
npm install
```

```bash
npm run dev
```

Build and lint before committing:

```bash
npm run build
```

```bash
npm run lint
```

Both, separately — **`npm run build` does not lint.** Next 16 moved eslint out
of the build, so a green build says nothing about lint.

Ten pre-existing `react-hooks` errors are expected: nine in `components/robot/`,
one in `components/analytics/VisitorPing.tsx`. They are errors only because
`eslint-plugin-react-hooks` 7.1.1 ships the React Compiler rules at that
severity, and React Compiler is not enabled here — they block nothing. **Count
them before and after your change rather than aiming for zero.**
`HANDOFF.md` §1.14 explains each one.

## Environment

`DATABASE_URL` · `TELEGRAM_BOT_TOKEN` · `TELEGRAM_CHAT_ID` ·
`TELEGRAM_HUMAN_BOT_TOKEN` · `TELEGRAM_HUMAN_CHAT_ID` ·
`ADMIN_PASSWORD_HASH` · `ADMIN_SESSION_SECRET` · `CRON_SECRET` · `GROQ_API_KEY`

See `PROJECT_BIBLE.md` §9 for what each one powers.

## Contributing

Commits go straight to `main`; pushing deploys. Commit subjects are lowercase
`type(scope): sentence`, and the body explains *why*.
