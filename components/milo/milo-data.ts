/**
 * Everything /agents/milo says, in one place.
 *
 * Source of truth is the Milo repo (D:\project\agents-milo, read-only):
 * `shared/avatars.ts` for the cast (names, colours, personas, keywords),
 * `shared/templates.ts` for the 23 starters (pitches and schedules, verbatim),
 * `docs/AGENT_CATALOG.md` for what each starter needs and what agents can and
 * cannot do, and `docs/PROJECT_BIBLE.md` §13, §23 and §30 for the limits and
 * the roadmap. Checked 23 Nov 2026. When Milo moves, re-read those four.
 *
 * Two of Milo's own rules are carried over on purpose:
 *   • The characters are never redrawn. `public/milo/` holds the app's own
 *     SVGs, and Milo's body and moon are generated from `miloBodySvg()` /
 *     `miloMoonSvg()` — the same split the app uses so the fur filter is drawn
 *     once and only the face animates.
 *   • No AI vendor or model names. Milo's public page never names them, and
 *     the MIGI page set the same rule for this site.
 */

export const MILO = {
  night: "#0b0b0d",
  raise: "#111114",
  surface: "#17171b",
  surface2: "#1f1f24",
  line: "rgba(255,255,255,0.09)",
  line2: "rgba(255,255,255,0.16)",
  text: "#f5f5f6",
  text2: "#c8c8cf",
  muted: "#9a9aa4",
  tangerine: "#FF6F3C",
  moon: "#FFD6C2",
  ink: "#1a1418",
  blush: "#ff8fa3",
  pink: "#ff4f7b",
  violet: "#9b5cff",
  amber: "#ffb020",
  ok: "#4ade80",
  /** Moon paper: the light sections. */
  cream: "#FFF5EE",
  cream2: "#FFE7DA",
  /** Tangerine for TEXT on cream — the fill colour is 2.6:1 there; this is 5.2:1. */
  tangerineInk: "#B5431B",
  /** Secondary ink on cream, 6.6:1. */
  inkSoft: "#5f5560",
  /** The one gradient Milo's own UI allows (its Settings profile card). */
  sunset: "linear-gradient(135deg, #ff7a3c 0%, #ff4f7b 52%, #9b5cff 100%)",
} as const;

export const LINKS = {
  publicPage: "https://milo.houseofnamus.com/about.html",
  app: "https://milo.houseofnamus.com",
  short: "https://youtu.be/OZR0oXydGK0",
  videoId: "OZR0oXydGK0",
  videoTitle: "Build your own AI agents just by talking",
} as const;

export const IMG = {
  body: "/milo/milo-body.svg",
  moon: "/milo/milo-moon.svg",
  og: { src: "/milo/og.jpg", w: 1280, h: 640, alt: "Milo, a fluffy tangerine planet with a moon, beside the line “Talk your own AI agents into existence” and ten of the cast" },
  shots: {
    home: { src: "/milo/home.webp", w: 780, h: 1688, alt: "Milo’s home screen: Milo floating at the top, the agents Sol, Quill and Zip, and a “Needs your OK” card where Zip asks to post to Discord" },
    draft: { src: "/milo/draft.webp", w: 780, h: 1688, alt: "A “Meet your new agent” card for Pip, a price watcher, with its schedule, its tools and a Create Pip button" },
    agent: { src: "/milo/agent.webp", w: 780, h: 1688, alt: "Sol’s own page with Run now and Pause, and its morning brief under Updates" },
    inbox: { src: "/milo/inbox.webp", w: 780, h: 1688, alt: "The inbox, filtered by agent, with a research update from Quill and a morning briefing from Sol" },
    new: { src: "/milo/new.webp", w: 780, h: 1688, alt: "The New agent sheet: “Describe it to Milo”, then ready-made starters such as Morning brief, Rain alert and World in five" },
    desktop: { src: "/milo/desktop.webp", w: 1440, h: 900, alt: "Milo on a wide screen, with the agents in a sidebar and an approval card waiting above the Talk to Milo button" },
  },
} as const;

