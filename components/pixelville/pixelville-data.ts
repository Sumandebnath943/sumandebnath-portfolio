/* ═══════════════════════════════════════════════════════════════════════════
 *  PixelVille — landing-page data module
 *  A self-governing pixel-art village simulation. Everything here is copy +
 *  a palette; the page (app/games/pixelville/page.tsx) and the client visuals
 *  (PixelvilleVisuals.tsx) render it. Facts are drawn from the project bible.
 * ═══════════════════════════════════════════════════════════════════════════ */

/* ── Palette ──────────────────────────────────────────────────────────────
   A cozy, game-like winter-dusk theme that matches the game's own dark HUD
   chrome (slate panels) with a colourful pixel-village accent set. */
export const PV = {
  night: "#0c1120", //  page base — deep night sky
  nightDeep: "#080b16", //  darkest wells
  panel: "#161d2e", //  card slate — matches the in-game HUD panels
  panelHi: "#1d2740", //  raised panel
  line: "rgba(255,255,255,0.09)",
  lineSoft: "rgba(255,255,255,0.055)",
  snow: "#F5F8FC", //  brightest text / snow
  text: "#E4EAF4",
  muted: "#8B97AD",
  faint: "#5C6880",

  /* pixel-village accent hues */
  gold: "#F5B94A", //  coins · lead accent
  goldSoft: "rgba(245,185,74,0.14)",
  sky: "#5AB6EA", //  water · rivers
  grass: "#5FC061", //  parks · residential
  fire: "#EF5B45", //  fire · red roofs
  plum: "#B48CE8", //  culture · night
  amberDeep: "#C98A2E",
} as const;

export const LINKS = {
  live: "https://pixelville.houseofnamus.com", // canonical custom domain for the live game
  source: "https://github.com/Sumandebnath943/pixelville",
} as const;

export const TAGLINES = {
  hero: "A village that remembers.",
  pitch:
    "You don't run the village — you start it, and then it lives. Drop a building and PixelVille figures out the rest: roads lay themselves, families move in, people get jobs and remember where they've been, a mayor gets elected, disasters strike and neighbours grab buckets — and a hamlet grows into a metropolis while you watch.",
  soundbite: "Anyone can generate a village. PixelVille generates a society.",
} as const;

/* ── Images (public/pixelville/*) ─────────────────────────────────────────
   width/height are the real pixel dimensions (next/image needs them). */
export type Shot = { src: string; w: number; h: number; alt: string };

export const IMG = {
  hero: {
    src: "/pixelville/Hero.png",
    w: 1365,
    h: 767,
    alt: "A snow-covered PixelVille metropolis at Christmas, skyscrapers and a river running through it, with the full game HUD overlaid",
  },
  fullUi: {
    src: "/pixelville/game screen.png",
    w: 1365,
    h: 767,
    alt: "The complete PixelVille interface — building palette sidebar, top HUD bar, a living winter town and the PVTV news panel",
  },
  night: {
    src: "/pixelville/night.png",
    w: 1121,
    h: 687,
    alt: "PixelVille at night — the lighting engine punches warm pools of light from glowing windows, street lamps and car headlights",
  },
  mountains: {
    src: "/pixelville/Mountain Village.png",
    w: 610,
    h: 514,
    alt: "Two huge 5×5 snow-capped mountain ranges with hiking trails, ringed by colourful houses",
  },
  river: {
    src: "/pixelville/by the river.png",
    w: 986,
    h: 474,
    alt: "A river winding through a snowy PixelVille district, bridged by roads, docks along the banks",
  },
  lakes: {
    src: "/pixelville/lakes and sea.png",
    w: 567,
    h: 555,
    alt: "A frozen lake and a sandy beach meeting the sea, houses and a fire station clustered around the shore",
  },
  christmas: {
    src: "/pixelville/Christmas is beautiful in PixelVille.png",
    w: 128,
    h: 169,
    alt: "A lit Christmas tree raised in the middle of PixelVille, buildings strung with festive lights",
  },
  colourful: {
    src: "/pixelville/more views 2.png",
    w: 770,
    h: 482,
    alt: "Colourful apartments and mansions across a snowy PixelVille neighbourhood",
  },
  shops: {
    src: "/pixelville/more views.png",
    w: 226,
    h: 401,
    alt: "A row of hand-drawn procedural shops and services in PixelVille",
  },
  train: {
    src: "/pixelville/train system.png",
    w: 749,
    h: 421,
    alt: "A running train crossing the snowy landscape on hand-laid railway tracks, snowmen dotted around",
  },
  airport: {
    src: "/pixelville/airport.png",
    w: 452,
    h: 316,
    alt: "A PixelVille airport with a terminal, runway and a plane on the tarmac",
  },
  helipad: {
    src: "/pixelville/helipad.png",
    w: 217,
    h: 259,
    alt: "A helipad marked with a big H, ready for helicopter flights between pads",
  },
  topbar: {
    src: "/pixelville/Top Bar.png",
    w: 1091,
    h: 64,
    alt: "The PixelVille top HUD bar — day and time, season, weather, tier, and live population, employment, wealth, safety, happiness and leadership stats",
  },
  sidebar: {
    src: "/pixelville/side bar.png",
    w: 229,
    h: 767,
    alt: "The PixelVille building palette — tools, residential, and work & industry buildings, each drawn as procedural pixel art",
  },
  tvMinimap: {
    src: "/pixelville/TV and Minimap.png",
    w: 383,
    h: 142,
    alt: "The PVTV live news panel, the RCI demand meters, and the 128×128 minimap",
  },
  villagerCard: {
    src: "/pixelville/villager card.png",
    w: 232,
    h: 288,
    alt: "The villager inspector — Kai Nakamura, 37, mood 79%, a dock worker, married, 'the curious type · knows 132 places', with a memory: 'Day 21: welcomed little Lina'",
  },
  buildingCard: {
    src: "/pixelville/building card.png",
    w: 228,
    h: 384,
    alt: "The building inspector for an Apartments block — connected to roads, land value, savings, its ten named residents, household mood, and how many places its people know",
  },
} satisfies Record<string, Shot>;

