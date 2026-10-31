/* ═══════════════════════════════════════════════════════════════════════════
 *  PixelVille: Next Dimension — flagship showcase data module
 *  Every number, mechanic, control, shift, and A–Z system entry here is drawn
 *  directly from the game's headless simulation (src/sim/*), 3D renderer
 *  (src/gfx/*, src/render/*), and 170-test Vitest suite.
 * ═══════════════════════════════════════════════════════════════════════════ */

export const ND = {
  night: "#080c15", // page base — deep dusk navy
  nightDeep: "#05080f", // darkest wells & terminal inset
  panel: "#0f1626", // frosted charcoal-navy HUD card
  panelHi: "#162036", // elevated glass surface
  panelGlass: "rgba(15, 22, 38, 0.78)",
  line: "rgba(255, 255, 255, 0.12)",
  lineHi: "rgba(240, 194, 122, 0.34)",
  lineSoft: "rgba(255, 255, 255, 0.07)",

  /* Typography — every level passes WCAG AA (≥ 4.5:1) on night & panel */
  snow: "#F7FAFF",
  text: "#E4ECF7",
  muted: "#A4B3CB", // ~7.8:1 on #0f1626
  faint: "#8C9CB8", // ~5.7:1 on #0f1626

  /* Signature PixelVille: Next Dimension accents */
  gold: "#F0C27A", // extruded 3D logo faces & Founder's ground ring
  goldBright: "#F7D294",
  goldSoft: "rgba(240, 194, 122, 0.14)",
  violet: "#A58BFF", // Founder's violet coat & 3D logo depth
  violetDeep: "#6D4AFF",
  violetSoft: "rgba(165, 139, 255, 0.14)",
  sky: "#56BDF4", // Preetham sky, Gerstner water & transit
  skySoft: "rgba(86, 189, 244, 0.14)",
  emerald: "#4ADE80", // living valley, parks & healthy economy
  emeraldSoft: "rgba(74, 222, 128, 0.14)",
  crimson: "#F87171", // Wanted chases, fire & rolling blackouts
  crimsonSoft: "rgba(248, 113, 113, 0.14)",
  amber: "#FBBF24", // road chevrons, streetlights & warnings
} as const;

export type NdHue = "gold" | "violet" | "sky" | "emerald" | "crimson" | "amber";

export const HUE_HEX: Record<NdHue, string> = {
  gold: ND.gold,
  violet: ND.violet,
  sky: ND.sky,
  emerald: ND.emerald,
  crimson: ND.crimson,
  amber: ND.amber,
};

export const LINKS = {
  live: "https://pixelvillenextdimension.houseofnamus.com",
  v1Page: "/games/pixelville",
  v1Live: "https://pixelville.houseofnamus.com",
} as const;

/* ── All 20 real screenshots from public/pixelville-nd/* ───────────────────
   Exact pixel dimensions measured from the PNG headers for zero CLS. */
export type Shot = {
  id: string;
  src: string;
  w: number;
  h: number;
  title: string;
  caption: string;
  alt: string;
  tag: "Street & Avatar" | "God Planner" | "World & Shaders" | "HUD & Controls";
};

export const IMG = {
  loading: {
    id: "loading",
    src: "/pixelville-nd/loading screen.png",
    w: 1365,
    h: 767,
    title: "Key art & 5-stage world builder",
    caption: "The village builds slice-by-slice across Records, Land, Buildings, Web-Worker Textures, and pre-compiled Shaders.",
    alt: "PixelVille: Next Dimension loading screen showing a golden-hour 3D mountain valley village with river, bridge, railway and the 3D gold-and-violet logo",
    tag: "World & Shaders",
  },
  landing: {
    id: "landing",
    src: "/pixelville-nd/game menu screen.png",
    w: 1365,
    h: 767,
    title: "Live aerial flyover landing screen",
    caption: "Opens over a live real-time simulation flyover of your active town (Rosedale, 250 villagers) with one-click Auto Village.",
    alt: "PixelVille: Next Dimension main menu hovering live over Rosedale with 250 active villagers, Continue button, New village, Auto village and Load cards",
    tag: "HUD & Controls",
  },
  driving: {
    id: "driving",
    src: "/pixelville-nd/car driving.png",
    w: 1365,
    h: 724,
    title: "Street-level motoring & signalled junctions",
    caption: "Driving the Founder's saloon toward a zebra-striped 4-way junction with street trees, top frosted HUD, PVTV Live, and minimap.",
    alt: "Third-person chase camera behind the Founder's blue saloon car approaching a zebra crossing and traffic lights in PixelVille: Next Dimension",
    tag: "Street & Avatar",
  },
  phone: {
    id: "phone",
    src: "/pixelville-nd/onscreen phone.png",
    w: 1364,
    h: 767,
    title: "God Avatar at dusk & the 11-app PVTel smartphone",
    caption: "Pressing Tab pulls up PVTel — Map GPS, Jobs, Ride, Contacts, Wallet, Garage, PVTV, Tasks, Camera, Planner, and Settings.",
    alt: "The Founder avatar standing at a sunset crossroads with the golden ring at his feet and the PVTel in-game smartphone open showing 11 apps",
    tag: "Street & Avatar",
  },
  lodge: {
    id: "lodge",
    src: "/pixelville-nd/graphics (3).png",
    w: 1365,
    h: 767,
    title: "The Founder's Lodge, private driveway & live gossip",
    caption: "Your home, spawn point, and legal driveway — while PVTV logs real street hearsay ('Hugo Yilmaz told Felix Moreau about the House').",
    alt: "Street-level view outside the Founder's Lodge with the Founder's saloon parked in the driveway, interaction prompt, rolling blackout alert and PVTV gossip",
    tag: "Street & Avatar",
  },
  hospital: {
    id: "hospital",
    src: "/pixelville-nd/graphics (4).png",
    w: 1365,
    h: 767,
    title: "Enterable procedural facades & 4-service rail news",
    caption: "Stepping up to the 4-storey Hospital's glass doors ('E go into the Hospital') — one of 81 building types with dressed 3D rooms.",
    alt: "Street-level view outside the 4-storey Hospital in PixelVille: Next Dimension with recessed sash windows, glass doors and PVTV reporting four railway services",
    tag: "Street & Avatar",
  },
  wasted: {
    id: "wasted",
    src: "/pixelville-nd/wasted screen.png",
    w: 1365,
    h: 526,
    title: "GTA-style 'Wasted' meets closed-loop hospital debt",
    caption: "Crash at ~80 km/h and you wake up patched at the ward: '$90 bill ($40 owed to the hospital)' and your wrecked saloon towed.",
    alt: "PixelVille: Next Dimension WASTED screen reading: Patched up at the hospital — the bill was $90 ($40 owed to the hospital), saloon towed away badly damaged",
    tag: "Street & Avatar",
  },
  plannerHigh: {
    id: "plannerHigh",
    src: "/pixelville-nd/god's eye view.png",
    w: 1365,
    h: 767,
    title: "The Planner (P) — aerial God's-Eye builder & God View",
    caption: "Fly seamlessly up into the 8-tab building palette (87 building types + terrain tools) with the storm-clearing God View eye toggle.",
    alt: "High-altitude aerial God's-Eye Planner view over Rosedale's avenue grid with the 8-tab Shops & Services building palette on the left",
    tag: "God Planner",
  },
  plannerTown: {
    id: "plannerTown",
    src: "/pixelville-nd/god's eye view (2).png",
    w: 1365,
    h: 767,
    title: "Town centre bays, church plaza & Lost Dog errand",
    caption: "Closer Planner view over shops, parked cars in front bays, and PVTV broadcasting a live runaway-dog errand ('Bramble slipped out...').",
    alt: "Mid-altitude aerial God Mode view of Rosedale's church, plaza and shops while PVTV announces a lost dog errand on the street",
    tag: "God Planner",
  },
  plannerRail: {
    id: "plannerRail",
    src: "/pixelville-nd/god's eye view - railway.png",
    w: 1365,
    h: 767,
    title: "Wide-bend railways, mountain base & Intercity Express",
    caption: "A multi-car freight train curving past the rugged mountain into the station as the national branch line joins the map edge.",
    alt: "Aerial Planner view of a freight train rounding wide curved railway tracks beside a mountain into Rosedale train station",
    tag: "God Planner",
  },
  water: {
    id: "water",
    src: "/pixelville-nd/graphics.png",
    w: 1365,
    h: 767,
    title: "Gerstner waves, Fresnel mirror water & banded shores",
    caption: "Morning reflection of houses and trees across physical water, framed by shingle strands, boulders, reeds, and grass.",
    alt: "Morning street-level view by the river shore in PixelVille: Next Dimension showing Fresnel mirror water reflections, boulders and reeds",
    tag: "World & Shaders",
  },
  foliage: {
    id: "foliage",
    src: "/pixelville-nd/graphics (2).png",
    w: 1365,
    h: 767,
    title: "Procedural multi-species trees & streamed grass",
    caption: "Recursive birch and oak crowns across 4 continuous LODs, streamed grass blades, and live 1-to-1 villager gossip in PVTV.",
    alt: "Morning park and shoreline view with procedural birch and oak trees, streamed grass blades, boulders and the Founder avatar",
    tag: "World & Shaders",
  },
  shadows: {
    id: "shadows",
    src: "/pixelville-nd/graphics - shadows.png",
    w: 1365,
    h: 767,
    title: "Preetham golden-hour sky & crisp kerb shadows",
    caption: "Auto-exposure meters the sky in view so low-sun dusk stays gold instead of blowing out white, casting long tree and signal shadows.",
    alt: "Golden-hour sunset at 16:58 casting long tree, lamp-post and kerb shadows across zebra crossings under a Preetham physical sky",
    tag: "World & Shaders",
  },
  night: {
    id: "night",
    src: "/pixelville-nd/night view.png",
    w: 1365,
    h: 767,
    title: "Nightfall, warm lamp pools & starry sky",
    caption: "After dark, street lamps cast warm ground pools, interior-mapped windows light up, and exposure-tracked bloom keeps walls clean.",
    alt: "Night view in PixelVille: Next Dimension showing starry sky, warm pools of light from street lamps illuminating trees and zebra crossings",
    tag: "World & Shaders",
  },
  guide: {
    id: "guide",
    src: "/pixelville-nd/game first time guide.png",
    w: 409,
    h: 162,
    title: "9-step interactive First-Day Guide",
    caption: "Step 7 of 9 ('Meet the neighbours'): device-aware prompts guide new players from empty valley to talking with their first family.",
    alt: "Interactive onboarding card step 7 of 9: Meet the neighbours — walk up to a villager or knock at their door and press E to talk",
    tag: "HUD & Controls",
  },
  speed: {
    id: "speed",
    src: "/pixelville-nd/fast forward time mode.png",
    w: 171,
    h: 45,
    title: "Up to 8× simulation time-warp",
    caption: "Street exploration runs at 1× real pace; rising into the Planner unlocks 2×, 4×, and 8× (<1 ms CPU per sim tick).",
    alt: "Top HUD simulation speed control pill showing pause, 1x, 2x, 4x and active 8x fast-forward mode",
    tag: "HUD & Controls",
  },
  qualityTiers: {
    id: "qualityTiers",
    src: "/pixelville-nd/4 level graphics settings.png",
    w: 519,
    h: 361,
    title: "Auto, Low, Medium, High & opt-in Ultra presets",
    caption: "GPU-detected defaults for phones and integrated laptops, plus an opt-in Ultra tier with tiny kerb/sash shadows and full planar mirrors.",
    alt: "Settings Graphics tab dropdown showing Auto, Low, Medium, High, and Ultra quality presets",
    tag: "HUD & Controls",
  },
  gfxSettings: {
    id: "gfxSettings",
    src: "/pixelville-nd/graphics settings.png",
    w: 449,
    h: 355,
    title: "Dynamic auto-resolution & FOV control",
    caption: "Auto-resolution steps down 10% below 30 fps (floored at 80% with sharpening), paired with a 30 fps battery cap and 55–95° FOV slider.",
    alt: "Graphics settings modal showing Auto quality, Auto resolution scaler, frame-rate selector and Field of View slider",
    tag: "HUD & Controls",
  },
  villageSettings: {
    id: "villageSettings",
    src: "/pixelville-nd/settings (2).png",
    w: 443,
    h: 456,
    title: "Cozy pace, Christmas lock & 12 Founder looks",
    caption: "Rename your town, pick growth pace, lock fast-forward during Christmas Eve & Day, set 2-min autosave, or change your Founder portrait.",
    alt: "Village settings modal showing village name Rosedale, Cozy growth pace, Christmas fast-forward lock, 2-minute autosave and Choose who you are",
    tag: "HUD & Controls",
  },
  quickMenu: {
    id: "quickMenu",
    src: "/pixelville-nd/settings.png",
    w: 218,
    h: 312,
    title: "Quick drawer & V1 save import access",
    caption: "One-click Save, Load (including original 2D PixelVille v4 JSON saves!), Auto Village, Full Screen, F1 keycap sheet, and CC-BY Credits.",
    alt: "In-game quick menu listing Save village, Load village, Found a new village, Auto village, Settings, Sound on, Full screen, Help & controls F1 and Credits",
    tag: "HUD & Controls",
  },
} satisfies Record<string, Shot>;