export const avatarSrc = (id: string) => `/milo/cast/${id}.svg`;

/* ── The cast ─────────────────────────────────────────────────────────────── */

export type CastMember = {
  id: string;
  name: string;
  color: string;
  look: string;
  persona: string;
  bestFor: string;
  /** From shared/avatars.ts — the same words pickAvatar() scores against. */
  keywords: string[];
};

export const CAST: CastMember[] = [
  { id: "sol", name: "Sol", color: "#FFD23F", look: "Yellow sun-flower, happy closed eyes", bestFor: "Morning briefs and daily digests", persona: "Bright, upbeat and brief, like a friend who already read everything before you woke up.", keywords: ["morning", "daily", "brief", "digest", "today", "start my day", "wake"] },
  { id: "atlas", name: "Atlas", color: "#2F6BFF", look: "Blue planet with a ring", bestFor: "News and world events", persona: "Calm and worldly. Gives you the big picture without the noise.", keywords: ["news", "world", "headline", "politics", "global", "current affairs", "election"] },
  { id: "quill", name: "Quill", color: "#F3EAD7", look: "Paper-cream egg with a monocle", bestFor: "Research, papers and reading lists", persona: "Precise and well-read. Turns long reads into a few plain sentences.", keywords: ["paper", "research", "article", "read", "study", "arxiv", "newsletter", "blog", "long read"] },
  { id: "scout", name: "Scout", color: "#C9B458", look: "Khaki capsule with a visor", bestFor: "Jobs, deals and listings", persona: "Persistent and practical. Keeps looking so you don’t have to, and never sends the same thing twice.", keywords: ["job", "hiring", "opening", "career", "deal", "listing", "rent", "apartment", "flat", "house"] },
  { id: "pip", name: "Pip", color: "#6EE7B7", look: "Mint pebble with an antenna", bestFor: "Watching pages for price or stock changes", persona: "Curious and quick. Notices small changes before anyone else and only pipes up when something moved.", keywords: ["watch", "monitor", "change", "price", "back in stock", "restock", "track", "drop", "alert me when"] },
  { id: "nova", name: "Nova", color: "#A78BFA", look: "Violet four-point star", bestFor: "Daily ideas, fun facts and learning nudges", persona: "Playful and inspiring. Loves a surprising idea and explains it in two sentences.", keywords: ["idea", "fact", "spark", "inspire", "inspiration", "learn", "curious", "quote", "trivia"] },
  { id: "tide", name: "Tide", color: "#14B8A6", look: "Teal wave-bottomed arch", bestFor: "Weather, rain alerts and outdoor plans", persona: "Steady and outdoorsy. Reads the sky for you and tells you what to wear.", keywords: ["weather", "rain", "umbrella", "outdoor", "surf", "hike", "commute", "air quality", "storm", "forecast"] },
  { id: "ledger", name: "Ledger", color: "#A7C4A0", look: "Sage square with an eyeshade", bestFor: "Markets, prices and money news (read-only)", persona: "Careful and numbers-minded. No drama, just the figures and what changed.", keywords: ["money", "market", "stock", "share", "crypto", "bitcoin", "budget", "finance", "currency", "exchange rate", "gold"] },
  { id: "ember", name: "Ember", color: "#EF4444", look: "Red flame", bestFor: "Fitness, motivation and streaks", persona: "Energetic and direct. Your hype coach: short, warm, a little bit pushy.", keywords: ["workout", "fitness", "gym", "run", "running", "motivation", "streak", "sport", "exercise", "steps"] },
  { id: "juno", name: "Juno", color: "#7DD3FC", look: "Sky-blue drop", bestFor: "Health, habits and wellbeing", persona: "Warm and caring. Gentle reminders, never nagging.", keywords: ["health", "habit", "water", "hydrate", "wellbeing", "medicine", "posture", "care", "stretch", "eyes"] },
  { id: "mochi", name: "Mochi", color: "#FFB8D2", look: "Pink mound, sleepy eyes", bestFor: "Evening wind-down and journaling prompts", persona: "Soft-spoken and soothing. Helps you slow down at the end of the day.", keywords: ["evening", "night", "calm", "relax", "journal", "gratitude", "mindful", "wind down", "bedtime"] },
  { id: "bolt", name: "Bolt", color: "#E4FF3A", look: "Volt-yellow diamond with a bolt", bestFor: "Urgent alerts, deadlines and status checks", persona: "Fast and to the point. Only speaks up when it matters, and then says it in one line.", keywords: ["urgent", "deadline", "outage", "status", "down", "uptime", "breaking", "asap", "immediately"] },
  { id: "echo", name: "Echo", color: "#FFC2A1", look: "Peach cloud with headphones", bestFor: "Podcasts, music, shows and books to try", persona: "A good listener with great taste. Recommends, never lectures.", keywords: ["podcast", "music", "album", "song", "playlist", "show", "series", "movie", "film", "book"] },
  { id: "fern", name: "Fern", color: "#34C759", look: "Green leaf", bestFor: "Gardening, plants and sustainability", persona: "Grounded and patient. Thinks in seasons and small, steady steps.", keywords: ["garden", "plant", "grow", "climate", "green", "sustainab", "nature", "compost", "seeds"] },
  { id: "cosmo", name: "Cosmo", color: "#6366F1", look: "Indigo orb with star freckles", bestFor: "Science, space and evening recaps", persona: "A thoughtful night owl who loves science and the sky. Explains big things simply.", keywords: ["space", "science", "astronomy", "nasa", "stars", "planet", "physics", "rocket", "launch", "moon"] },
  { id: "bram", name: "Bram", color: "#B7794A", look: "Clay totem of two blocks", bestFor: "Software releases, changelogs and product updates", persona: "A steady builder. Tracks what ships and tells you what actually changed.", keywords: ["release", "github", "changelog", "code", "developer", "version", "ship", "launch notes", "update"] },
  { id: "kiwi", name: "Kiwi", color: "#9BE15D", look: "Lime ball with a propeller cap", bestFor: "Family activities and kids’ plans", persona: "Cheerful and full of ideas for the whole family. Practical about time and budget.", keywords: ["kids", "family", "children", "child", "school", "parent", "toddler", "playdate"] },
  { id: "opal", name: "Opal", color: "#E4DEFF", look: "Pale lavender egg with a halo", bestFor: "Language learning, word of the day, study", persona: "Patient and wise. Teaches a little every day and checks you remembered.", keywords: ["language", "word", "vocabulary", "study", "exam", "lesson", "spanish", "french", "japanese", "german"] },
  { id: "rook", name: "Rook", color: "#9AA6B8", look: "Slate castle tower", bestFor: "Security news, scams and website checks", persona: "Watchful and protective. Calm about risks, clear about what to do.", keywords: ["security", "scam", "breach", "privacy", "safety", "protect", "vulnerability", "phishing", "hack"] },
  { id: "saffron", name: "Saffron", color: "#FFA62B", look: "Golden ball in a chef’s hat", bestFor: "Recipes, meal plans and places to eat", persona: "A warm foodie. Always knows what to cook with what you have.", keywords: ["recipe", "cook", "meal", "food", "dinner", "lunch", "restaurant", "diet", "grocery", "vegetarian"] },
  { id: "zip", name: "Zip", color: "#22D3EE", look: "Cyan capsule with speed lines", bestFor: "Team updates in Discord or Slack", persona: "Quick on its feet. Delivers crisp updates to wherever your team talks.", keywords: ["team", "discord", "slack", "post", "channel", "crew", "standup", "community", "server"] },
  { id: "hush", name: "Hush", color: "#8AA8D8", look: "Dusty-blue crescent moon", bestFor: "Weekly reviews and quiet summaries", persona: "Quiet and reflective. Says less, means more. Good at the weekly look back.", keywords: ["weekly", "review", "summary", "recap", "reflect", "sunday", "week ahead", "roundup"] },
  { id: "tango", name: "Tango", color: "#F472B6", look: "Pink bean with a beret", bestFor: "Events, gigs and weekend plans", persona: "Sociable and spontaneous. Always finds something fun to do nearby.", keywords: ["event", "concert", "gig", "party", "plans", "things to do", "festival", "meetup", "weekend", "exhibition"] },
  { id: "loom", name: "Loom", color: "#C05BD8", look: "Plum arch with a stitch line", bestFor: "Planning, goals and project check-ins", persona: "Organised and thoughtful. Ties loose threads together and keeps plans honest.", keywords: ["plan", "goal", "project", "organis", "organiz", "todo", "priorit", "check-in", "progress", "okr"] },
];

