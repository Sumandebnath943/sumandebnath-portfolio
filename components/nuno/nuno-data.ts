// NUNO — all copy, numbers and the image manifest for /games/nuno.
//
// Every number here was checked against the game's own repository at commit
// 4aac8fb (14 Oct 2026): modes and deck sizes in src/game/modes.ts, player
// limits in engine.ts, bot tuning in bot.ts, launcher odds in engine.ts, the
// character count in src/generated/art/manifest.json, and the relay's state
// against the live /api/ice endpoint. If the game changes, re-check these
// rather than trusting them.
//
// Screenshots were captured from the live build (Classic theme unless the
// file name says otherwise) — see public/nuno/.

/* ── Palette — the game's own ─────────────────────────────────────────────
   Night is the ground, ink the outline, cream the light bands, and the four
   card colours are the accents. Red and blue fail AA as small text on night
   (4.1 and 3.8), so as *text* on dark grounds they use the light tints; as
   fills they carry white bold type, which is the game's own treatment. */
export const NU = {
  night: "#17143d",
  nightDeep: "#100e2c",
  panel: "#221e52",
  panel2: "#2b2663",
  line: "rgba(255,248,234,0.12)",
  lineSoft: "rgba(255,248,234,0.07)",
  ink: "#1b1530",
  cream: "#fff8ea",
  cream2: "#f3e9d2",
  text: "#fff8ea",
  muted: "#c9c2e6",
  faint: "#a59fc8",
  // Muted text on cream (6.6:1) and its lighter step (5.1:1).
  inkMuted: "#5d5574",
  inkFaint: "#6e6684",
  red: "#e8333a",
  redDeep: "#c4232b",
  redLight: "#ff8a8e",
  yellow: "#ffc21a",
  yellowSoft: "rgba(255,194,26,0.12)",
  green: "#2eb34f",
  greenLight: "#5fd27a",
  blue: "#2f72e0",
  blueDeep: "#2160c8",
  blueLight: "#8db8ff",
  felt: "#1f8f45",
} as const;

export const LINKS = {
  live: "https://nuno-lemon.vercel.app",
} as const;

export type Shot = { src: string; alt: string; w: number; h: number };

const desk = (name: string, alt: string): Shot => ({ src: `/nuno/${name}.webp`, alt, w: 1440, h: 900 });
const phone = (name: string, alt: string): Shot => ({ src: `/nuno/${name}.webp`, alt, w: 720, h: 1600 });

export const IMG = {
  intro: desk("intro", "NUNO's opening screen: four tilted card tiles spelling NUNO over a fanned deck, with a yellow TAP TO PLAY button"),
  home: desk("home", "The NUNO home menu: the logo and a fan of cards on the left, the setup panel with name, mode, theme, players, bot skill and game length on the right"),
  modes: desk("modes", "The mode picker listing all six modes — Classic, No Mercy, Flip, Attack, All Wild and Spin — each with the game it is based on and its deck size"),
  table: desk("table-classic", "A six-player Classic table on the player's turn: green felt, five bot opponents around an oval, the prompt ‘Match Green or 6 — or play a Wild’, and the playable cards lifted out of the hand"),
  splash: desk("splash-skip", "A SKIP! splash over the discard pile reading ‘Duchess Duck misses a turn’, with a ‘Skipped!’ bubble at her seat"),
  feltBlue: desk("felt-blue", "The same table with the felt turned blue after a blue Draw Two, and ‘You drew 2’ under the piles"),
  colorPicker: desk("color-picker", "The Wild colour picker: a four-colour wheel showing how many cards of each colour the player holds"),
  challenge: desk("challenge", "The Wild Draw Four prompt: ‘Cosmo Cat hit you with +4! It's only allowed if they had no Yellow cards. Bluff?’ with Take it and Challenge! buttons"),
  challengeResult: desk("challenge-result", "The challenge result ‘NOT A BLUFF!’, showing the offender's hand to the challenger only"),
  roundOver: desk("round-over", "The round-over screen: ‘You win the game!’, the scoreboard, and every opponent's leftover cards with their points"),
  howToPlay: desk("how-to-play", "How to Play for Classic: mode tabs, your turn step by step, and the rules for setup and challenging a Wild Draw Four"),
  attack: desk("attack-launcher", "An Attack-mode table: no draw pile, a red card launcher marked HIT in its place, and the prompt ‘Hit the launcher (2 left)’"),
  phoneHome: phone("phone-home", "The NUNO home screen on a phone: the logo above a setup panel with mode and theme tiles, players, bot skill, game length and a PLAY button"),
  phoneLobby: phone("phone-lobby", "A room lobby on a phone: room code and Invite button, the voice-chat bar, and six seats with the host and five bots"),
  phoneTable: phone("phone-table", "A six-player table on a phone in portrait: a tall oval with blue felt, the hand as a strip along the bottom, and a ‘You're skipped!’ bubble"),
  og: { src: "/nuno/og.jpg", alt: "A six-player NUNO table on green felt", w: 1200, h: 630 },
} as const satisfies Record<string, Shot>;

