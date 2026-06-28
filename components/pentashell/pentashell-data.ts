/* ─────────────────────────────────────────────────────────────────────────
   Pentashell landing-page data.

   Every value here is traceable to the project's own source-of-truth
   (PROJECT_BIBLE.md / PROJECT_REPORT.md). No invented numbers, no fake
   reviews. If it isn't verified there, it isn't here.
   ──────────────────────────────────────────────────────────────────────── */

export const GITHUB = "https://github.com/Sumandebnath943/pentashell-cli";
export const MODEL_PAGE = "/slms/pentacmd";
export const COMMAND = "pentacmd";

/* Brand palette — derived from the product artwork (cyan → violet → magenta). */
export const C = {
  cyan: "#2FE2F0",
  cyanSoft: "#7DEFF7",
  violet: "#9B6BF2",
  magenta: "#F25FD0",
  green: "#36E0A0", // safe / run / approved
  red: "#FF4D6D", // destructive risk
  amber: "#F5B23D", // caution / auto-detect
} as const;

/* ── Verified example outputs (run locally on CPU). Bible §9 / Report §3. ── */
export type Example = {
  instruction: string;
  family: "git" | "python" | "npm" | "powershell" | "bash";
  how: string; // how the family was decided
  command: string;
};

export const EXAMPLES: Example[] = [
  { instruction: "undo my last commit", family: "git", how: "you chose --git", command: "git revert HEAD" },
  { instruction: "undo my last commit but keep my changes", family: "git", how: 'auto · "commit"', command: "git reset --soft HEAD~1" },
  { instruction: "create a branch called payments and switch to it", family: "git", how: 'auto · "branch"', command: "git switch -c payments" },
  { instruction: "make a virtual environment with venv", family: "python", how: 'auto · "virtual environment"', command: "python -m venv venv" },
  { instruction: "install the requests package with pip", family: "python", how: 'auto · "pip"', command: "pip install requests" },
  { instruction: "start the dev server", family: "npm", how: 'auto · "dev server"', command: "npm run dev" },
  { instruction: "list all files in this folder", family: "powershell", how: "you chose --powershell", command: "Get-ChildItem" },
  { instruction: "make a new directory called logs", family: "bash", how: "you chose --bash", command: "mkdir logs" },
];

/* ── The five command families. Keywords are illustrative of the real
   whole-word, phrase-weighted detector. Bible §5.3. ── */
export type Family = {
  id: Example["family"];
  flag: string;
  color: string;
  blurb: string;
  keywords: string[];
  sample: { instruction: string; command: string };
};

export const FAMILIES: Family[] = [
  {
    id: "git",
    flag: "--git",
    color: C.magenta,
    blurb: "Version control — the strongest family (100% exact-match in training).",
    keywords: ["commit", "branch", "merge", "rebase", "stash", "remote"],
    sample: { instruction: "create a branch called payments and switch to it", command: "git switch -c payments" },
  },
  {
    id: "npm",
    flag: "--npm",
    color: C.cyan,
    blurb: "Node tooling — scripts, packages, and the dev server.",
    keywords: ["dev server", "install", "run", "package", "node", "build"],
    sample: { instruction: "start the dev server", command: "npm run dev" },
  },
  {
    id: "python",
    flag: "--python",
    color: C.violet,
    blurb: "Python land — pip and venv. A known weak family (~69%).",
    keywords: ["virtual environment", "venv", "pip", "package", "python", "requirements"],
    sample: { instruction: "make a virtual environment with venv", command: "python -m venv venv" },
  },
  {
    id: "powershell",
    flag: "--powershell",
    color: C.cyanSoft,
    blurb: "Windows-native shell — listing, files, execution policy.",
    keywords: ["execution policy", "get-childitem", "list", "windows", "powershell"],
    sample: { instruction: "list all files in this folder", command: "Get-ChildItem" },
  },
  {
    id: "bash",
    flag: "--bash",
    color: C.green,
    blurb: "The default fall-back when nothing else matches (~68%).",
    keywords: ["mkdir", "directory", "folder", "touch", "echo", "chmod"],
    sample: { instruction: "make a new directory called logs", command: "mkdir logs" },
  },
];