export const ALL_SHOTS: Shot[] = Object.values(IMG);

/* ── Verifiable SSR metrics (rendered directly in HTML for AI crawlers) ──── */
export type NdStat = {
  value: string;
  label: string;
  detail: string;
  hue: NdHue;
};

export const HERO_STATS: NdStat[] = [
  { value: "2 × 2 km", label: "Living 3D map", detail: "256 × 256 tiles at 8 m/tile + 1.1 km valley approach", hue: "gold" },
  { value: "87 / 81", label: "Placeable / Enterable", detail: "87 building types; 81 open into 12 dressed 3D room templates", hue: "violet" },
  { value: "13", label: "Playable job shifts", detail: "Intercept real sim fires, arrests, flights, deliveries & surgeries", hue: "emerald" },
  { value: "1–5 ★", label: "Wanted street chases", detail: "Line-of-sight witnesses, roadblocks, spike strips & chopper", hue: "crimson" },
  { value: "6", label: "Off-map cities", detail: "Reachable by highway, Intercity Express, steamer, airliner or air taxi", hue: "sky" },
  { value: "93", label: "Retargeted 3D models", detail: "45 Rocketbox villagers, 30 vehicles with cabins & 18 animal species", hue: "amber" },
  { value: "~47,000", label: "Lines of TypeScript", detail: "Strict types, headless zero-DOM simulation core, ~470 KB gzipped", hue: "violet" },
  { value: "170", label: "Automated Vitest checks", detail: "Multi-day soak runs, busy-grid traffic audits & closed-loop economy", hue: "emerald" },
  { value: "~9 ms", label: "Street GPU frame", detail: "Measured on Intel UHD integrated graphics (Medium); <1 ms sim tick at 8×", hue: "sky" },
  { value: "$0", label: "Conjured money", detail: "Closed-loop tills, civic treasury budgets, County Grant & tracked IOUs", hue: "gold" },
];

/* ── Dual-Perspective Modes (Interactive Switcher Data) ─────────────────── */
export type PlayPerspective = {
  id: "founder" | "planner";
  badge: string;
  title: string;
  subtitle: string;
  hotkey: string;
  hue: NdHue;
  summary: string;
  primaryShot: Shot;
  secondaryShot: Shot;
  capabilities: { head: string; body: string }[];
  controls: { key: string; action: string }[];
  constraint: string;
};