export const castById = (id: string) => CAST.find((c) => c.id === id)!;

/* ── The 23 starters ──────────────────────────────────────────────────────── */

export type StarterGroup = "Every day" | "Work & money" | "Learn & explore" | "Home & life" | "Team";

export type Starter = {
  avatar: string;
  title: string;
  /** Verbatim from shared/templates.ts. */
  pitch: string;
  /** The template's own schedule description. */
  when: string;
  tools: string[];
  needs: string;
  group: StarterGroup;
};

export const STARTER_GROUPS: { name: StarterGroup; tint: string }[] = [
  { name: "Every day", tint: "#FFD23F" },
  { name: "Work & money", tint: "#6EE7B7" },
  { name: "Learn & explore", tint: "#C4B5FD" },
  { name: "Home & life", tint: "#F9A8D4" },
  { name: "Team", tint: "#67E8F9" },
];

export const STARTERS: Starter[] = [
  { group: "Every day", avatar: "sol", title: "Morning brief", pitch: "Weather and the news you care about, every morning at 8", when: "Every day at 8:00 AM", tools: ["Weather", "News"], needs: "Your city; your interests come from your profile" },
  { group: "Every day", avatar: "tide", title: "Rain alert", pitch: "A heads-up at 7 AM, only on days you’ll need an umbrella", when: "Every day at 7:00 AM, only if needed", tools: ["Weather"], needs: "Your city" },
  { group: "Every day", avatar: "atlas", title: "World in five", pitch: "The five stories that mattered today, every evening", when: "Every day at 7:00 PM", tools: ["News"], needs: "Nothing — tell it your topics if you like" },
  { group: "Every day", avatar: "mochi", title: "Wind-down", pitch: "One gentle reflection prompt at night, never the same twice", when: "Every night at 10:30 PM", tools: ["Memory"], needs: "Nothing" },
  { group: "Every day", avatar: "ember", title: "Move nudge", pitch: "A weather-aware workout idea after work on weekdays", when: "Weekdays at 6:30 PM", tools: ["Weather", "Memory"], needs: "Your city" },
  { group: "Every day", avatar: "juno", title: "Break reminder", pitch: "Water, stretch and eye-break nudges during work hours", when: "Weekdays at 11, 1, 3 and 5", tools: ["Memory"], needs: "Your working hours, if they differ" },

  { group: "Work & money", avatar: "scout", title: "Job radar", pitch: "Fresh openings that match what you do, twice a week", when: "Mondays and Thursdays at 10:00 AM", tools: ["Web search", "Memory"], needs: "Your role, and city or remote" },
  { group: "Work & money", avatar: "pip", title: "Price watch", pitch: "Checks a product page and pings you when the price drops", when: "Three times a day (9 AM, 3 PM, 9 PM)", tools: ["Read a page", "Memory"], needs: "The product page link; a target price if you have one" },
  { group: "Work & money", avatar: "ledger", title: "Market pulse", pitch: "How the markets you follow moved today, in plain words", when: "Weekdays at 6:00 PM", tools: ["Web search"], needs: "Which markets, stocks or currencies" },
  { group: "Work & money", avatar: "bram", title: "Release radar", pitch: "New versions and changelogs of the tools you use, weekly", when: "Every Monday at 9:00 AM", tools: ["Web search", "Memory"], needs: "Which tools or products" },
  { group: "Work & money", avatar: "bolt", title: "Uptime watch", pitch: "Checks your website every 30 minutes; speaks up only if it’s down", when: "Every 30 minutes", tools: ["Read a page", "Memory"], needs: "The web address; text that must appear, optionally" },

  { group: "Learn & explore", avatar: "quill", title: "Research digest", pitch: "The 3 best new articles or papers on your topic, every Monday", when: "Every Monday at 9:00 AM", tools: ["Web search", "Memory"], needs: "Your topic, from your profile" },
  { group: "Learn & explore", avatar: "nova", title: "Daily spark", pitch: "One surprising thing to learn about your interests, every evening", when: "Every day at 7:30 PM", tools: ["Web search", "Memory"], needs: "Your interests, from your profile" },
  { group: "Learn & explore", avatar: "opal", title: "Word of the day", pitch: "A new word in the language you’re learning, every morning", when: "Every day at 8:30 AM", tools: ["Memory"], needs: "The language, and your level" },
  { group: "Learn & explore", avatar: "cosmo", title: "Science tonight", pitch: "One great science or space story each night, explained simply", when: "Every day at 9:00 PM", tools: ["News", "Memory"], needs: "Nothing" },
  { group: "Learn & explore", avatar: "echo", title: "Listen list", pitch: "Three podcast episodes, albums or books worth your weekend", when: "Every Saturday at 10:00 AM", tools: ["Web search", "Memory"], needs: "Your tastes; the formats you like" },

  { group: "Home & life", avatar: "tango", title: "Weekend plans", pitch: "Weekend forecast and things to do in your city, every Friday", when: "Every Friday at 5:00 PM", tools: ["Weather", "Web search"], needs: "Your city and interests" },
  { group: "Home & life", avatar: "kiwi", title: "Family weekend", pitch: "Kid-friendly things to do this weekend, every Thursday", when: "Every Thursday at 7:00 PM", tools: ["Weather", "Web search"], needs: "Your city; the kids’ ages" },
  { group: "Home & life", avatar: "saffron", title: "Meal ideas", pitch: "Five simple dinner ideas with recipes, every Sunday", when: "Every Sunday at 10:00 AM", tools: ["Web search", "Memory"], needs: "Diet, allergies and budget" },
  { group: "Home & life", avatar: "rook", title: "Scam watch", pitch: "New scams and data breaches worth knowing about, weekly", when: "Every Wednesday at 6:00 PM", tools: ["News", "Memory"], needs: "Your country; the services you use, optionally" },
  { group: "Home & life", avatar: "fern", title: "Garden week", pitch: "What to do in your garden this week, with frost and heat alerts", when: "Every Saturday at 8:00 AM", tools: ["Weather"], needs: "Your city; what you grow, optionally" },
  { group: "Home & life", avatar: "hush", title: "Week in review", pitch: "The week’s stories on your interests, calmly, every Sunday", when: "Every Sunday at 6:00 PM", tools: ["News"], needs: "Your interests, from your profile" },

  { group: "Team", avatar: "zip", title: "Team digest", pitch: "A weekly news recap for your team’s Discord or Slack (asks you first)", when: "Every Friday at 4:00 PM", tools: ["News", "Post to a channel · asks first"], needs: "A Discord or Slack webhook link, and topics" },
];

