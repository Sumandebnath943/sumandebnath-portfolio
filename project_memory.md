# Project Memory: Suman Debnath AI-Native Portfolio

This document acts as the core memory bank and architectural blueprint for **Suman Debnath's AI-Native Product Builder Portfolio**. It preserves the design philosophy, file structures, component specifics, styling guidelines, and recent optimizations to maintain visual cohesion and high development speed across future agent and developer sessions.

---

## ── Architectural Overview ──

* **Core Stack**: React 19, Next.js 16 (App Router), Tailwind CSS 3.4.19 (with PostCSS 4.x), Framer Motion 12.38.0, Lucide Icons.
* **Layout Chrome**:
  * **Navigation** ([Navigation.tsx](file:///c:/Users/Admin/Documents/sumandebnath/components/layout/Navigation.tsx)): Custom floating dark blur pill with an ultra-thin Vercel-style aesthetic. Anchors scroll links, Let's Talk call-to-action, and custom command palette dispatch.
  * **Command Palette** ([CommandPalette.tsx](file:///c:/Users/Admin/Documents/sumandebnath/components/layout/CommandPalette.tsx)): Accessibility overlay activated via keyboard shortcuts (`⌘K` or `Ctrl+K`) for rapid navigation.
  * **Loader Sequence** ([Loader.tsx](file:///c:/Users/Admin/Documents/sumandebnath/components/sections/Loader.tsx)): Multi-phase terminal initializer that tracks loading states (Initialization → Identity Architecture → AI-native Frameworks) accompanied by three nested, slow-rotating orbital SVG boundary lines and a glowing laser scanline overlay.
  * **Footer** ([Footer.tsx](file:///c:/Users/Admin/Documents/sumandebnath/components/layout/Footer.tsx)): Minimum height copyright strip restricted to simple black and white metadata details.

---

## ── Premium Design System ──

### 1. Color Palette & Cinematic Ambient Glows
* **Background Canvas**: Monolithic slate dark and pure black surfaces (`#000000`, `#050505`, `#080808`).
* **Organic Earth Accents**: Shifting away from standard high-saturation digital tones to natural accent layers matching system categories:
  * **Sage**: Automation frameworks, intelligent workflows, and pipeline architectures.
  * **Architecture Blue**: Scalable tech stacks, systems blueprints, and operational engineering.
  * **Terracotta**: Digital marketing growth, ROAS optimization systems, and commerce.
* **Component Glow Themes**:
  * **IMPRINT**: Molten Ember Orange (`#FF4500` / `#FF5A1F`) — representing a raw, molten reckoning.
  * **LEGATUS**: Muted Gold (`#C5A059`) — representing oppressive luxury, security, and legacy.
  * **CITE**: Electric Violet (`#7B61FF`) — representing corporate surveillance and intelligence graphs.
  * **ROASmind**: Pure White/Silver (`#F5F5F7`) — representing clean next-generation interface architectures.
  * **Geek Collectibles**: Neon Crimson (`#FF003C`) — representing premium underground Akihabara culture at 2 AM.
  * **EMBER**: Warm Ember Orange (`#FF8C00`) — representing quiet warmth and cognitive relief.
* **Borders & Dividers**: High-end micro-thin 1px borders using low-opacity white (`border-white/[0.08]`) or section-specific accent glows.

### 2. Typography Hierarchy
* **Headings**: **Manrope Font System** (`font-manrope font-semibold`) standardized across all major section headers for industrial structure.
* **Serif Italics**: **Instrument Serif Font System** (`font-serif italic font-normal`) applied to key inline highlighted words (e.g., *"Intelligent"*, *"Systems"*) utilizing soft top-to-bottom white-to-grey gradients.
* **Subtext & Body**: Clean sans-serif styling with lighter weights (`font-light`), restricted tracking, and high legibility contrast (`text-white/70` minimum) to ensure zero low-contrast accessibility issues on mobile screens.

---

## ── Component-by-Component Specifications ──

### 1. The Frameless Hero Portrait ([Hero.tsx](file:///c:/Users/Admin/Documents/sumandebnath/components/sections/Hero.tsx))
* **Strategy**: Flat frameless image integration that bleeds into the black background, optimized using a responsive split:
  * **Desktop Layout (`lg:block`)**: Absolutely positioned overlay container (`w-[55%]`) offset by `-6%` left and `-16%` top via translations to break container bounds. Blends using dual-masking (`WebkitMaskImage` & `maskImage`) that dissolves borders into black on all sides.
  * **Mobile Layout (`lg:hidden`)**: Right-side cinematic overlay set to `right: -12%` and `width: 90%` with focal alignment `object-position: 55% 0%`. Combines dual directional masking to dissolve the shoulder lines into black while maintaining 100% typography readability on the left.
  * **Typography Constraint**: Headline size scaled down to `text-[32px]` on mobile to prevent character overlap on Suman's face.

### 2. Custom Brand Signatures
* **Purified Assets**: Raw brand signatures processed to generate clean transparency assets:
  * **`/branding/logo_v2.png`**: Purified transparent signature used on the cinematic scanline loader and contact section header.
  * **`/branding/logo_navbar_v2.png`**: Optimized thin transparent signature restricted to `h-8` inside the navbar pill to match high-end Vercel-style UI guidelines.

### 3. Systems Dossier Components
Each selected system is housed inside its own beautiful component featuring volumetric glowing background filters, subtle floating particle systems, and dedicated interactive elements:
* **Browser Viewports**: Embedded interactive browser mockups showcasing full-bleed screenshots of actual product architectures (`/screenshots/...`). Includes:
  * Sleek browser chromes, glowing address indicators, and scrolling internal zones with top/bottom fade masks.
  * Subtle parallax translation (`style={{ y }}`) driven by Framer Motion's `useScroll` that shifts viewport mockups vertically as the page scrolls.
* **Capabilities Grids**: Modular grids showcasing technical capabilities through custom hover cards that shift from dark grey to section-specific accent glows.
* **Fallback Systems**: Robust fallback logic configured with downscaled font sizes (`text-4xl sm:text-6xl`) to prevent layout overflows if graphical branding fails.

### 4. Contact Command Center ([Contact.tsx](file:///c:/Users/Admin/Documents/sumandebnath/components/sections/Contact.tsx))
* **Tactile Transition**: Warm graphite to ember gradient background entry.
* **Absolute Signature Grid**: Massive brand signature placed inside an absolute block on desktop (`md:absolute right-0 bottom-[-60px] md:w-[580px] md:h-[220px]`) which prevents it from expanding container height, transitioning to responsive inline flow on mobile to ensure zero overlap.
* **Pill Clusters**: Phone, email, and social links designed as clean interactive pill buttons with high-end hover scaling and ambient edge lines.

---

## ── Assets Map ──

* **`/images/suman.png`**: Profile portrait used in Hero.
* **`/branding/logo_v2.png`**: Standardized signature logo.
* **`/branding/logo_navbar_v2.png`**: Ultra-thin navbar signature logo.
* **`/screenshots/imprint.png`**: Full-length browser layout screenshot for Imprint system.
* **`/screenshots/legatus.png`**: Full-length browser layout screenshot for Legatus system.
* **`/screenshots/cite_v2.png`**: Full-length browser layout screenshot for Cite system.
* **`/screenshots/roasmind.png`**: Full-length browser layout screenshot for ROASmind system.
* **`/screenshots/geekcollectibles_v2.png`**: Full-length browser layout screenshot for Geek Collectibles system.
* **`/screenshots/ember.png`**: Full-length browser layout screenshot for Ember system.
* **`/tools/`**: Brand logo icons and assets integrated into the interactive headers.
