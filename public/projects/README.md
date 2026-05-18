# Project Screenshots

Place project screenshots in subdirectories named by project ID.

## Structure

```
/public/projects/
  project-1/
    screenshot-1.png   ← Main screenshot (required)
    screenshot-2.png   ← Additional view (optional)
    screenshot-3.png   ← Additional view (optional)
  project-2/
    screenshot-1.png
    ...
  project-3/
    screenshot-1.png
    ...
```

## Usage in Code

In `components/sections/Projects.tsx`, update the `screenshots` array for each project:

```ts
screenshots: [
  "/projects/project-1/screenshot-1.png",
  "/projects/project-1/screenshot-2.png",
]
```

## Image Recommendations

- **Width**: 1280px minimum
- **Format**: PNG or WebP
- **Height**: any — the container scrolls internally
- The screenshot viewport is **480px tall** and internally scrollable
- Multiple screenshots stack vertically and can be scrolled inside the card