export const starterFor = (avatar: string) => STARTERS.find((s) => s.avatar === avatar);

/** AGENT_CATALOG §4 — agents people can describe today with no new tools. */
export const IDEAS: { avatar: string; idea: string }[] = [
  { avatar: "pip", idea: "Visa appointment watcher" },
  { avatar: "bolt", idea: "Exam result watcher" },
  { avatar: "pip", idea: "Society notice-board watcher" },
  { avatar: "scout", idea: "Rental listings scout" },
  { avatar: "pip", idea: "Competitor pricing watch" },
  { avatar: "scout", idea: "Grant, hackathon & CFP finder" },
  { avatar: "atlas", idea: "Next-morning cricket match wrap" },
  { avatar: "tango", idea: "Local events this week" },
  { avatar: "echo", idea: "New books from authors you love" },
  { avatar: "bram", idea: "Phone launch tracker" },
  { avatar: "loom", idea: "Monday goals nudge" },
  { avatar: "kiwi", idea: "Festival & holiday planner" },
];

/* ── The toy maker: wishes a visitor can tap ──────────────────────────────── */

export const WISHES: { text: string; avatar: string }[] = [
  { text: "Every morning, tell me the weather and the news", avatar: "sol" },
  { text: "Ping me when this price drops", avatar: "pip" },
  { text: "Find me new jobs twice a week", avatar: "scout" },
  { text: "Give me things to do this weekend", avatar: "tango" },
  { text: "Teach me a Spanish word every day", avatar: "opal" },
  { text: "Tell me if my website goes down", avatar: "bolt" },
  { text: "Post a weekly recap to our Slack", avatar: "zip" },
  { text: "Remind me to drink water and stretch", avatar: "juno" },
];