export const HERO = {
  kicker: "Browser card game · 2–10 players · peer-to-peer",
  pitch:
    "Play bots on three difficulties, or send friends a link and talk over built-in voice chat while you play. Every card physically flies across the table, the bots wait for it to land before they think, and seven themes repaint the whole thing — scenery, cards, fonts and sound.",
  chips: ["6 official rule sets", "2–10 players", "0 game servers", "0 audio files", "100 tests", "React · TypeScript · WebRTC"],
  built: "Built 12–14 Oct 2026 · 11 commits · ~18,100 lines of TypeScript",
} as const;

export const STATS = [
  { value: "6", label: "Official rule sets", sub: "Classic, No Mercy, Flip, Attack, All Wild, Spin" },
  { value: "2–10", label: "Players per table", sub: "bots take every empty seat" },
  { value: "0", label: "Game servers", sub: "the host’s browser is the referee" },
  { value: "0", label: "Audio files", sub: "79 effects, 8 soundtracks, all synthesised" },
  { value: "62", label: "Characters", sub: "across six themes, each with their own lines" },
  { value: "1,020", label: "Bot games per test run", sub: "and not one card lost or duplicated" },
] as const;

export const NEEDS_NOTHING = [
  { icon: "📲", title: "No install", body: "It is a web page. Phones in portrait or landscape, tablets, desktops." },
  { icon: "🙈", title: "No account", body: "A name and an emoji, kept in your own browser and nowhere else." },
  { icon: "🛰️", title: "No game server", body: "The host’s phone runs the game. Friends connect straight to it." },
] as const;

/* ── 02 · the six modes ───────────────────────────────────────────────── */
export type ModeHue = "red" | "ink" | "violet" | "orange" | "rainbow" | "yellow";
export const MODES: { name: string; emoji: string; based: string; deck: string; twist: string; hue: ModeHue }[] = [
  { name: "Classic", emoji: "🎴", based: "UNO", deck: "108 cards", twist: "Challenge a Wild Draw Four bluff. First to 500.", hue: "red" },
  { name: "No Mercy", emoji: "💀", based: "UNO Show ’Em No Mercy", deck: "168 cards", twist: "Stack +2, +4, +6 and +10. Draw until you can play. 0 passes hands, 7 swaps. Hold 25 cards and you’re out. First to 1000.", hue: "ink" },
  { name: "Flip", emoji: "🌗", based: "UNO Flip", deck: "112 two-sided", twist: "A Flip card turns the whole game to the Dark Side — and you see the backs of everyone else’s cards.", hue: "violet" },
  { name: "Attack", emoji: "🚀", based: "UNO Attack", deck: "112 cards", twist: "No drawing. You press a card launcher that may fire nothing, or ten cards.", hue: "orange" },
  { name: "All Wild", emoji: "🌈", based: "UNO All Wild", deck: "112 cards", twist: "Every card is wild — no colours, no matching, no numbers. Only Wild actions, down to a Forced Swap.", hue: "rainbow" },
  { name: "Spin", emoji: "🎡", based: "UNO Spin", deck: "108 cards", twist: "20 Spin cards make the next player spin a nine-space wheel.", hue: "yellow" },
];