export const PERSPECTIVES: PlayPerspective[] = [
  {
    id: "founder",
    badge: "GOD AVATAR MODE · STREET & VEHICLE SANDBOX",
    title: "The Founder on the Street",
    subtitle: "Roam your own city in 1st-person or 3rd-person — with a wallet, a garage, a reputation, and a police record.",
    hotkey: "1st / 3rd Person (V)",
    hue: "violet",
    summary:
      "You play the Founder: an immortal local figure in a signature violet coat and gold scarf (12 selectable male/female portrait faces) with a faint golden ring at your feet. You build from the sky for free, yet on the pavement you live by every citizen rule — drivers honk if you block a lane, shopkeepers price wares by how much they like you, and stealing a driveway saloon in view of a neighbour triggers a real road-dispatched police pursuit.",
    primaryShot: IMG.phone,
    secondaryShot: IMG.driving,
    capabilities: [
      {
        head: "True 1st-person & ray-box 3rd-person exploration",
        body: "Toggle V anytime between 1st-person eye level (60° default FOV, adjustable 55–95°, optional gentle head-bob) and 3rd-person orbit camera with exact ray-box collision that never clips into walls, awnings, or balconies.",
      },
      {
        head: "Walk inside 81 building types with real occupants",
        body: "Step through bakery, hospital, bank, cinema, church, garage, or PVTV studio doors into seed-consistent rooms dressed with paintings, curtains, outdoor window views, lampshades, and real on-shift villagers.",
      },
      {
        head: "Drive, refuel, dent, buy, or steal vehicles",
        body: "Start with a saloon in the Founder's Lodge driveway; buy 4 car models ($280–$520) and 2 leaning motorcycles ($160–$260) in 10 paints, hire a $4 mountain bike, refuel at forecourts, or hijack parked family cars.",
      },
      {
        head: "Talk to any villager via Groq AI, work 13 jobs, or leave town",
        body: "Hold free-form AI conversations grounded in a citizen's real diary, clock into 13 live-event job shifts, pull up the 11-app PVTel smartphone, or board trains, ferries, and flights to 6 cities beyond the map.",
      },
    ],
    controls: [
      { key: "W A S D + Shift", action: "Walk (2 m/s), sprint (6 m/s) & Space jump" },
      { key: "V", action: "Toggle 1st-person / 3rd-person / cockpit cam" },
      { key: "E", action: "Talk, knock, enter doors, refuel, arrest, shop" },
      { key: "F", action: "Enter/exit car, steal driveway car, departures" },
      { key: "Tab / J / F2", action: "11-app PVTel phone · Task book · Photo Mode" },
    ],
    constraint: "Street level runs strictly at 1× real simulation speed — and villagers never break the fourth wall.",
  },
  {
    id: "planner",
    badge: "GOD'S-EYE BUILDER · AERIAL ARCHITECT MODE",
    title: "The Planner in the Sky",
    subtitle: "Press P anywhere to fly seamlessly above the clouds, reshape terrain, lay rail corridors, and fast-forward time to 8×.",
    hotkey: "Press P Anywhere",
    hue: "gold",
    summary:
      "At a single keypress the camera lifts smoothly from the Founder's shoulders into a sweeping God's-Eye orbital rig over the entire 2 km × 2 km valley. Every tool from PixelVille V1 returns in 3D — zero zoning, direct placement of 87 building types, smart A* auto-roads, curved railways, river carving, mountain raising, and live citizen/building inspector cards.",
    primaryShot: IMG.plannerHigh,
    secondaryShot: IMG.plannerRail,
    capabilities: [
      {
        head: "87 placeable buildings + 10 upgrades & terrain tools",
        body: "Eight instant-response palette tabs (Tools, Homes, Work, Shops, Civic, Transit, Leisure, Nature) covering cottages to glass skyscrapers, 5 fast-food chains, power plants, zoos, harbours, heliports, and a 48×15-tile airport.",
      },
      {
        head: "A* auto-road pathfinding & tidy 1-tile access lanes",
        body: "New buildings automatically turn their door toward an adjacent street (World.streetFacing), lay a clean 1-tile access lane, and run terrain-weighted A* roads that curve around rock and bridge rivers only when worthwhile.",
      },
      {
        head: "God View (G) — clear the storm without stopping it",
        body: "Press G (or click the top-bar eye icon) to strip rain, snow, mist, and fog from the Planner camera for crystal-clear building while the real storm continues wetting tarmac and drifting snow on the street below.",
      },
      {
        head: "1-click Auto Village in 4 sizes & 8× time warp",
        body: "Generate a living Hamlet, Village, Town (with railways & level crossings), or Full Metropolis (182 buildings, airport, harbour, heliport), pin season/festival/weather, watch cinematically, and click 'Play this village' to drop onto the street.",
      },
    ],
    controls: [
      { key: "P", action: "Fly up into The Planner / descend to street" },
      { key: "G", action: "Toggle God View (clears storm/fog in sky)" },
      { key: "R · Q / E", action: "Rotate building 4 ways · Orbit Planner camera" },
      { key: "1× 2× 4× 8×", action: "Simulation time-warp + pause (Space / ||)" },
      { key: "Ctrl + Z", action: "Undo placements & drag-lay roads/rails/rivers" },
    ],
    constraint: "Fair-play lock: The Planner is disabled while you have a Wanted star or are clocked into a job shift — god powers are never an escape hatch.",
  },
];

/* ── Cascading Causality Chain ("One Lightning Strike, Zero Scripts") ───── */
export type CausalStep = {
  step: string;
  domain: string;
  module: string;
  hue: NdHue;
  title: string;
  whatHappens: string;
  ifMissing: string;
};

export const LIGHTNING_CHAIN: CausalStep[] = [
  {
    step: "01",
    domain: "WEATHER",
    module: "src/sim/weather.ts",
    hue: "sky",
    title: "Thunderstorm lightning strikes a substation",
    whatHappens:
      "The pre-rolled seasonal weather engine enters a thunderstorm state. GPU rain ripples across 220 street puddles, wind bends 32,000 trees, and a lightning bolt faults one of the town's 32 × 32-tile power districts.",
    ifMissing:
      "If an Electrician (you or an NPC) serviced that substation earlier in the week, storm-fault probability is cut by 65%.",
  },
  {
    step: "02",
    domain: "POWER GRID",
    module: "src/sim/power.ts · powermap.ts",
    hue: "amber",
    title: "The 32 × 32-tile district plunges into blackout",
    whatHappens:
      "A per-tile GPU power texture drops to zero across the faulted district: interior-mapped house windows, neon signs, and street lamps go dark instantly, shops close, factories halt production, and families sit by candlelight.",
    ifMissing:
      "Hospitals switch automatically to backup generators — and during capacity shortages, rolling 90-minute blackouts spare the hospital's district until last.",
  },
  {
    step: "03",
    domain: "TRAFFIC SIGNALS",
    module: "src/sim/traffic.ts",
    hue: "crimson",
    title: "Junction traffic lights go dark & drivers misjudge",
    whatHappens:
      "Busy intersections normally run 8-second signal phases behind swept-path Junction Boxes. With the district unpowered, the signal heads go black; approaching villager cars treat the crossroads as unsignalled and misjudge a crossing gap.",
    ifMissing:
      "Meanwhile, a power repair van dispatches through real road traffic from the Power Plant (40–75 min repair; or a county van 1 hour later if unbuilt).",
  },
  {
    step: "04",
    domain: "COLLISION & HEALTH",
    module: "src/sim/health.ts",
    hue: "crimson",
    title: "Two villagers' cars collide at the dark crossroads",
    whatHappens:
      "Real vehicle-length swept boxes collide. A driver suffers a crash trauma injury (health drops sharply on the 0–100 scale), exits onto the tarmac, and nearby pedestrians step onto the kerb as witnesses.",
    ifMissing:
      "If you are clocked into a Police or Paramedic shift, Life.claim routes the live emergency call to your PVTel phone first before NPC crews take over.",
  },
  {
    step: "05",
    domain: "EMERGENCY & WARD",
    module: "src/sim/life.ts · economy.ts",
    hue: "emerald",
    title: "Blue-light ambulance treats at scene & admits to ward",
    whatHappens:
      "An ambulance drives over real roads on blue lights (pre-empting red lights and queues), stabilises the casualty on the street, and rushes them to one of the Hospital's 12 staffed beds at $14/day — billed to household savings or recorded as household debt.",
    ifMissing:
      "Without a hospital, casualties limp home after 120 game minutes to recover slowly, and 'the sick with no hospital' becomes an active town grievance.",
  },
  {
    step: "06",
    domain: "MEMORY & DEMOCRACY",
    module: "src/sim/mind.ts · gov.ts",
    hue: "gold",
    title: "Episodic memory, gossip & the next mayoral election",
    whatHappens:
      "The injured driver logs a negative episodic memory (cautious villagers avoid trauma spots for 6–16 days), PVTV runs a breaking headline, dark-home voters penalise the incumbent mayor at the 28-day ballot box, and a Power Plant jumps to #1 on Town Hall's build queue.",
    ifMissing:
      "Verified end-to-end by automated headless tests (tests/power.test.ts, tests/health.test.ts, tests/deeper.test.ts) — zero scripted cutscenes.",
  },
];