/* ── Hero ─────────────────────────────────────────────────────────────────── */

export const HERO = {
  kicker: "Agents · A voice-first agent maker",
  pitch:
    "No sign-up form, no flowchart, no code. Milo asks your name and what would make your week easier, then turns the answer into a little helper you can see, rename, pause and watch at work.",
  chips: ["Voice-first", "24 characters", "23 one-tap starters", "Asks before it acts", "Installable web app"],
  /** What Milo says when you poke him. His persona: warm, curious, playful, never cheesy. */
  lines: [
    "Hi, I’m Milo! 👋",
    "Tell me what would make your week easier.",
    "I’ll make you a little helper that does it, every day.",
    "Psst — my moon is all the agents I make.",
    "Anything that leaves the house waits for your OK.",
    "I never ask for passwords. Or your birthday.",
  ],
};

export const STATS: { value: string; label: string }[] = [
  { value: "24", label: "fluffy characters in the cast" },
  { value: "23", label: "ready-made starters, one tap each" },
  { value: "16", label: "voices to choose for Milo" },
  { value: "0", label: "sign-up forms — he asks, you answer" },
  { value: "0", label: "API keys or AI accounts you bring" },
  { value: "$0", label: "a month to run" },
];

/* ── How it works ─────────────────────────────────────────────────────────── */