// engine.ts, launcher roll: r < 0.6 → 0; < 0.85 → 1–3; < 0.95 → 4–6; else 7–10.
export const LAUNCHER_ODDS = [
  { label: "Nothing", pct: 60 },
  { label: "1–3 cards", pct: 25 },
  { label: "4–6 cards", pct: 10 },
  { label: "7–10 cards", pct: 5 },
] as const;

// The nine Spin wheel spaces, all equally likely.
export const SPIN_SPACES = [
  "Almost NUNO", "Discard Number", "Discard Color", "Draw Red", "Draw Blue",
  "Trade Hands", "Show Hand", "War", "NUNO Spin",
] as const;

/* ── 03 · what each phone is told ─────────────────────────────────────── */
export const REDACTION = [
  { item: "Your own hand", sent: true, note: "every card, face up" },
  { item: "Everyone else’s hand", sent: false, note: "a count per seat, never the cards" },
  { item: "The draw pile", sent: false, note: "how many are left, not what they are" },
  { item: "Whether a Wild Draw Four was a bluff", sent: false, note: "a bluff only works if nobody can check" },
  { item: "Stable card ids", sent: false, note: "reassigned after every shuffle, so an id can’t be tracked" },
] as const;

/* ── 04 · the table ───────────────────────────────────────────────────── */
export const TABLE_POINTS = [
  { title: "Every card moves", body: "A riffle and a real deal start each round. Every draw flies from the deck to the player; every play flies to the pile." },
  { title: "The felt says the colour", body: "The table takes the colour in play, and arrows printed on the rim show the direction." },
  { title: "Plain words, not icons", body: "Big plays get a splash that says what happened — “Duchess Duck misses a turn”. A log lists the last moves; tapping the discard pile explains the top card." },
  { title: "Bots wait for the table", body: "The host and the screen read the same timing table, and the host holds every bot until the last card has landed. A test asserts it." },
] as const;

/* ── 05 · phones ──────────────────────────────────────────────────────── */
export const PHONE_POINTS = [
  { icon: "📶", title: "Switching apps no longer ends the room", body: "Sharing the invite in WhatsApp used to be enough to kill it. Now the host reconnects under the same room code, friends who open the link while the host is away wait for them, and a host whose phone reloaded the page gets the same room back." },
  { icon: "🪑", title: "A dropped friend keeps their seat", body: "Held for two minutes in the lobby. Mid-game, a bot plays it until they’re back — then they take their own seat and their own hand again." },
  { icon: "🎙️", title: "Voice chat in every room", body: "Mic off until you tap it, a green ring around whoever is talking, and a mute for anyone individually." },
  { icon: "🔀", title: "Mixed seating", body: "Each game shuffles the table so friends are spread out with bots between them, rather than all in a row." },
  { icon: "👆", title: "Tap to read, tap again to play", body: "Big hands become a swipeable strip, menus open as bottom sheets, and the layout stays clear of the notch and the home bar." },
  { icon: "🛰️", title: "A relay for mobile data", body: "Phones behind carrier NAT can be relayed while everyone else stays direct — and the game tells “the host is away” apart from “your network is blocking the link”." },
] as const;

/* ── 06 · themes ──────────────────────────────────────────────────────── */
// From src/themes/*.tsx: title, edition, display font, the theme's own night
// and highlight variables, its renamed moves and its rank function. The
// anime-themed screenshots were captured from the live build on 14 Oct 2026.
export type Theme = {
  id: string;
  title: string;
  inspired: string | null;
  edition: string | null;
  emoji: string;
  tagline: string;
  font: string;
  /** The theme's own night and highlight, from its CSS variables. */
  ground: string;
  glow: string;
  look: string;
  twists: string[];
  /** What the theme calls a Skip, a draw, a big draw and a Wild. */
  moves: { play: string; name: string }[] | null;
  /** The rank ladder, from a full hand down to one card. */
  ranks: string[] | null;
  rankLabel?: string;
  rankNote?: string;
  characters: number;
  table: Shot;
  home: Shot;
  cutin?: Shot;
};

const tshot = (id: string, kind: "table" | "home" | "cutin", alt: string): Shot => ({
  src: `/nuno/themes/${id}-${kind}.webp`,
  alt,
  w: 1440,
  h: 900,
});