/* ── Villager Mind, 3-Hop Hearsay & Guardrailed AI Chat ─────────────────── */
export const MIND_PILLARS: {
  code: string;
  title: string;
  hue: NdHue;
  body: string;
  metric: string;
}[] = [
  {
    code: "TRAITS × 5",
    title: "Deterministic 5-axis personality",
    hue: "violet",
    body: "Every citizen derives Social, Caution, Ambition, Thrift, and Curiosity scores from their seed — surviving save/load and driving career leaps, spending, friend-making, and risk avoidance.",
    metric: "8 adult lifestyles · 22 seasonal side gigs",
  },
  {
    code: "KNOWLEDGE",
    title: "Earned spatial discovery",
    hue: "sky",
    body: "Villagers do not magically know the map. A citizen only knows buildings they have walked past, heard about via 1-to-1 street gossip, or seen broadcast town-wide by a staffed PVTV station.",
    metric: "Unheard-of shops get zero applicants or footfall",
  },
  {
    code: "DIARY × 14",
    title: "Episodic memory & trauma scars",
    hue: "gold",
    body: "Up to 14 memories rated −2 to +2 (weddings, fires, promotions, burglaries, chats with the Founder). Mild memories fade in ~20 days; severe shocks leave scars making cautious citizens avoid a site for 6–16 days.",
    metric: "Memories shift daily mood & gossip topics",
  },
  {
    code: "UTILITY AI",
    title: "Multi-factor venue scoring",
    hue: "emerald",
    body: "Never a random dice roll: choosing a shop or evening haunt weighs distance, menu price × thrift, personal fondness ('my usual spot'), whether friends are going, novelty × curiosity, crowding, and fear.",
    metric: "Broke weeks steer citizens to free parks & libraries",
  },
];

export const LIFESTYLES: { name: string; share: string; behaviour: string }[] = [
  { name: "Worker", share: "40%", behaviour: "Steady wage-earner balancing modest savings, family upgrades, and evening leisure." },
  { name: "Shopkeeper", share: "15%", behaviour: "Saves startup capital, buys a commercial plot, founds a shop, and quits the day job to run its till." },
  { name: "Entrepreneur", share: "14%", behaviour: "Takes bank loans to launch cafés, services, and venues where demand outstrips supply." },
  { name: "Neighbour", share: "8%", behaviour: "Community glue — high social warmth, first into bucket brigades, checks on withdrawn peers in despair." },
  { name: "Tycoon", share: "6%", behaviour: "Trades the 5 hometown stock tickers (AGRI, INDL, RETL, RAIL, BYTE) and upgrades to mansions." },
  { name: "Farmer", share: "6%", behaviour: "Works outskirts cropland, stocks Food yards up to 90 units, and feels droughts immediately." },
  { name: "Risk-taker", share: "6%", behaviour: "Frequents the casino and scratch cards — occasional $400 jackpots, occasional foreclosure ruin." },
  { name: "Industrialist", share: "5%", behaviour: "Backs sawmills, brickworks, textile mills, and factories feeding the physical supply chain." },
];

export const GOSSIP_DEEDS: {
  id: string;
  deed: string;
  delta: string;
  positive: boolean;
  hop0: string;
  hop1: string;
  hop2: string;
  streetEffect: string;
}[] = [
  {
    id: "dog",
    deed: "Returned a family's lost dog (Bramble)",
    delta: "+4.0 opinion",
    positive: true,
    hop0: "Direct family (+4.0): pays a cash reward from household savings & logs 'brought our dog home' in diary.",
    hop1: "Next-door neighbours (+2.4): hear over evening chat & wave by name when you pass on the pavement.",
    hop2: "3rd-hop coworkers (+1.2) — or whole village if PVTV airs it: town standing rises toward 'Well liked' & 'Beloved'.",
    streetEffect: "10–20% discount at shops, showrooms & garages; invited straight inside homes without knocking; minor road slips overlooked.",
  },
  {
    id: "fire",
    deed: "Joined a fire rescue or worked a 5★ Paramedic shift",
    delta: "+3.0 opinion",
    positive: true,
    hop0: "Rescued household & bystanders (+3.0): village fund pays a thank-you bonus into your wallet.",
    hop1: "Street acquaintances (+1.8): share the rescue gist when crossing paths on the kerb.",
    hop2: "3rd-hop shop staff (+0.9): warm greetings in street subtitles and friendlier Groq AI chat tone.",
    streetEffect: "Higher trust in AI conversations — villagers confide local shortages, mayor scandals, and hidden places.",
  },
  {
    id: "theft",
    deed: "Hijacked a parked car or fled a hit-and-run",
    delta: "−4.0 to −6.0 opinion",
    positive: false,
    hop0: "Witnesses within 32 m (−6.0): immediately alert police if line-of-sight is clear of buildings, and log lasting fear.",
    hop1: "Family dinner & street gossip (−3.5): word spreads who took the family saloon even if reported 20–45 min later.",
    hop2: "3rd-hop town network (−1.8) + PVTV crime ticker: aggregate standing drops toward 'Disliked' or 'Notorious'.",
    streetEffect: "Shopkeepers & gas pumps refuse to serve you; homes lock doors (must knock with E); haters phone police (📞) mid-chase, resetting your escape timer!",
  },
];

/* ── 1–5★ Wanted Escalation Data ────────────────────────────────────────── */
export type WantedTier = {
  stars: number;
  label: string;
  trigger: string;
  dispatch: string;
  tactics: string;
  escapeSec: number;
  fine: string;
};

export const WANTED_TIERS: WantedTier[] = [
  {
    stars: 1,
    label: "★ Patrol Pursuit",
    trigger: "3 witnessed traffic tickets in 5 min (red light, >60 km/h, wrong avenue row) or minor fender-bender",
    dispatch: "1 squad car from the nearest staffed Police Station",
    tactics: "Blue-light road pursuit; pulls alongside for 2 s to make an arrest",
    escapeSec: 16,
    fine: "$40 fine · night in cells",
  },
  {
    stars: 2,
    label: "★★ Felony Alert",
    trigger: "Witnessed driveway car theft (or 'hot' car 20–45 min after unwitnessed theft) or hit-and-run",
    dispatch: "2 squad cars coordinating across road junctions",
    tactics: "Last-known-position intercept routing; hostile villagers snitch (📞) if they spot you hiding",
    escapeSec: 24,
    fine: "$110 fine · car impounded ($40)",
  },
  {
    stars: 3,
    label: "★★★ Town Lockdown",
    trigger: "Ramming a police cruiser or repeat casualties",
    dispatch: "4 squad cars dispatched from every station in town",
    tactics: "Physical police roadblocks deployed across avenues ahead of your heading",
    escapeSec: 34,
    fine: "$190 fine · car impounded ($40)",
  },
  {
    stars: 4,
    label: "★★★★ Tactical Intercept",
    trigger: "Committing fresh crimes mid-pursuit",
    dispatch: "6 squad cars + forward intercept units",
    tactics: "Roadblocks paired with tyre-shredding spike strips that cripple top speed and steering",
    escapeSec: 46,
    fine: "$275 fine · car impounded ($40)",
  },
  {
    stars: 5,
    label: "★★★★★ Full Manhunt",
    trigger: "Sustained town-wide rampage",
    dispatch: "8 squad cars + the Police Helicopter (if the village has built a Heliport)",
    tactics: "Airborne 160 m line-of-sight spotlight tracking over rooftops + multi-avenue spike strips",
    escapeSec: 60,
    fine: "$360 fine · car impounded ($40)",
  },
];

/* ── All 13 Playable Job Shifts ─────────────────────────────────────────── */
export type JobWave = "Emergency" | "Driving" | "Rails & Skies" | "Town & Media";

export type JobShift = {
  id: string;
  title: string;
  wave: JobWave;
  workplace: string;
  vehicle: string;
  loop: string;
  simImpact: string;
  paySource: string;
};

