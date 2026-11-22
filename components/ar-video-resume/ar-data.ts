// Copy and facts for /ar/video-resume.
//
// Every number here comes from the AR project itself (D:\project\my ar project,
// read-only — published at github.com/Sumandebnath943/poster-ar):
//   • film-web.mp4 — 357.9 s (5:58), 1920×1080, 20,887,677 bytes (~20 MB).
//     The same cut as the homepage film, "Who am I?".
//   • targets.mind — recompiled 28 Aug 2026 from the retextured poster:
//     5,218 detection keypoints across 13 scale levels (commit af7afc7).
//   • MindAR 1.2.5 image tracking on A-Frame 1.5.0, loaded from CDNs; the page
//     is one static index.html on GitHub Pages.
// If that repo moves, these go stale silently — re-read its git log.

export const AR = {
  night: "#0f0c29",
  deep: "#08061a",
  indigo: "#302b63",
  panel: "rgba(255,255,255,0.05)",
  line: "rgba(237,235,250,0.14)",
  text: "#EDEBFA",
  muted: "rgba(237,235,250,0.72)",
  orange: "#FF7E5F",
  cyan: "#00D4FF",
  amber: "#FFC58A",
} as const;

export const LINKS = {
  live: "https://sumandebnath943.github.io/poster-ar/",
  liveShort: "sumandebnath943.github.io/poster-ar",
  source: "https://github.com/Sumandebnath943/poster-ar",
  film: "/#film",
} as const;

export const IMG = {
  poster: {
    src: "/ar-video-resume/poster.webp",
    w: 2400,
    h: 1347,
    alt: "The AR poster: a man in a blue shirt seen from behind, leaning on a rooftop parapet over a crowded city at dusk, with paper kites in the sky.",
  },
  qr: {
    src: "/ar-video-resume/qr.svg",
    alt: "QR code that opens sumandebnath943.github.io/poster-ar on a phone",
  },
  og: {
    src: "/ar-video-resume/og.jpg",
    w: 1200,
    h: 630,
    alt: "AR Video Resume — the rooftop poster that plays the film Who am I? when a phone points at it",
  },
} as const;

export const HERO = {
  kicker: "AR · WebAR · Nothing to install",
  pitch:
    "The poster is the opening frame of “Who am I?”, the 5:58 film on the homepage. Point a phone at it and the film plays on the poster itself, pinned to its four corners. Paper kites lift off its sky, and the last frame hands over a contact card you can save.",
  chips: ["5:58 film", "MindAR 1.2.5", "A-Frame 1.5", "GitHub Pages", "Camera only"],
};

export type Step = { n: string; title: string; body: string };

/** The full walk-through, in the order a visitor actually does it. */
export const STEPS: Step[] = [
  {
    n: "01",
    title: "Open the scanner on your phone",
    body: "Point the phone’s camera at the QR code and tap the link it offers. It opens in Safari on an iPhone or Chrome on Android. If it opens inside LinkedIn, Instagram or WhatsApp instead, use “Open in browser” — in-app browsers often refuse the camera.",
  },
  {
    n: "02",
    title: "Tap “Enter AR Experience” and allow the camera",
    body: "The phone asks for the camera once. Nothing is recorded or uploaded; the tracking runs on the phone. The 20 MB film only starts downloading after this tap.",
  },
  {
    n: "03",
    title: "Reveal the poster on this screen",
    body: "Press “Reveal the poster” on this page. It fills the screen; use Full screen for a bigger target. A printed copy works the same way — download the poster below.",
  },
  {
    n: "04",
    title: "Point the phone at the poster",
    body: "Get the whole poster inside the scanning frame, about an arm’s length away. Turning the phone sideways helps — the poster is 16:9, so it fills more of a landscape view and locks faster.",
  },
  {
    n: "05",
    title: "Watch the film play on the poster",
    body: "Once the poster is recognised, a thin frame draws around it and the film fades in on top. If you look away, it picks up where it stopped when the poster comes back into view.",
  },
];

export type Control = { icon: string; name: string; body: string };

/** The buttons along the bottom of the AR view. */
export const CONTROLS: Control[] = [
  { icon: "🔊", name: "Sound", body: "Mutes and unmutes the film. The audio is panned towards the poster when the phone allows it." },
  { icon: "🌬️", name: "Blow to fly", body: "Blow at the phone and the kites rise. This is the only button that asks for the microphone." },
  { icon: "🗺️", name: "Portal", body: "Opens a window behind the poster into three layers of skyline, so moving the phone slides near rooftops past far ones." },
  { icon: "📷", name: "Capture", body: "Saves a photo of the poster with the film playing on it." },
  { icon: "⛶", name: "Full screen", body: "Leaves AR and plays the film flat across the phone, from the same point." },
];

export type Fix = { problem: string; fix: string };

/** What actually goes wrong, and what to do about it. */
export const FIXES: Fix[] = [
  {
    problem: "It keeps saying “Scanning…”",
    fix: "Turn this screen’s brightness up, press Full screen, and step back until the entire poster — all four edges — is inside the frame on the phone.",
  },
  {
    problem: "The film shakes or drops out",
    fix: "Hold still for a second after it locks. Avoid reflections from a lamp or window across the screen; glare erases the detail the tracker reads.",
  },
  {
    problem: "The camera never starts",
    fix: "You are probably in an in-app browser. Open the link in Safari or Chrome. If you said no to the camera earlier, allow it again in the browser’s site settings.",
  },
  {
    problem: "No sound",
    fix: "Check the 🔊 button, then the phone’s silent switch. Phones block sound until you tap something, which the Enter button counts as.",
  },
  {
    problem: "No second screen, no printer",
    fix: "The scanner’s start screen has “No poster? Watch the film”, which plays it flat on the phone.",
  },
];

/** Three facts for the build strip. Each is checkable in the source repo. */
export const FACTS: { value: string; label: string }[] = [
  { value: "5,218", label: "keypoints the tracker looks for in the poster" },
  { value: "1", label: "static HTML page — no build step, no backend" },
  { value: "0", label: "apps to install, accounts to make or data uploaded" },
];