const moves = (skip: string, draw: string, bigDraw: string, wild: string) => [
  { play: "Skip", name: skip },
  { play: "Draw", name: draw },
  { play: "Big draw", name: bigDraw },
  { play: "Wild", name: wild },
];

export const THEMES: Theme[] = [
  {
    id: "classic",
    title: "NUNO Classic",
    inspired: null,
    edition: null,
    emoji: "🎴",
    tagline: "The original toy-box look.",
    font: "Lilita One + Fredoka",
    ground: "#17143d",
    glow: "#ffc21a",
    look: "A sunburst in the four card colours, chunky ink outlines with hard shadows, and SVG cards drawn in the classic style — tilted oval, outlined numbers, quartered Wild.",
    twists: [
      "Fully original — every card is SVG, every effect procedural, every sound synthesised",
      "Fourteen emoji bots with names to match: Granny Bluff, DJ Draw Two, Sir Skips-a-Lot",
      "The default theme, and the one the rest of this page is shot in",
    ],
    moves: null,
    ranks: null,
    characters: 0,
    table: IMG.table,
    home: IMG.home,
    cutin: IMG.splash,
  },
  {
    id: "naruto",
    title: "Hidden Leaf",
    inspired: "Naruto",
    edition: "Shinobi Edition",
    emoji: "🍥",
    tagline: "Leaves on the wind, kunai in the air.",
    font: "Shojumaru",
    ground: "#1a1424",
    glow: "#ff922b",
    look: "Sunset over a ninja village, falling leaves, and swirl-and-headband card backs.",
    twists: [
      "Shuriken and kunai fly at whoever gets hit",
      "The deal, and every draw of two or more, lands in a puff of smoke",
      "A ninja rank under every seat that climbs as the hand shrinks",
    ],
    moves: moves("Substitution Jutsu", "Shuriken Toss", "Shadow Clone Barrage", "Transformation Jutsu"),
    ranks: ["Academy", "Genin", "Chunin", "Jonin", "Hokage"],
    rankLabel: "Ninja rank",
    characters: 10,
    table: tshot("naruto", "table", "A Hidden Leaf table on the player's turn: orange felt, swirl card backs, and a ninja rank under every seat"),
    home: tshot("naruto", "home", "The NUNO home menu in the Hidden Leaf theme: a ninja village at sunset, the theme's characters standing over the logo, and a Shinobi Edition badge"),
    cutin: tshot("naruto", "cutin", "A Hidden Leaf cut-in: a character slides in on an orange band of speed lines while the splash reads ‘Shuriken Toss +2’"),
  },
  {
    id: "mha",
    title: "Hero Academy",
    inspired: "My Hero Academia",
    edition: "Hero Edition",
    emoji: "💥",
    tagline: "Comic-panel smashes and a hero skyline.",
    font: "Bangers",
    ground: "#0b1d3a",
    glow: "#ffd600",
    look: "Comic halftones, a hero-city skyline, and a hazard-stripe table.",
    twists: [
      "SMASH-style comic starbursts on every big play",
      "Speed lines raking down from the corners of the sky",
      "A live hero ranking under every seat",
    ],
    moves: moves("Sidestep SMASH", "Double SMASH", "ULTRA SMASH", "Quirk Awakening"),
    ranks: ["Civilian", "Hero Student", "Sidekick", "Pro Hero", "No.1 Hero"],
    rankLabel: "Hero ranking",
    characters: 15,
    table: tshot("mha", "table", "A Hero Academy table: a comic ‘REVERSE!’ starburst over red felt inside a hazard-stripe rim"),
    home: tshot("mha", "home", "The NUNO home menu in the Hero Academy theme: a hero-city skyline, the theme's characters over the logo, and comic-book lettering"),
    cutin: tshot("mha", "cutin", "A Hero Academy cut-in bursting across a green table as the comic splash reads ‘Sidestep SMASH — SKIP!’"),
  },
  {
    id: "onepiece",
    title: "Grand Line",
    inspired: "One Piece",
    edition: "Pirate Edition",
    emoji: "🏴‍☠️",
    tagline: "Bounty posters, cannon fire and treasure.",
    font: "Pirata One",
    ground: "#06223f",
    glow: "#ffca28",
    look: "Sunset at sea, WANTED-poster card backs, a ship-plank table and a treasure-map felt.",
    twists: [
      "Cannonballs for draw cards",
      "Gold coins burst out on every colour change and every NUNO shout",
      "A bounty under every seat that grows as the hand shrinks",
    ],
    moves: moves("Man overboard!", "Cannon fire!", "Full broadside!", "New course set"),
    ranks: ["12 cards · ฿0", "7 cards · ฿300M", "3 cards · ฿540M", "1 card · ฿660M"],
    rankLabel: "Bounty",
    rankNote: "60 million berries for every card under twelve, plus a million for every point scored.",
    characters: 8,
    table: tshot("onepiece", "table", "A Grand Line table: a WANTED-poster draw pile on treasure-map felt, with a bounty under every seat"),
    home: tshot("onepiece", "home", "The NUNO home menu in the Grand Line theme: a harbour town and pirate ships, the theme's characters over the logo, and a Pirate Edition badge"),
    cutin: tshot("onepiece", "cutin", "A Grand Line cut-in sliding across a blue table as the splash reads ‘New course set — WILD!’"),
  },
  {
    id: "aot",
    title: "Beyond the Walls",
    inspired: "Attack on Titan",
    edition: "Survey Corps Edition",
    emoji: "🗡️",
    tagline: "Signal flares, titan footsteps and the winged crest.",
    font: "Germania One",
    ground: "#14130f",
    glow: "#e0bd5c",
    look: "A colossal wall with a giant peeking over it, and winged-crest card backs.",
    twists: [
      "A colour change fires a signal flare in that colour",
      "Titan footsteps shake the table when someone is hit — harder for four or more",
      "Survey Corps ranks under every seat",
    ],
    moves: moves("Grappled!", "Titan footsteps…", "TITAN STOMP", "Signal flare!"),
    ranks: ["Trainee", "Garrison", "Scout", "Squad Leader", "Captain", "Commander"],
    rankLabel: "Rank",
    characters: 8,
    table: tshot("aot", "table", "A Beyond the Walls table: a winged-crest draw pile on gold felt, with a Survey Corps rank under every seat"),
    home: tshot("aot", "home", "The NUNO home menu in the Beyond the Walls theme: a walled city at dusk with a giant at the edge, and the theme's characters over the logo"),
    cutin: tshot("aot", "cutin", "A Beyond the Walls cut-in sliding across the table as the splash reads ‘Signal flare! — WILD!’ and the felt turns red"),
  },
  {
    id: "demonslayer",
    title: "Wisteria Night",
    inspired: "Demon Slayer",
    edition: "Slayer Corps Edition",
    emoji: "🌸",
    tagline: "Every colour is a Breathing Style.",
    font: "Shippori Mincho B1",
    ground: "#0b0a18",
    glow: "#d9b8ff",
    look: "Full moon and wisteria, checkered-haori card backs and felt.",
    twists: [
      "Every colour is a Breathing Style — red is Flame, blue Water, yellow Thunder, green Wind",
      "The pile names it: “Red · Flame Breathing”",
      "Slayer Corps ranks under every seat",
    ],
    moves: moves("First Form: Skip", "Crossing Slash", "Constant Flux", "Breathing changes…"),
    ranks: ["Mizunoto", "Mizunoe", "Kanoe", "Tsuchinoe", "Hinoe", "Kinoe", "Hashira"],
    rankLabel: "Corps rank",
    characters: 11,
    table: tshot("demonslayer", "table", "A Wisteria Night table: checkered red felt, the discard pile labelled ‘Red · Flame Breathing’"),
    home: tshot("demonslayer", "home", "The NUNO home menu in the Wisteria Night theme: a lantern-lit town at night, the theme's characters over the logo, and lilac buttons"),
    cutin: tshot("demonslayer", "cutin", "A Wisteria Night cut-in sliding across the checkered table on a lilac band as the splash reads ‘Crossing Slash +2’"),
  },
  {
    id: "dbz",
    title: "Power Level",
    inspired: "Dragon Ball Z",
    edition: "Saiyan Edition",
    emoji: "🐉",
    tagline: "Ki blasts, beams and a golden aura.",
    font: "Bungee",
    ground: "#0e1638",
    glow: "#ffd600",
    look: "A rocky wasteland, star-orb card backs and a tournament-tile table.",
    twists: [
      "Ki blasts for draw cards, a beam for the big ones",
      "A golden aura when you are down to one card",
      "A power level under every seat: 9,001 divided by the cards in hand",
    ],
    moves: moves("Instant Transmission", "Ki Blast!", "KAME-HAME-HAAA!", "Power Up!"),
    ranks: ["7 cards · PL 1,286", "3 cards · PL 3,000", "2 cards · PL 4,501", "1 card · PL 9000+"],
    rankLabel: "Power level",
    characters: 10,
    table: tshot("dbz", "table", "A Power Level table: a star-orb draw pile on blue felt, with a power level under every seat"),
    home: tshot("dbz", "home", "The NUNO home menu in the Power Level theme: a rocky wasteland, the theme's characters over the logo, and a Saiyan Edition badge"),
    cutin: tshot("dbz", "cutin", "A Power Level cut-in powering up beside a blue table as the splash reads ‘Ki Blast! +2’"),
  },
];