/* ── By the numbers ───────────────────────────────────────────────────────── */
export type Stat = { value: number; prefix?: string; suffix?: string; label: string; sub: string };
export const STATS: Stat[] = [
  { value: 11700, prefix: "~", label: "lines of JS", sub: "hand-written, 14 modules" },
  { value: 0, label: "dependencies", sub: "no frameworks, no libraries" },
  { value: 0, label: "image assets", sub: "every pixel is procedural code" },
  { value: 90, prefix: "~", label: "building types", sub: "teastalls → skyscrapers" },
  { value: 5, label: "personality traits", sub: "per villager" },
  { value: 22, label: "side-gig jobs", sub: "for anyone between careers" },
  { value: 7, label: "transport modes", sub: "car → plane" },
  { value: 5, label: "village tiers", sub: "Hamlet → Metropolis" },
];

/* ── The core USP — living minds ─────────────────────────────────────────── */
export type Usp = { n: string; title: string; body: string; proof: string; hue: keyof typeof PV };
export const USPS: Usp[] = [
  {
    n: "01",
    title: "Knowledge",
    hue: "sky",
    body:
      "Every villager holds a private set of buildings they've actually encountered. You grow up knowing only your own neighbourhood; new places spread by word of mouth in the street, by a PVTV broadcast, or by living nearby when a place opens.",
    proof: "You can't apply for a job you've never heard of — a new shop across town is genuinely undiscovered until word reaches people.",
  },
  {
    n: "02",
    title: "Memory",
    hue: "gold",
    body:
      "Each person keeps an episodic diary — fires, jackpots, weddings, promotions, business failures — every entry tagged with a feeling from −2 to +2. Strong memories linger for life; everyday ones fade after ~20 days.",
    proof: "A cautious soul who was burgled avoids that place for days. Strong stories travel as gossip and shift the listener's mood.",
  },
  {
    n: "03",
    title: "Personality",
    hue: "plum",
    body:
      "Five stable traits — social, caution, ambition, thrift, curiosity — derived deterministically from each villager's seed, so they're consistent and survive save/load.",
    proof: "The thrifty read the menu prices, the social bring friends along, the ambitious hunt better jobs, the curious try the unknown.",
  },
  {
    n: "04",
    title: "Decisions",
    hue: "grass",
    body:
      "When a villager picks where to spend the evening, PixelVille scores every option they know — by distance, price (weighted by thrift), how much they like the place, whether they fear it, whether it's new, and how busy it is.",
    proof: "The result is a chosen destination, not a random one. A broke week pushes them toward free fun — the park, the library.",
  },
];

export const TRAITS = ["social", "caution", "ambition", "thrift", "curiosity"] as const;