/* ── Model spec sheet. Inherited from Phase 1. Bible §3 / §13. ── */
export const MODEL_SPECS: { label: string; value: string; note?: string; icon: string }[] = [
  { label: "Parameters", value: "47.2M", note: "47,233,280", icon: "M6 6h12v12H6z M9 9h6v6H9z M9 3v2 M15 3v2 M9 19v2 M15 19v2 M3 9h2 M3 15h2 M19 9h2 M19 15h2" },
  { label: "Architecture", value: "Decoder-only", note: "nanoGPT-style transformer", icon: "M12 2l9 5-9 5-9-5z M3 12l9 5 9-5 M3 17l9 5 9-5" },
  { label: "Layers · Heads · Width", value: "8 · 10 · 640", note: "weight-tied embeddings", icon: "M4 8h9 M17 8h3 M4 16h3 M11 16h9 M13 6v4 M7 14v4" },
  { label: "Context length", value: "256", note: "tokens", icon: "M4 7V4h3 M20 7V4h-3 M4 17v3h3 M20 17v3h-3 M8 12h8" },
  { label: "Vocabulary", value: "12,000", note: "byte-level BPE", icon: "M5 7V5h14v2 M12 5v14 M9 19h6" },
  { label: "Validation exact-match", value: "~86.7%", note: "100% on git", icon: "M20 6L9 17l-5-5" },
];

/* ── The six tested increments + the lesson each one taught. Report §2/§5. ── */
export const BUILD_STEPS: { n: string; title: string; body: string; lesson: string }[] = [
  {
    n: "01",
    title: "Core inference wrapper",
    body: "Load the model once, format the exact trained prompt, greedy-decode, print the command.",
    lesson: "Preserve the prompt format with no trailing space after “### Command:” — a trailing space made the model drop the first word of every command.",
  },
  {
    n: "02",
    title: "Callable from anywhere",
    body: "Turn the script into an installable package with a pentacmd entry point on PATH.",
    lesson: "Let the usage decide the architecture — because users install it, the weights have to travel with the package.",
  },
  {
    n: "03",
    title: "Family handling",
    body: "Explicit flags plus transparent keyword auto-detection, with the choice always shown.",
    lesson: "Match whole words and weight phrases — “tar” was matching inside “start”, and a generic word beat a specific phrase.",
  },
  {
    n: "04",
    title: "Approval & execution",
    body: "Run this? [y/N], default No. Destructive commands get a stronger, risk-naming gate.",
    lesson: "Safety is logic to be verified, not a vibe — unit-tested for both catches and false positives.",
  },
  {
    n: "05",
    title: "Interactive UI polish",
    body: "rich colour, a typing-reveal animation, and a REPL loop with the model kept warm between turns.",
    lesson: "Small platform details bite — plain print mangled an em-dash on the Windows console; rich fixed the encoding for free.",
  },
  {
    n: "06",
    title: "Documentation & packaging",
    body: "A portfolio-ready README, MIT licence, project bible, and this report.",
    lesson: "Separate human output from machine output — notes go to stderr, the bare command to stdout, so piping stays clean.",
  },
];

/* ── Honest limitations, kept visible because they shape correct use. §11/§4. ── */
export const LIMITATIONS: { title: string; body: string }[] = [
  {
    title: "It can be confidently wrong",
    body: "A 47M model can return a plausible-but-incorrect command. That is exactly why the approval step exists — read every command before approving.",
  },
  {
    title: "Auto-detection is deliberately simple",
    body: "Keyword matching, not magic. Ambiguous phrasing can fall to the default bash family — a flag or family: prefix steers it.",
  },
  {
    title: "Execution is Windows-first",
    body: "Commands run through PowerShell on Windows. The macOS/Linux bash path is implemented but untested on the build machine.",
  },
  {
    title: "It is not an agent",
    body: "One instruction → one command → approve → run. No multi-step planning, no chaining, no acting on output. That is by design.",
  },
];

/* ── Tech stack. Bible §7 / §13. ── */
export const STACK: { name: string; role: string; color: string }[] = [
  { name: "PyTorch (CPU)", role: "Runs the 47M model — no GPU required", color: C.magenta },
  { name: "tokenizers", role: "Byte-level BPE encode / decode", color: C.cyan },
  { name: "rich", role: "Colour, panels, typing reveal, UTF-8 on Windows", color: C.violet },
  { name: "argparse", role: "Flags, family overrides, one-shot vs interactive", color: C.green },
  { name: "Python 3.9+", role: "Built on 3.12.7, per-user install", color: C.cyanSoft },
  { name: "PowerShell / bash", role: "The execution shell, streamed live", color: C.amber },
];

/* ── CLI reference. Bible §8. ── */
export const CLI_OPTIONS: [string, string][] = [
  ["pentacmd", "interactive loop — model loads once, then instant"],
  ['pentacmd "…"', "one-shot — family auto-detected"],
  ['pentacmd --git "…"', "force a family (bash · git · npm · python · powershell)"],
  ['pentacmd -n "…"', "print the command only — never runs"],
  ["family: …", "inside the loop, prefix to force a family"],
];

/* ── Marquee ticker phrases. ── */
export const TICKER = [
  "One instruction",
  "One command",
  "Your approval",
  "Fully local",
  "No GPU",
  "47M parameters",
  "Five families",
  "Default · No",
  "Names the risk",
  "~86.7% exact-match",
  "Built from scratch",
];