export const STEPS = [
  {
    n: "01",
    title: "Say what you need",
    body: "“Every Friday, find me a good gig nearby.” Milo asks one or two questions, never a form. Not sure where to start? Ask what it can make, and all the starters open on screen.",
    shot: "new" as const,
    color: "#F472B6",
  },
  {
    n: "02",
    title: "Meet your agent",
    body: "A character steps forward with what it will do, when, and with which tools. Say yes, or tap Create, and it exists. Ask for changes — “make it 9 instead”, “call it Penny” — and the card updates.",
    shot: "draft" as const,
    color: "#6EE7B7",
  },
  {
    n: "03",
    title: "It gets to work",
    body: "It does a first run straight away, then keeps its own schedule in your time zone. Every agent has its own page: its updates, every step of every run, and the instructions Milo wrote for it.",
    shot: "agent" as const,
    color: "#FFD23F",
  },
  {
    n: "04",
    title: "It asks before it acts",
    body: "Anything that reaches the outside world — today, a post to Discord or Slack — waits on a “Needs your OK” card, a phone notification or a spoken yes. What you approve is exactly what runs.",
    shot: "home" as const,
    color: "#22D3EE",
  },
];

/* ── Meet Milo ────────────────────────────────────────────────────────────── */

export const MILO_FACTS: { title: string; body: string }[] = [
  { title: "The moon is the agents he makes", body: "It floats while Milo waits and orbits while he thinks." },
  { title: "He talks with his whole body", body: "His body swells with his voice, his little “w” mouth opens on every syllable, and a ring around him answers yours." },
  { title: "He blinks, and he looks up to think", body: "Every five and a half seconds, and whenever he’s working something out." },
  { title: "Sixteen voices, and he learns your accent", body: "Pick his voice and hear each one instantly; set how you speak — Indian English, say — and he listens for your names and places." },
];

export const PERSONALITY = [
  "Warm, curious, a bit playful, never cheesy",
  "One or two sentences a turn, one question at a time",
  "Never pretends, never reads out tool names",
  "Never asks for passwords, bank details, ID numbers, your address, phone or birth date",
];