/* The two things minds unlock beyond the four cards */
export const MIND_EXTRAS = [
  {
    title: "Relationships & ambitions",
    body:
      "Friendships form through street encounters, deepen with contact, and cool and disappear without it. Ambitions are real economic arcs — a shopkeeper saves startup capital, buys a plot, builds their shop and quits the day job to run it.",
  },
  {
    title: "Click anyone, read their whole life",
    body:
      "The villager inspector shows any person's age, mood, job and wage, savings, loans, closest friend, favourite haunt, and their last few memories. A golden ring follows whoever you're watching.",
  },
];

/* ── Self-governance ──────────────────────────────────────────────────────── */
export type Candidate = { emoji: string; type: string; tag: string; builds: string; hue: keyof typeof PV };
export const CANDIDATES: Candidate[] = [
  { emoji: "💖", type: "Visionary", tag: "pure heart", builds: "Parks, schools, libraries, hospitals, culture, temples & churches.", hue: "plum" },
  { emoji: "📈", type: "Business", tag: "sharp mind", builds: "Shops, offices, factories, malls, banks, rail, the exchange, an airport.", hue: "sky" },
  { emoji: "🧱", type: "Steady", tag: "dependable planner", builds: "Fire, police, schools, parks, buses, the post office, water towers.", hue: "grass" },
  { emoji: "🐍", type: "Corrupt", tag: "smooth talker", builds: "Mostly a town hall for himself — and skims the treasury until auditors catch up.", hue: "fire" },
];

export const GOV_POINTS = [
  {
    title: "A full campaign week",
    body: "Every in-game year (28 days) brings a real election — preceded by a 7-day campaign: coloured banners strung over the streets, daily rallies with a crowd around a candidate on a soapbox, and promises tied to the town's actual needs.",
  },
  {
    title: "Everyone votes on their own life",
    body: "Each ballot is computed from that villager's quality of life, employment, town safety, active grievances and stable leanings. A good mayor is re-elected; a bad one is voted out; the corrupt are strongly rejected by people with a good life.",
  },
  {
    title: "The mayor actually governs",
    body: "Gets a town hall built, moves into the office, commutes there daily, flies a flag over the roof, collects taxes into a treasury, and spends it on the town's most pressing needs — a district that outgrows one fire station gets a second.",
  },
  {
    title: "Grievances, riots & resignation",
    body: "You set the tax policy — low, normal or high. Genuine unhappiness produces riots of the genuinely unhappy, and a disgraced mayor can be forced to resign, triggering a fresh election.",
  },
];

export const COMMUNITY = {
  title: "And when government fails — the village builds it itself.",
  body:
    "The most on-brand mechanic: when town hall ignores a real need for days, residents pool their savings and build it themselves — fire stations and police first, then schools, homes, shops, parks. After a fire or a collapse, neighbours rush to the site, crews roll out, the street clears the rubble together, and the community rebuilds.",
};

/* ── Why it's different (comparison) ──────────────────────────────────────── */
export const COMPARE: { them: string; us: string }[] = [
  { them: "Agents follow fixed schedules or random walks", us: "Agents make scored decisions from knowledge, memory, taste, price and mood" },
  { them: "“NPCs” are interchangeable", us: "Every villager is a named person with 5 traits, a memory, and friendships you can inspect" },
  { them: "The world is a static backdrop", us: "Buildings spread by word of mouth — a new shop is undiscovered until people hear of it" },
  { them: "The player commands everything", us: "The village governs itself — real elections, self-building communities" },
  { them: "Built on a heavy engine + asset packs", us: "Zero dependencies, zero images — every pixel is procedural code" },
  { them: "Events are numbers changing off-screen", us: "Every event is rendered — fire trucks, bucket brigades, rallies, riots, road crews" },
  { them: "Save is a snapshot of tiles", us: "Save preserves every villager's memories, friendships and businesses — a person is the same after a reload" },
];