/* ── 07 · sound and bots ─────────────────────────────────────────────── */
export const SOUNDS = ["airhorn", "sad trombone", "wolf whistle", "taiko", "sword shing", "ki charge", "cannon", "beam"] as const;

// bot.ts → TUNING. Percentages are the per-event chances.
export const BOTS = {
  cols: ["Chill", "Normal", "Savage"] as const,
  icons: ["☕", "⚡", "🔥"] as const,
  rows: [
    { label: "Remembers to shout NUNO", v: [75, 88, 97] },
    { label: "Catches you forgetting", v: [35, 60, 90] },
    { label: "Bluffs a Wild Draw Four", v: [0, 6, 15] },
    { label: "Stacks a draw in No Mercy", v: [60, 85, 100] },
  ],
} as const;

/* ── 08 · the build ──────────────────────────────────────────────────── */
export const DECISIONS = [
  { title: "The rules are a pure reducer.", body: "State plus action gives a new state, and an illegal move returns the same object untouched. That made six rule sets testable by simulation: every test run plays 1,020 bot games — 300 Classic plus 120 in each of the six modes — and checks that no card is ever lost or duplicated." },
  { title: "The host is the referee, not a server.", body: "A friends’ card game doesn’t need infrastructure. The cost is that the host leaving ends the game — an accepted trade." },
  { title: "One clock for the screen and the bots.", body: "Every animation timing lives in one file that both the table and the host read. The host holds the bots until the table has caught up, and the Relaxed / Normal / Quick pace scales both." },
  { title: "Phones first, measured in what not to do.", body: "No live blur — backgrounds are blurred at build time. Card flights on the Web Animations API and hand movement in CSS transitions, both off the main thread. An effects canvas that sleeps when idle and lowers its own particle count when frames drop." },
  { title: "Art is processed once, offline.", body: "A Python script trims the originals, crops each character’s face, compresses to WebP and writes a manifest. The site ships only the small copies." },
  { title: "Keys stay off the phone.", body: "The relay’s API token lives in a serverless function that hands each player credentials that expire after six hours." },
  { title: "Plain words everywhere.", body: "Splashes, errors and How to Play — every rule and every card, in every mode — are written for someone who has never read an instruction sheet." },
] as const;