export const JOB_SHIFTS: JobShift[] = [
  {
    id: "firefighter",
    title: "Firefighter",
    wave: "Emergency",
    workplace: "Fire Station",
    vehicle: "Fire Engine (blue lights)",
    loop: "Claim live building fires via Life.claim, race through red lights, aim lit water-slug hose jets on foot, and run preventative fire inspections between alarms.",
    simImpact: "Saves burning buildings from turning to ruins; inspected businesses cut ignition risk to 35% for 7 days.",
    paySource: "Gov.treasury (or IOU debt)",
  },
  {
    id: "police",
    title: "Police Officer",
    wave: "Emergency",
    workplace: "Police Station",
    vehicle: "Squad Car (blue lights)",
    loop: "Intercept night burglars (press E beside them), calm daytime street quarrels, secure crash scenes, and walk neighbourhood foot beats.",
    simImpact: "Raises town Safety (0–100), sends grave offenders to Courthouse trials 2 days later, and deters crime on patrolled streets.",
    paySource: "Gov.treasury (or IOU debt)",
  },
  {
    id: "paramedic",
    title: "Paramedic",
    wave: "Emergency",
    workplace: "Hospital",
    vehicle: "Ambulance (blue lights)",
    loop: "Stabilise road-crash and fire-smoke casualties on the pavement, rush them to the 12-bed ward, and make home visits to flu/pneumonia patients.",
    simImpact: "Accelerates citizen health recovery (0–100) and frees stalled traffic around street casualties.",
    paySource: "Gov.treasury (or IOU debt)",
  },
  {
    id: "taxi",
    title: "Taxi Driver",
    wave: "Driving",
    workplace: "Taxi Stand",
    vehicle: "Village Cab",
    loop: "Hail real villagers leaving workplaces, pubs, or homes; follow amber road chevrons and drop fares cleanly at their kerbside door.",
    simImpact: "Moves car-less commuters across town; meter fares ($3 + per-tile rate) and tips flow from the rider's purse into the rank's till.",
    paySource: "Taxi Stand till",
  },
  {
    id: "bus",
    title: "Bus Driver",
    wave: "Driving",
    workplace: "Bus Stop Loop",
    vehicle: "City Bus",
    loop: "Drive the village's self-planned one-way kerb loop (05:30–23:30), braking accurately beside each shelter so real rush-hour queues board.",
    simImpact: "Clears commuter queues, cuts private car congestion, and earns timetable punctuality bonuses.",
    paySource: "Gov.treasury transit budget",
  },
  {
    id: "delivery",
    title: "Delivery Trucker",
    wave: "Driving",
    workplace: "Warehouse / Factories / Works",
    vehicle: "Painted Delivery Lorry",
    loop: "Load Food, Materials, Textiles, or Products from producer yards (up to 90 stock) and haul them to low-shelf shops or stalled building sites.",
    simImpact: "Restocks bare shop shelves (ending +40% scarcity markups) and unblocks material-starved construction scaffolds.",
    paySource: "Producer / Warehouse till",
  },
  {
    id: "train",
    title: "Train Driver",
    wave: "Rails & Skies",
    workplace: "Train Station",
    vehicle: "Local Multiple-Unit Cab",
    loop: "Control throttle (W) and brakes (S) around 3-tile curved tracks and 13-second level crossings, stopping the cab cleanly at each platform.",
    simImpact: "Carries inter-district rail riders on schedule; platform overruns and buffer hits deduct shift stars.",
    paySource: "Railway / Station till",
  },
  {
    id: "pilot",
    title: "Airline Pilot",
    wave: "Rails & Skies",
    workplace: "48 × 15-tile Airport",
    vehicle: "30 m-span Commercial Airliner",
    loop: "Up to 14-hour shift: taxi onto the 372 m south runway (Life.runwayHeld), throttle & climb (E/Q) off-map, complete city turnaround, line up low over the fence with auto-flare in the final 6 m, and taxi to Stand 4.",
    simImpact: "Brings high-spending tourists, skilled graduate families, and raises the village's daily county import allowance.",
    paySource: "Airport till",
  },
  {
    id: "electrician",
    title: "Electrician",
    wave: "Town & Media",
    workplace: "Power Plant",
    vehicle: "Power Repair Van",
    loop: "Respond first to lightning, wind, and ice blackouts with a 3-stage pole repair, and proactively service district substations between storms.",
    simImpact: "Restores district lights and junction signals; serviced substations suffer 65% fewer storm faults for a full week.",
    paySource: "Power Plant till / budget",
  },
  {
    id: "construction",
    title: "Construction Worker",
    wave: "Town & Media",
    workplace: "Any Active Building Site",
    vehicle: "Builders' Pickup Van",
    loop: "Carry material loads from kerbside pallets up to the scaffold (each load lays 18 game minutes of build progress) and fetch yard supplies by van when bare.",
    simImpact: "Visibly raises walls, tower cranes, and roofs ahead of schedule so families and businesses move in sooner.",
    paySource: "Site commission budget (b.siteFunds)",
  },
  {
    id: "chef",
    title: "Shop Worker / Chef",
    wave: "Town & Media",
    workplace: "Any Open Shop, Bakery or Café",
    vehicle: "Indoors on foot",
    loop: "Work behind the counter inside a dressed 3D room: take orders from real simulated villagers, prepare items at the station, and serve them.",
    simImpact: "Fills the shop's till, earns tips, and increases customers' personal fondness score so it becomes their 'usual spot'.",
    paySource: "Shop / Café till",
  },
  {
    id: "reporter",
    title: "PVTV Reporter",
    wave: "Town & Media",
    workplace: "PVTV Television Station",
    vehicle: "PVTV Broadcast Van",
    loop: "Receive live assignments from the newsroom editor (fires, rallies, crashes, blackouts, bare shelves, booming shops), frame subjects on camera, and file at the studio.",
    simImpact: "Airs your story town-wide on PVTV; filing supply-shortage reports directly boosts the county's daily import allowance!",
    paySource: "PVTV Station till",
  },
  {
    id: "farmer",
    title: "Farmer",
    wave: "Town & Media",
    workplace: "Outskirts Farm",
    vehicle: "Farm Tractor",
    loop: "Drive the tractor up and down physical crop rows — sowing in Spring, harvesting in Summer & Autumn, and winter-ploughing in Winter.",
    simImpact: "Fills the farm's Food yard for delivery trucks and grants a +30% crop yield boost for 7 days.",
    paySource: "Farm till",
  },
];

/* ── Closed-Loop Economy & Self-Governing Democracy ─────────────────────── */
export const ECONOMY_RULES: { title: string; body: string; code: string }[] = [
  {
    title: "Zero conjured or destroyed money",
    code: "Economy.payday · openingCapital",
    body: "Currency only crosses at the map boundary: off-map exports, imports, tourist spending, and a $6/resident/day County Grant. Every private shop, farm, and factory pays wages strictly from its own till — miss payroll for 6 days and the business shutters.",
  },
  {
    title: "Tracked IOUs instead of magic freebies",
    code: "b.debts · Wallet.bills",
    body: "When a broke household (or a 'Wasted' Founder) cannot afford a $14/day hospital ward, a traffic fine, or a public shift payout when Gov.treasury is dry, the unpaid balance becomes a ledger Debt settled automatically as future wages or taxes arrive.",
  },
  {
    title: "Physical 4-good supply & scarcity pricing",
    code: "Supply · Food · Materials · Textiles · Products",
    body: "Goods sit in producer yards (up to 90), ride painted lorries and nightly freight trains to warehouses and shop shelves. Low shelves trigger +40% scarcity pricing and move the 5 stock tickers; empty pallets physically stall building sites.",
  },
  {
    title: "Upfront cab quotes & honest tills",
    code: "Transit · Showrooms · Scratch cards",
    body: "Taxis quote $3 + distance upfront and refuse broke riders; vehicle part-exchanges (55% less wear) come out of the showroom's real till; $2 shop scratch cards pay prizes out of the village fund.",
  },
];