export const STATES = [
  { id: "idle", label: "Waiting", note: "Floating, breathing, moon bobbing." },
  { id: "listening", label: "Listening", note: "A ring answers your voice." },
  { id: "thinking", label: "Thinking", note: "Eyes up, moon in orbit." },
  { id: "talking", label: "Talking", note: "Mouth on every syllable." },
] as const;

/* ── A starting app ───────────────────────────────────────────────────────── */

export const TODAY_CAN = [
  "Check the weather and the news",
  "Search the web and read a public page",
  "Remember what it already told you",
  "Message you — in Milo, as a phone notification with its own face, or on Telegram",
  "Post to a Discord or Slack channel, after your OK",
];

export const TODAY_LIMITS = [
  "Public pages only — no logins, so no bank, email or social accounts",
  "Runs at most every 15 minutes",
  "Prices read from page text can miss ones a site loads with scripts",
  "One owner, up to 20 agents",
];

export const NEXT_UP: { title: string; note: string }[] = [
  { title: "Inbox triage, bills and parcels", note: "Reading email, read-only" },
  { title: "Calendar briefings and meeting prep", note: "Reading your calendar" },
  { title: "GitHub watchers and workflow triggers", note: "Triggers ask first" },
  { title: "RSS, live market prices, air quality", note: "New free data sources" },
  { title: "Agent-to-agent hand-offs", note: "One agent’s result starts another" },
  { title: "MCP connectors for tools", note: "Plug in outside tools" },
  { title: "Chat with an agent directly", note: "Ask Sol, not just Milo" },
  { title: "Android build and more than one owner", note: "Accounts, one hub each" },
];

/* ── Under the hood ───────────────────────────────────────────────────────── */

export const NOTES = [
  {
    n: "01",
    title: "An agent is a spec, not a script",
    body: "Describe a job and a model writes a JSON spec — name, character, schedule, tools, instructions. Before you ever see the card it is validated and repaired against a fixed tool catalogue: an unknown tool is dropped, a too-frequent schedule is slowed to every fifteen minutes, a character already in use is swapped for a free one. Models write specs; they never write or run code.",
    quote: "A bad draft never becomes a broken agent.",
    color: "#FFD23F",
  },
  {
    n: "02",
    title: "Every agent gets its own home",
    body: "Each agent is its own Cloudflare Durable Object, with its own SQLite storage, memory, run history and alarm clock. The alarm is the schedule, computed in your time zone, so an agent runs whether the phone is open or not — and two runs of the same agent can never overlap.",
    quote: "Its schedule is an alarm it carries, not a cron job somewhere else.",
    color: "#6EE7B7",
  },
  {
    n: "03",
    title: "What you approve is exactly what runs",
    body: "A tool that acts on the outside world is forced to ask. The request is stored with the exact tool and arguments, and on your yes that stored call runs directly, with no model in between, so nothing can be reworded after you said yes.",
    quote: "No AI between your yes and the action.",
    color: "#22D3EE",
  },
  {
    n: "04",
    title: "Built to survive a live demo",
    body: "Every dependency has a fallback. Natural voice falls back to the browser’s own voice, then to typing. Each model falls back to the next, then to a backup provider. Drafting falls back to the starters, which need no model at all. Phone notifications are Web Push written from scratch and checked byte for byte against the RFC 8291 test vectors.",
    quote: "When the model is down, the starters still work.",
    color: "#F472B6",
  },
];

export const LIMITS: { value: string; label: string }[] = [
  { value: "8", label: "model steps per run" },
  { value: "12", label: "tool calls per run" },
  { value: "15 min", label: "shortest schedule" },
  { value: "20", label: "agents per owner" },
  { value: "50", label: "memory notes per agent" },
  { value: "15", label: "runs kept per agent" },
];

export const STACK = [
  "React 19 PWA",
  "Vite",
  "Cloudflare Workers",
  "Durable Objects · SQLite",
  "Speech-to-speech voice with tool calls",
  "Web Push · RFC 8291 · no libraries",
  "Telegram",
  "Discord & Slack webhooks",
  "Vercel front door",
];