/* ── 09 · gallery ────────────────────────────────────────────────────── */
export const GALLERY: { shot: Shot; label: string; note: string }[] = [
  { shot: IMG.intro, label: "The opening", note: "N, U, N slam down, the O arrives late — and TAP TO PLAY is the tap that unlocks sound." },
  { shot: IMG.home, label: "Home", note: "The whole setup on one screen: name, mode, theme, bots or friends, players, skill, length." },
  { shot: IMG.modes, label: "Mode picker", note: "Six rule sets, each with the game it is based on and its deck size." },
  { shot: IMG.howToPlay, label: "How to Play", note: "Every mode step by step, every card with its count and points — matched to the engine." },
  { shot: IMG.colorPicker, label: "Wild colour picker", note: "The numbers show how many of each colour you hold." },
  { shot: IMG.feltBlue, label: "The felt follows the colour", note: "A blue Draw Two turned the table blue; the line underneath says what it did to you." },
  { shot: IMG.attack, label: "Attack’s launcher", note: "No draw pile — a launcher sits in its place, and the prompt counts your presses." },
  { shot: IMG.roundOver, label: "Round over", note: "Scores count up, and every leftover card is laid out with what it was worth." },
];

/* ── 10 · engineering notes ──────────────────────────────────────────── */
export const NOTES = [
  {
    n: "01",
    title: "Sharing the invite killed the room",
    constraint: "Phones cut a page’s connections the moment you switch apps. Opening WhatsApp to send the invite link was enough to kill the room the link pointed to.",
    resolution: "The host now re-registers with the signalling server under the same room code whenever the link drops, and renews it after eight seconds in the background. Each tab carries an id, so a returning player is given their own seat and hand back. Thirteen end-to-end tests run rooms against a fake PeerJS to keep it that way.",
    quote: "The act of inviting a friend was the thing that ended the game.",
  },
  {
    n: "02",
    title: "Bots that wait for the table",
    constraint: "The game state changes instantly; the screen needs time to show it. Early builds let bots play while the previous card was still in the air, and a round was over before anyone could follow it.",
    resolution: "Every event has a duration in one shared timing table. The host adds those durations up and holds every bot until the table has caught up. The fix was to slow the bots to the speed of the table — not to speed the table up.",
    quote: "The game is instant. The table is not. The bots now wait for the table.",
  },
  {
    n: "03",
    title: "No server, and still a secret",
    constraint: "With no server, the host’s browser holds everyone’s cards — and a bluffed Wild Draw Four is only a bluff if nobody can see the hand.",
    resolution: "The host never sends the raw game. Each player gets a view built for their seat: their own hand, other players’ counts, nothing from the draw pile, and no bluff flag. Card ids are reassigned after every shuffle. Only the challenger sees the offender’s hand after a challenge.",
    quote: "Each phone is told exactly what its player could see at a real table, and nothing else.",
  },
  {
    n: "04",
    title: "Phones on mobile data couldn’t find each other",
    constraint: "On Wi-Fi, direct links almost always work. On mobile data, thousands of phones share one public address, and joining hung on “Finding the room…”.",
    resolution: "A small serverless function fetches short-lived Cloudflare TURN credentials so blocked players are relayed while everyone else stays direct. The game checks whether the relay answers from your network, and a blocked guest is told their network is the problem — not that the host left.",
    quote: "Waiting for the host and being blocked from the host look identical. Now the game tells them apart.",
  },
] as const;