export const MAYORS: {
  archetype: string;
  tag: string;
  skim: string;
  hue: NdHue;
  priorities: string;
  quirk: string;
}[] = [
  {
    archetype: "The Visionary",
    tag: "Civic & green idealist",
    skim: "0% treasury skim",
    hue: "violet",
    priorities: "Hospitals, schools, colleges, parks, libraries, museums, churches & temples.",
    quirk: "Keeps quality-of-life and graduate rates high, though industrial yards may wait on private entrepreneurs.",
  },
  {
    archetype: "The Business Mayor",
    tag: "Growth & infrastructure",
    skim: "8% quiet commission",
    hue: "sky",
    priorities: "Power plants, shops, offices, factories, banks, rail lines, stock exchange & the 48×15 airport.",
    quirk: "Rapidly expands commercial tills and trade gateways, tolerating a small slice off public contracts.",
  },
  {
    archetype: "The Steady Planner",
    tag: "Coverage & reliability",
    skim: "3% admin overhead",
    hue: "emerald",
    priorities: "Fills exact radius gaps — Police (32 tiles), Fire (30), School (36) — plus bus loops, post office & water towers.",
    quirk: "Rarely flashy, almost never protested; keeps blackouts, crime, and fires contained as districts widen.",
  },
  {
    archetype: "The Smooth Talker",
    tag: "Corrupt populist",
    skim: "55% treasury skim",
    hue: "crimson",
    priorities: "Builds an ornate Town Hall for himself while campaigning on 'gold-paved roads, somehow'.",
    quirk: "Auditors eventually expose embezzlement scandals on PVTV — sparking Town Hall riots, forced resignation, and snap elections.",
  },
];

/* ── 6 Off-Map Destination Cities & 11 PVTel Apps ───────────────────────── */
export const OFFMAP_CITIES: { city: string; character: string; routes: string; loop: string }[] = [
  { city: "Westmere", character: "Market valley town", routes: "Drive off West Highway or ride Intercity Express", loop: "2-hour sightseeing, odd jobs, local souvenir for your 16-slot bag, or $30 overnight hotel." },
  { city: "Northbridge", character: "Northern rail hub", routes: "Drive off North Highway or ride Intercity Express", loop: "Real village clock fast-forwards while you travel; 'While you were away' summarizes births, builds & news." },
  { city: "Avalon City", character: "The national capital", routes: "Intercity Express, 3-hourly Airport Flight, or Heliport Air Taxi", loop: "Check in 20 min before departure, wait at terminal gate, watch runway takeoff & return landing." },
  { city: "Harbourton", character: "Deep-water port", routes: "Intercity Express or Harbour Steamer (06:00–22:00)", loop: "Sails out across CPU/GPU-matched Gerstner sea waves; brings tourists and coastal trade back." },
  { city: "Saltmarsh Isle", character: "Tidal island sanctuary", routes: "By Sea from the Harbour ('Island day trip' ticket)", loop: "Use a ticket bought from indoor terminal machines; if broke away from home, work a day for return fare." },
  { city: "Solano", character: "Sunny coastal resort", routes: "3-hourly Commercial Flight ('Weekend in the sun' ticket)", loop: "Full airliner gate boarding, journey event card on the way, resort souvenir, and live village catch-up." },
];

export const PHONE_APPS: { name: string; desc: string }[] = [
  { name: "Map", desc: "Tap any plot or search village places sorted by distance; lays amber road-following GPS chevrons." },
  { name: "Jobs", desc: "Browse all 13 shifts, nearest workplace, star rating, career earnings & owed public wages; clock on/off." },
  { name: "Ride", desc: "Hail a real cab to your kerb, check live bus/rail/ferry/flight timetables, and route to 6 off-map gateways." },
  { name: "Contacts", desc: "Every villager you've met — phone them for Groq AI chat (no pickups 23:00–06:30!) or pin them on GPS." },
  { name: "Wallet", desc: "Live cash balance, today's inflow/outflow, last 80 ledger entries, tracked debts, and 16-slot item bag." },
  { name: "Garage", desc: "Inspect all owned cars & bikes (fuel %, dent %, parked street), ping on GPS, or call a $35 recovery tow." },
  { name: "PVTV", desc: "Live breaking village headlines and the 5-ticker hometown stock exchange (AGRI, INDL, RETL, RAIL, BYTE)." },
  { name: "Tasks", desc: "Open civic goals (survive drought, build hospital, return lost dog) plus a 250-entry village news archive." },
  { name: "Camera", desc: "Snap clean HUD-free street photographs stored straight into your persistent in-game camera roll." },
  { name: "Planner", desc: "One-tap launch upward into God's-Eye build mode (locked while Wanted or mid-shift)." },
  { name: "Settings", desc: "4 instant tabs: Village, Graphics (Low→Ultra), Controls (full rebind), and Accessibility." },
];

/* ── 14-Day Rockefeller Christmas Cycle & 4 Seasons ─────────────────────── */
export const CHRISTMAS_TIMELINE: { days: string; title: string; detail: string }[] = [
  { days: "Days 15–16", title: "Helicopter spruce scouting", detail: "The head gardener lifts off by helicopter to survey conifer stands until a village family offers the giant Nordmann spruce in their garden." },
  { days: "Day 17", title: "Crane hold & felling", detail: "A mobile crane braces the 24-metre tree while the forestry crew saws the trunk and lowers it onto an articulated flatbed lorry." },
  { days: "Day 18 · 10:00", title: "Police-escorted street convoy", detail: "Flanked by two squad cars on blue lights, the oversized flatbed crawls into town — holding up real simulation traffic behind it." },
  { days: "Days 19–21", title: "Scaffolding, 1,400 bulbs & the star", detail: "A crane erects the spruce in the town square; crews climb scaffolding wrapping 1,400 bloom-lit bulbs bottom-to-top and hoist the apex star on Day 21." },
  { days: "Day 22 · 21:50", title: "Live PVTV lighting ceremony", detail: "Stage performers and a real villager crowd gather from 20:00 before the square bursts into light at 21:50 — followed by markets, ice-rink skaters, door-to-door carolers & midnight Santa sleighs." },
  { days: "New Year Day 2", title: "Timber recycled into a new home", detail: "After shining all night on Christmas Eve & Day (with an optional fast-forward lock so you don't miss it), the tree comes down and its timber goes physically to a house under construction." },
];

/* ── 3-Way Genre & Evolution Comparison (AEO Extraction Table) ──────────── */
export type CompareRow = {
  dimension: string;
  traditional: string;
  v1: string;
  nextDimension: string;
};

export const EVOLUTION_COMPARE: CompareRow[] = [
  {
    dimension: "Player perspective",
    traditional: " disembodied overhead camera only",
    v1: "2D top-down pixel-art God camera",
    nextDimension: "Dual-mode: 1st/3rd-person street Founder Avatar + seamless aerial God Planner (P)",
  },
  {
    dimension: "Street-level gameplay",
    traditional: "Passive camera zoom; cannot interact as a citizen",
    v1: "Click-to-inspect villager & building cards",
    nextDimension: "GTA-style sandbox: drive, enter 81 interiors, work 13 jobs, shop, steal cars, 1–5★ chases",
  },
  {
    dimension: "NPC intelligence",
    traditional: "Interchangeable pathfinding agents or fake despawning crowds",
    v1: "5 traits, earned spatial knowledge, episodic diary & utility scoring",
    nextDimension: "Full V1 mind + 3-hop Founder reputation gossip, snitching witnesses & live Groq AI chat",
  },
  {
    dimension: "Economy accounting",
    traditional: "Infinite background sinks/faucets & abstract tax sliders",
    v1: "Household savings, 8 lifestyles, loans, casino & 5 stock tickers",
    nextDimension: "Strict zero-conjured-money rule: real shop tills, civic budgets, $6 County Grant, tracked IOUs & 4-good supply trucks",
  },
  {
    dimension: "Infrastructure causality",
    traditional: "Stat penalties or icons floating over unpowered zones",
    v1: "Service radii, fires, crime, elections & community self-build",
    nextDimension: "32×32 district blackouts darken traffic signals → real junction crashes → ambulances → 12-bed wards → ballot grievances",
  },
  {
    dimension: "Traffic & parking",
    traditional: "Cars pocket-despawn at destinations or clip through queues",
    v1: "2D road cars, buses, trains, boats, planes & A* auto-roads",
    nextDimension: "Swept-path Junction Boxes, rear-axle reverse parking into driveways/bays/Car Parks, 13 s rail booms, 100 s gridlock relief",
  },
  {
    dimension: "World & rendering",
    traditional: "Multi-gigabyte engine install & static asset packs",
    v1: "~11,700 LOC vanilla JS, 2D HTML5 Canvas, zero dependencies",
    nextDimension: "~47,000 LOC TypeScript + Three.js WebGL2 PBR shaders, Preetham sky, Spring thaw, 93 LOD models, ~470 KB gzipped in browser",
  },
  {
    dimension: "Save compatibility",
    traditional: "Locked per title",
    v1: "JSON export & IndexedDB slots",
    nextDimension: "Imports original 2D PixelVille (v4) saves directly — your old 2D village wakes up and keeps living in 3D",
  },
];

