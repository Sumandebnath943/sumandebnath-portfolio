# System Handoff: Suman Debnath AI-Native Portfolio

This file serves as a rapid transition guide for the next agent or developer (specifically **Claude Code**) taking over the codebase. It details the **current state of the project**, **recent visual modifications and mobile responsive optimizations completed**, and **actionable next steps**.

---

## ── Current Project State: Fully Resolved & Harmonized ──

All visual assets, styling structures, and layouts have been successfully audited, refactored, and validated across responsive viewports:

1. **Mobile Responsiveness Completely Restored**:
   * **Hero Component Split**: Restored the atmospheric frameless mobile portrait of Suman using a dedicated responsive split in `Hero.tsx`. Text margins have been narrowed to a clean 60% layout, and the absolute mobile portrait includes a beautiful right-side gradient mask to eliminate overlap with readable text layers.
   * **Sizing Scales Repaired**: Replaced the invalid Tailwind width (`w-26`) inside the floating navbar (`Navigation.tsx`) with a standard `w-28` class.
   * **Dossier Clipping Resolved**: Resolved edge-cropping bugs inside `ImprintDossier.tsx` and `LegatusDossier.tsx` by overriding the absolute `scale-[1.3]` with standard `scale-100` on mobile viewports.
   * **Text Fallback Downsizing**: Adjusted fallback headings in the dossiers from a giant `text-7xl` to responsive `text-4xl` layout sizes, preventing any horizontal layout overflow.

2. **Logo Assets Purified**:
   * Raw signature scripts were processed to produce high-fidelity transparent PNG assets (`logo_v2.png` and `logo_navbar_v2.png`). These are seamlessly loaded into the cinematic scanline sequencer (`Loader.tsx`), floating pill (`Navigation.tsx`), and absolute contact header (`Contact.tsx`) without any layout shifts or artifact halos.

3. **Cinematic Aesthetic Standardized**:
   * Unified typography (Manrope titles + Instrument Serif Italic inline highlights).
   * Restructured system dossiers with volumetric ambient glows, moving custom SVG orbital boundaries, floating particles, browser Mockups showing true-to-life portfolio screenshots, and tactical capability grids.

---

## ── Completed Implementation Details ──

### 1. Navigation Pill Layer (`Navigation.tsx`)
* Collapsed bar height is refined (`py-2` when starting, auto-thinning to `py-1.5` on scroll).
* Restricted navbar signature height to `h-8` with standard width allocations (`w-28 md:w-36`) to match premium Vercel-style UI benchmarks.

### 2. Frameless Hero Blend (`Hero.tsx`)
* Frameless headshot `/images/suman.png` is embedded.
* Utilizes a dual linear-gradient masking style (`maskComposite: 'intersect'`) on desktop and mobile layers to fade all boundaries (top, bottom, and side cropped shoulders) perfectly into the black background.

### 3. Contact Command Center (`Contact.tsx`)
* Shifted Suman's signature logo away from the white footer strip into the Contact section header.
* Positioned absolute on desktop (`md:absolute right-0 bottom-[-60px] md:w-[580px] md:h-[220px]`) and inline on mobile to ensure zero contact details clipping.
* Tightened section padding margins to maintain strong vertical layout rhythm.

---

## ── Next Steps & Actionable Checklist for Claude Code ──

The project is primed for immediate further development. Here are the top recommended next actions:

### 1. Convert PNG Brand Signatures to Inline/Static SVGs
* **Objective**: Replace `/branding/logo_v2.png` and `/branding/logo_navbar_v2.png` with SVG components.
* **Why**: PNG files can experience subtle compression artifacting at higher scales. SVGs will guarantee mathematically crisp, infinite scaling at all screen breakpoints, and support CSS stroke styling for animations.

### 2. Implement Interactive Micro-Animations inside Browser Viewports
* **Objective**: Add micro-interactions inside the mockups inside `ImprintDossier.tsx`, `LegatusDossier.tsx`, `CiteDossier.tsx`, etc.
* **Ideas**:
  * *Automated Hover Scrolling*: Create a React hook or use Framer Motion to automatically slow-scroll the nested screenshot viewport `y` position when the user hovers over the browser container, simulating live browsing.
  * *Scroll-Linked Depth*: Link the viewport screenshot scroll offsets directly to the page's main scroll velocity to make the browser feel fully alive.

### 3. Hook Up the floating Command Palette (`CommandPalette.tsx`)
* **Objective**: Populate the interactive list items inside the command list drawer.
* **Action**: Currently, clicking items inside the Cmd+K palette dispatches events. Make sure clicking "Systems", "Stack", or "Philosophy" triggers smooth scrolling to those section targets and auto-closes the overlay seamlessly.

### 4. Optimize Initial Loading Sequence & Critical Resource Preloading
* **Objective**: Improve the Largest Contentful Paint (LCP) score.
* **Action**: Preload `/images/suman.png` and crucial brand signatures inside `layout.tsx` using `link rel="preload"` tags so that they are fully loaded into the browser memory while the loading sequencer plays its cinematic sequence.