/* ── 11 · constraints and postscripts ────────────────────────────────── */
export const CONSTRAINTS = [
  { title: "The host leaving ends the game", body: "Everyone is connected to the host, not to a server, so there is nothing to hand the game to." },
  { title: "Games aren’t saved", body: "No accounts means no history and no stats between sessions." },
  { title: "Rooms need a public signalling server", body: "Players find each other through PeerJS’s free public server. If it is down, rooms can’t open — solo games against bots are unaffected." },
  { title: "The mobile-data relay isn’t switched on yet", body: "It is built, tested and deployed, but its Cloudflare keys haven’t been added in production. Until they are, some phones on mobile data may not be able to join. Checked 14 Oct 2026." },
] as const;

export const POSTSCRIPTS = [
  "The first version shipped with a dead “Play again” button — it sent a request the rules engine rejected.",
  "Invite links could seat the same person twice: a session destroyed while PeerJS was still loading connected anyway. Fixed the same day.",
  "It was too fast to follow. Bots played while cards were still in the air.",
  "Phones stuttered in long games — live blur filters, and a fresh audio buffer for every sound effect. Both removed.",
  "Wide anime fonts overflowed everything: names cut off, splash words off-screen. Text is now measured and sized per font.",
] as const;

export const STACK = [
  "React 18", "TypeScript", "Vite", "Tailwind CSS", "PeerJS · WebRTC", "WebAudio", "Canvas 2D",
  "Web Animations API", "Framer Motion", "Vitest", "Vercel Functions", "Cloudflare TURN", "Python · Pillow",
] as const;