/* ── Complete A–Z Deep-Logic Systems Ledger (Big, Medium & Small) ─────────
   Rendered in full in server HTML so search & AI crawlers index every single
   mechanic, with client-side scale & keyword filtering for human visitors. */
export type SystemScale = "Big" | "Medium" | "Small";

export type SystemEntry = {
  name: string;
  scale: SystemScale;
  category: "Minds & AI" | "Street & GTA" | "Economy & Civic" | "Transit & Infra" | "World & Engine";
  detail: string;
};

export const SYSTEMS_LEDGER: SystemEntry[] = [
  { name: "Access lanes & pruning", scale: "Small", category: "Transit & Infra", detail: "New buildings turn their door to an adjacent street and lay a tidy 1-tile access lane, automatically pruned when demolished." },
  { name: "Accessibility suite", scale: "Medium", category: "World & Engine", detail: "4 UI zoom tiers (auto-downscales on 1366×768), named street subtitles, sound captions, 2 colour-blind modes + underlines, reduce-motion & 55–95° FOV." },
  { name: "Ageing & circle of life", scale: "Medium", category: "Minds & AI", detail: "Citizens age 1 year per game week: childhood school, romance, weddings, babies, separations, retirement at 65, and peaceful old-age passing." },
  { name: "AI villager chat (guardrailed)", scale: "Big", category: "Minds & AI", detail: "Free conversation via Groq serverless proxy grounded in ~1–2k tokens of live traits, diary & 9-day news; effects clamped (±1 opinion/turn) + mind-template fallback." },
  { name: "Airfield (48 × 15 tiles)", scale: "Medium", category: "Transit & Infra", detail: "372 m south runway, parallel taxiway, 4 stands (30 m wingspan clearance), single-runway lock (Life.runwayHeld), and 6 m auto-flare landings." },
  { name: "Ambulances & 12-bed wards", scale: "Medium", category: "Transit & Infra", detail: "Blue-light road dispatch from nearest Hospital; on-pavement triage, $14/day inpatient beds, and pedestrian crew bailout if traffic holds the rig." },
  { name: "Animals (18 retargeted species)", scale: "Medium", category: "World & Engine", detail: "4 dog breeds, cats, cows, sheep, horses, donkeys, deer, hares, lions, elephants, zebras, penguins, mallards, pigeons & butterflies on custom gait rigs." },
  { name: "Asymmetric dipped headlamps", scale: "Small", category: "World & Engine", detail: "Surface shader BEAMS cut off on the oncoming lane and reach further along the kerb, reflecting off wet tarmac; parked cars stay dark." },
  { name: "Auto resolution scaler", scale: "Small", category: "World & Engine", detail: "Steps render scale down 10% below ~30 fps and back up with headroom — floored at 80% with a sharpening pass so streets never blur." },
  { name: "Auto village (4 sizes)", scale: "Medium", category: "World & Engine", detail: "One-click generative town (Hamlet, Village, Town with rail, or 182-building Full Metropolis) with season/festival pins and instant street takeover." },
  { name: "A* terrain auto-road", scale: "Medium", category: "Transit & Infra", detail: "Connects every placed building using terrain weights (existing road 0.15, grass 1, trees 1.8, water 7 → bridge, rock ∞) and turn penalties." },
  { name: "Autosave & Rescue boot", scale: "Small", category: "World & Engine", detail: "Saves every 2 or 5 min, on tab hide, and instantly on WebGL context reset; a hung boot offers lighter-graphics recovery next launch while preserving the save." },
  { name: "Bank loans & foreclosures", scale: "Small", category: "Economy & Civic", detail: "Entrepreneurs borrow startup capital with daily repayments from real tills; sustained default triggers foreclosure." },
  { name: "Bucket brigades & rebuilds", scale: "Small", category: "Economy & Civic", detail: "Where no Fire Station covers a blaze (or after a sudden building collapse), neighbours form a bucket line and later clear rubble to rebuild together." },
  { name: "Building lifecycle & cranes", scale: "Big", category: "World & Engine", detail: "Pallets, tower cranes, hammering scaffold crews at wall height, finished chunk merging (98 types in 0.18 s), renovations, fires, ruins & rebuilds." },
  { name: "Buses on one-way kerb loops", scale: "Medium", category: "Transit & Infra", detail: "Up to 3 buses chain shelters into legal kerbside loops clear of junction zebras (05:30–23:30), carrying real rush-hour commuter queues." },
  { name: "Busted & Wasted curtains", scale: "Medium", category: "Street & GTA", detail: "Arrests levy $40–$360 fines, impound your car, and pass a night in cells; ≥80 km/h crashes patch you at the hospital ($90–$120 bill/debt). Villagers never die." },
  { name: "Calamities (4 major + monsoon)", scale: "Big", category: "World & Engine", detail: "Droughts drop river levels & halve crops; Monsoon Floods wash out roads as citizens pole rafts; Earthquakes spark gas fires; Tornadoes cut district power." },
  { name: "Campaign week & hustings", scale: "Medium", category: "Economy & Civic", detail: "7 days of street bunting, loudspeaker cars, and pre-dusk soapbox rallies on neighbourhood greens before 08:00–18:00 Town Hall polling day." },
  { name: "Car Parks (8-bay overflow)", scale: "Small", category: "Transit & Infra", detail: "When a busy shop's front bays fill up, drivers book the nearest 3×2 Car Park and walk the rest of the trip; zero-parking trips leave the car at home." },
  { name: "Casino, lottery & scratch cards", scale: "Small", category: "Economy & Civic", detail: "Risk-takers gamble at the casino (house edge), households hit rare $400 lotteries, and the Founder buys $2 shop scratch cards funded by the treasury." },
  { name: "Christmas (14-day Rockefeller arc)", scale: "Big", category: "World & Engine", detail: "Day 15 chopper tree scout → Day 17 crane cut → Day 18 police-escorted flatbed convoy → Day 22 live PVTV lighting of 1,400 bulbs → New Year Day 2 timber recycled." },
  { name: "Closed-loop money rule", scale: "Big", category: "Economy & Civic", detail: "Zero money conjured or destroyed: tills pay staff, treasury budgets fund civic posts ($6/resident County Grant), and unpaid bills become tracked IOUs." },
  { name: "Community self-building", scale: "Big", category: "Economy & Civic", detail: "If both player and mayor ignore an urgent civic gap (hospital, fire, school) for days, villagers pool household savings to construct it themselves." },
  { name: "Custom circle-vs-box physics", scale: "Small", category: "World & Engine", detail: "Zero heavy WASM physics engine: fast swept-box & circle collision against buildings, lamp posts, fences, parked cars, trees, and pedestrians." },
  { name: "Despair & neighbour intervention", scale: "Medium", category: "Minds & AI", detail: "Unemployed or bereaved citizens who withdraw indoors are noticed by friends, family, and 'Neighbour' archetypes who visit to lift their mood." },
  { name: "Education & skilled migration", scale: "Big", category: "Economy & Civic", detail: "School Certificate at 18 → 12-day College Degree → +45% pay in graduate posts (doctors, engineers, pilots, bankers); shortages fly skilled newcomers in." },
  { name: "Errands (Lost Dog & rescues)", scale: "Small", category: "Street & GTA", detail: "Spot a runaway dog via PVTV toast, call it with E, and walk it home on GPS for a family reward and +4 reputation; fire/crash help pays treasury bonuses." },
  { name: "Festivals (4 annual celebrations)", scale: "Medium", category: "World & Engine", detail: "Fixed 28-day calendar featuring New Year rooftop fireworks, Easter, Diwali glowing diyas & fireworks, and the 14-day Christmas season." },
  { name: "First-Day 9-step interactive guide", scale: "Medium", category: "World & Engine", detail: "Device-worded onboarding rings live HUD controls from empty valley to knocking (E) on your first neighbour's door, resumable across reloads." },
  { name: "Founder's look & Lodge", scale: "Small", category: "Street & GTA", detail: "12 portrait choices (6 men, 6 women) in the exclusive violet coat & gold scarf, based at the Founder's Lodge with legal driveway and garage key hook." },
  { name: "Gamepad universal DOM navigator", scale: "Small", category: "World & Engine", detail: "padnav.ts reads live on-screen controls spatially so D-pad/stick navigates PVTel, showrooms, chat, settings, and Planner tabs with zero hardcoded menus." },
  { name: "Gerstner CPU/GPU water & floes", scale: "Medium", category: "World & Engine", detail: "River flow-field currents, rain rings, Fresnel mirrors, shore shingle/reeds, winter bank-outwards ice floes, and boats/ducks pitching on exact CPU wave maths." },
  { name: "God View (G storm clear)", scale: "Small", category: "World & Engine", detail: "Clears rain, snow, mist, and fog solely for the aerial Planner camera while real precipitation continues wetting and drifting on the streets below." },
  { name: "Gridlock relief (100 s / 150 s)", scale: "Medium", category: "Transit & Infra", detail: "A citizen stuck 100 s parks and walks (waiting until off-camera); commercial/visitor rigs reroute at 150 s — guaranteeing zero permanent town deadlocks." },
  { name: "Guard() fault-isolated frame loop", scale: "Small", category: "World & Engine", detail: "Every subsystem ticks inside guard(part, fn): an exception logs once and skips that slice for the frame so the screen never freezes." },
  { name: "Headless simulation core", scale: "Big", category: "World & Engine", detail: "src/sim has zero Three.js or DOM imports — runs <1 ms/frame at 8×, verified by 170 Vitest tests, ready for Web Worker or co-op server authority." },
  { name: "Intercity Express & national rail", scale: "Medium", category: "Transit & Infra", detail: "Placing a station auto-branches track to the nearest map edge; the liveried Intercity Express calls every 3 hours (14-min platform dwell)." },
  { name: "Interiors (81 types, 12 templates)", scale: "Big", category: "Street & GTA", detail: "Seed-consistent rooms dressed with cornices, wall paintings, curtains, outdoor window views, pendant shades, plants, usable counters/ATMs & real occupants." },
  { name: "Junction boxes & swept masks", scale: "Big", category: "Transit & Infra", detail: "Drivers reserve swept tile quarters (MASKS) only when exit space is clear; longest-waiting outranks, while opposing straights and right turns share cleanly." },
  { name: "Level crossings (13 s booms)", scale: "Medium", category: "Transit & Infra", detail: "Flashing red lamps 13 s ahead of local/express/freight trains, lowering half-barriers, queuing cars & walkers, and train emergency braking if blocked." },
  { name: "Mountain peak (117 m massif)", scale: "Medium", category: "World & Engine", detail: "44-tile rugged crag with switchback gravel trail (1-in-6 grade), log drop edges, summit cairn & bench, hikers, and $4 trailhead mountain-bike hire." },
  { name: "Off-map travel (6 cities)", scale: "Big", category: "Street & GTA", detail: "Depart visibly by highway, Intercity rail, steamer, airliner, or air taxi; journey events, city sightseeing/souvenirs, and 'While you were away' digest." },
  { name: "Parking & rear-axle manoeuvres", scale: "Big", category: "Transit & Infra", detail: "Driveway-capped household cars, pre-booked shop bays, rear-axle reverse-in geometry (0 wall hits across 655 audited moves), and $15/$40 warden enforcement." },
  { name: "Pedestrian pavement etiquette", scale: "Medium", category: "Transit & Infra", detail: "Door-side pavement walking, ±14% individual pace, stepping aside to pass, 2-abreast zebra crossings behind stop lines, and umbrellas in rain." },
  { name: "Photo Mode (F2 bokeh studio)", scale: "Medium", category: "Street & GTA", detail: "Freezes clock, rain & rivers; 60 m tether, 12–114 mm lens, click-to-focus HDR bokeh DoF, 8 colour grades, and non-destructive hour/weather preview." },
  { name: "Pioneers & outskirts homesteads", scale: "Small", category: "Minds & AI", detail: "Adventurous families claim cheap countryside plots beyond the centre to homestead farms and roadside businesses on their own." },
  { name: "PixelVille V1 save importer", scale: "Medium", category: "World & Engine", detail: "Reads original 2D PixelVille (v4) JSON exports — reconstructing terrain, buildings, families, traits, and diaries directly as a living 3D town." },
  { name: "Power grid & rolling blackouts", scale: "Big", category: "Transit & Infra", detail: "32×32-tile districts, plant (160) + county line (60), 90-min rolling blackouts (hospital last), storm/tornado faults, dark signals & repair vans." },
  { name: "PVTel 11-app smartphone", scale: "Medium", category: "Street & GTA", detail: "Tab opens Map GPS, Jobs, Ride, Contacts, Wallet, Garage, PVTV, Tasks, Camera, Planner & Settings — fully navigable by mouse, touch, or gamepad." },
  { name: "PVTV & 5-ticker stock market", scale: "Medium", category: "Economy & Civic", detail: "Live breaking news from real sim events plus hometown tickers (AGRI, INDL, RETL, RAIL, BYTE) moved by actual harvests, shortages, and rail traffic." },
  { name: "Reputation & 3-hop gossip", scale: "Big", category: "Minds & AI", detail: "Per-villager −10 to +10 opinion spreading 3 hops via street chats & family dinners — controlling 10–20% discounts, home entry, refusals & police snitches." },
  { name: "Shifts (13 live-event jobs)", scale: "Big", category: "Street & GTA", detail: "Firefighter, Police, Paramedic, Taxi, Bus, Delivery, Train, Pilot, Electrician, Construction, Chef, PVTV Reporter & Farmer paid from real tills." },
  { name: "Spring thaw & drifting snow", scale: "Medium", category: "World & Engine", detail: "Snow retreats into soft drifts with wet dark margins over a spring day; roads plough to slush; flattened straw-pale grass regreens over 1.5 days." },
  { name: "Synthesised 3D WebAudio", scale: "Medium", category: "World & Engine", detail: "Zero audio files: procedural street/room/UI buses, gear-shifting engines, surface footsteps, bird species by season, and distance-panned bells (750 m) & sirens (340 m)." },
  { name: "Traffic from 1.1 km valley horizon", scale: "Small", category: "Transit & Infra", detail: "Highways continue past map edges across the valley; tourists, delivery lorries & county vans visibly approach from 1.1 km out on the right-hand lane." },
  { name: "Ultra graphics & zero mid-game stutter", scale: "Medium", category: "World & Engine", detail: "61–65 shaders pre-compiled before frame 1, freeAfterUpload (-150 MB RAM), 24k-tri near vehicles with real glass/cabins, and opt-in Ultra kerb/sash shadows." },
  { name: "Wanted 1–5★ & witness sightlines", scale: "Big", category: "Street & GTA", detail: "Offences require patrol/camera/32 m villager line-of-sight (blocked by buildings); escalates from 1 cruiser to roadblocks, spike strips & 160 m chopper." },
];

