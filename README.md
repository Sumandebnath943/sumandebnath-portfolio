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

There are pre-existing lint errors in `components/layout/Navigation.tsx` — see
`HANDOFF.md` §3.

## Environment

`DATABASE_URL` · `TELEGRAM_BOT_TOKEN` · `TELEGRAM_CHAT_ID` ·
`ADMIN_PASSWORD_HASH` · `ADMIN_SESSION_SECRET` · `CRON_SECRET` · `GROQ_API_KEY`

See `PROJECT_BIBLE.md` §9 for what each one powers.

## Contributing

Commits go straight to `main`; pushing deploys. Commit subjects are lowercase
`type(scope): sentence`, and the body explains *why*.