/* ── Everything else it does (feature grid) ───────────────────────────────── */
export type FeatureGroup = { icon: string; title: string; hue: keyof typeof PV; points: string[] };
export const FEATURES: FeatureGroup[] = [
  {
    icon: "💰",
    title: "A real economy",
    hue: "gold",
    points: [
      "Wages, prices, household savings and 8 distinct lifestyles",
      "Business founding with startup capital & bank loans",
      "A 5-ticker stock market with its own exchange",
      "A casino (the house usually wins), the lottery, daily utility bills",
      "Businesses boom or quietly go under on real footfall",
    ],
  },
  {
    icon: "🚨",
    title: "Crime & justice",
    hue: "fire",
    points: [
      "Unemployment breeds night-time burglars — banks & malls are prime targets",
      "Alarms ring; police cars race out with flashing lights",
      "A courthouse boosts convictions; offenders are jailed",
      "The 🛡️ safety stat feeds happiness and votes",
    ],
  },
  {
    icon: "🚌",
    title: "Full transport",
    hue: "sky",
    points: [
      "Cars, buses and taxis on the road network",
      "Railways with running trains between stations",
      "Docks with boats & ferries, a fishing fleet",
      "Helicopters between pads, and an airport with planes that bring visitors",
    ],
  },
  {
    icon: "🌦️",
    title: "A living world",
    hue: "plum",
    points: [
      "Four seasons — blossoms, summer fireflies, autumn leaves, winter snow & frozen lakes",
      "Weather with rain streaks, storms, puddles, cloud shadows and rainbows",
      "Real nights — a lighting engine punches warm light from windows, lamps & headlights",
      "People respond: umbrellas out, the car taken sooner",
    ],
  },
  {
    icon: "🌪️",
    title: "Disasters that escalate",
    hue: "fire",
    points: [
      "Fires that leap to neighbours if left unattended",
      "Earthquakes that rupture gas lines into secondary fires",
      "Floods that wash out roads — road crews relay them",
      "Droughts that halve farm pay, and roaming tornadoes",
      "Tense but forgiving — a building is only ever lost to an escalation you could have watched",
    ],
  },
  {
    icon: "🎉",
    title: "Festivals & ambient life",
    hue: "grass",
    points: [
      "A 28-day festive calendar — Easter, Diwali diyas, a full Christmas season with fireworks",
      "Village tiers, each a named celebration with fireworks",
      "Hikers, birds, dogs, fireflies, ducks, butterflies, tourists, beachgoers",
      "A night sky of hot-air balloons, shooting stars, a UFO and unexplained lights",
    ],
  },
];

/* ── How it's built ───────────────────────────────────────────────────────── */
export const TECH: { title: string; body: string }[] = [
  {
    title: "Zero dependencies, zero image assets",
    body: "No frameworks, no libraries, no image files. Every pixel-art sprite — every building, villager and vehicle — is generated procedurally in code. The whole thing is a folder of static files.",
  },
  {
    title: "A from-scratch canvas renderer",
    body: "A single HTML5 canvas with a cached ground layer, painter-sorted entities, soft cast shadows, and a day/night lighting engine that punches warm light pools out of the darkness.",
  },
  {
    title: "Procedural WebAudio synth",
    body: "Jingles and effect blips are synthesised on the fly with WebAudio — there isn't a single audio file in the project.",
  },
  {
    title: "Intelligent A* auto-roads",
    body: "Drop any building and a Dijkstra/A* search connects it to the network — reusing roads, carving around mountains, and only bridging rivers when a detour would be worse.",
  },
];

/* the auto-road cost table, for the 'watch it think' demo */
export const ROAD_COSTS: { terrain: string; cost: string; note: string; hue: keyof typeof PV }[] = [
  { terrain: "Existing road", cost: "0.15", note: "strongly reused & merged", hue: "gold" },
  { terrain: "Grass", cost: "1", note: "normal", hue: "grass" },
  { terrain: "Trees", cost: "1.8", note: "passable but avoided", hue: "grass" },
  { terrain: "Water", cost: "7", note: "becomes a bridge only when worth it", hue: "sky" },
  { terrain: "Rock / buildings", cost: "∞", note: "impassable — roads carve around", hue: "muted" },
];

/* the interface panels, for the HUD section */
export const HUD_PANELS: { title: string; body: string; shot: Shot }[] = [
  {
    title: "The top bar",
    body: "Day, weekday and time; season, weather and tier chips; and live stats — 👥 population, 💼 employment, 💰 wealth, 🛡️ safety, 😊 happiness and 🗳️ leadership.",
    shot: IMG.topbar,
  },
  {
    title: "The building palette",
    body: "Click a building or tool, then click the map — the tool stays armed. Every item, on hover, tells you what it will actually do for the town.",
    shot: IMG.sidebar,
  },
  {
    title: "PVTV, RCI & the minimap",
    body: "An on-screen village news channel with a scrolling ticker, the Residential / Commercial / Industrial demand meters, and a click-to-jump 128×128 minimap.",
    shot: IMG.tvMinimap,
  },
];

/* gallery mosaic — the visually-heavy showcase */
export const GALLERY: Shot[] = [
  IMG.night,
  IMG.mountains,
  IMG.river,
  IMG.colourful,
  IMG.lakes,
  IMG.train,
  IMG.airport,
  IMG.shops,
  IMG.helipad,
];