export const STACK_CHIPS = [
  "TypeScript (strict, ~47k LOC)",
  "Three.js WebGL2 (custom PBR + GLSL)",
  "Headless Sim Core (0 DOM imports)",
  "WebAudio Procedural Synth (0 audio files)",
  "Web Worker PBR Texture Baker",
  "Groq Serverless AI Proxy (clamped)",
  "IndexedDB Saves + V1 Importer",
  "Vitest (170 headless & soak tests)",
  "Vite (~470 KB gzipped bundle)",
  "PWA Touch + Universal Gamepad Nav",
] as const;

export const HONEST_POSTSCRIPT: { head: string; body: string }[] = [
  {
    head: "Single-player today — architected headless for co-op tomorrow",
    body: "There is no multiplayer mode in this release, by choice. Because src/sim contains zero Three.js or browser globals and talks to the Founder exclusively through typed commands, the simulation is already shaped to run authoritatively in a Web Worker or co-op room server later.",
  },
  {
    head: "Free-tier Groq AI chat with zero-downtime mind fallback",
    body: "Villager LLM conversations run through a rate-limited serverless proxy (12/min per IP, 90/min global, 4,000/day default cap) on Groq's free tier. When offline or past the daily cap, dialogue switches seamlessly to deterministic mind-template lines that still read the villager's real traits, lights-out status, and diary.",
  },
  {
    head: "Three rail rolling-stock models in the current fleet",
    body: "While all four railway services (all-stops local, rush-hour commuter, express, and overnight freight plus the 3-hourly Intercity Express) run full timetables on wide 3-tile bends, they currently share three credited rail meshes (locomotive, railcar, and boxcar).",
  },
];
