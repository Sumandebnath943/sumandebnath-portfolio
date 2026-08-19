# `_masters/` — full-resolution originals, kept on purpose

These files are **committed** (unlike the `_source-*` folders, which are
git-ignored) and are **not served**. They live outside `public/` so they do not
ship in the deployment, but they are in the repository so a fresh clone can
regenerate everything without going back to the FBX pipeline or to GitHub.

| File | What it is | Produces |
|---|---|---|
| `robot.glb` | The mascot at full texture resolution (1024², 1071 KB). Output of `scripts/build-robot-glb.mjs`. | `public/robot-v2.glb` via `scripts/shrink-robot-textures.mjs` |
| `hdri/city.hdr` | The environment map at 1024×512, 1.5 MB. Poly Haven via `pmndrs/drei-assets`, CC0. | `public/hdri/city-256.hdr` via `scripts/shrink-hdri.mjs` |

Both are also the **pre-Tier-B originals** — the exact assets the site served
before 19 Aug 2026. If the shrunk versions ever turn out to be wrong, these are
what to go back to. See `ROBOT_ROLLBACK.md`.

## Regenerating the served assets

```bash
node scripts/shrink-robot-textures.mjs           # -> public/robot-v2.glb
node scripts/shrink-hdri.mjs _masters/hdri/city.hdr public/hdri/city-256.hdr 256
```

> **Any new output needs a new filename.** `/robot-*.glb` and `/hdri/*` are
> served `immutable` for a year, so overwriting a served file in place ships the
> change to nobody who has already visited. Bump the number and update the
> references — `PROJECT_BIBLE.md` §10.1 lists them.

## Why these are not in `_source-*`

The `_source-*` folders hold inputs that are too large to commit (847 MB of FBX,
the whole film production) and are therefore **git-ignored and exist only on
Suman's machine**. If that disk is lost, they are gone. These two are small
enough to keep in the repository, and deliberately are, precisely so the robot
can always be rebuilt.
