import type { Post } from "../types";

const post: Post = {
  slug: "strictmode-defeats-init-guards",
  title: "React StrictMode permanently disables your init guard in development",
  answer:
    "React StrictMode mounts every component, runs cleanup, then remounts. A module-level `if (initialised) return` guard is set on the first mount, survives the cleanup because it lives outside the component, and blocks the second mount from ever re-attaching its listeners. The feature is then dead for the whole dev session while production works fine.",
  description:
    "Why a one-time initialisation guard plus React StrictMode leaves event listeners permanently detached in development, how to tell it apart from a real bug, and the two ways to fix it.",
  published: "2026-08-24",
  category: "React",
  pick: true,
  tags: ["React", "Debugging", "StrictMode"],
  readingMinutes: 5,
  facts: [
    { label: "Affects", value: "Development only — StrictMode double-mount is not in production" },
    { label: "Trigger", value: "Init state stored outside the component (module scope, or a ref never reset)" },
    { label: "Symptom", value: "Listeners attached once, then detached and never re-attached" },
    { label: "Tell", value: "Works on a production build, dead under `next dev`" },
  ],

  blocks: [
    {
      kind: "p",
      text: "My visitor tracking did nothing in development. Not intermittently — never. No errors, no failed requests, no warnings. On a production build it worked perfectly. That gap between the two is the entire fingerprint of this bug, and once you know it you can spot it in about ten seconds.",
    },

    { kind: "h2", id: "the-sequence", text: "The sequence" },
    {
      kind: "p",
      text: "StrictMode in development deliberately mounts a component, runs its effect cleanup, and mounts it again. The point is to surface effects that are not safe to run twice. It does that job well. It also punishes a very common pattern.",
    },
    {
      kind: "ol",
      items: [
        "First mount: the guard is unset, so initialisation runs and listeners are attached.",
        "The guard is set to true — but it lives in module scope, not component state.",
        "StrictMode runs cleanup: the listeners are removed.",
        "Second mount: the guard is still true, because unmounting a component does not reset a module-level variable.",
        "Initialisation is skipped. The listeners are never re-attached. Nothing runs for the rest of the session.",
      ],
    },
    {
      kind: "code",
      lang: "tsx",
      caption: "The shape that breaks. The guard outlives the component that set it.",
      code: `let initialised = false;           // module scope — survives unmount

export default function VisitorPing() {
  useEffect(() => {
    if (initialised) return;         // ← blocks the StrictMode remount
    initialised = true;

    const onScroll = () => { /* … */ };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}`,
    },
    {
      kind: "p",
      text: "The cleanup is correct. The guard is correct in isolation. The combination is what fails, and only under a mount/cleanup/remount cycle you never see in production.",
    },

    { kind: "h2", id: "why-it-hides", text: "Why it hides so well" },
    {
      kind: "callout",
      tone: "warn",
      title: "The failure mode is silence",
      text: "Nothing throws. The component renders. The effect runs — it just returns early. If the feature is analytics, telemetry, or anything else whose success is invisible, there is no symptom at all beyond an absence of data, and an absence of data looks exactly like nobody having visited.",
    },
    {
      kind: "p",
      text: "This compounds with any subsystem that already fails quietly. In my case the write path returns `false` on failure rather than throwing, so a partial failure and a success are indistinguishable from the calling side. Two silent layers stacked on top of each other take a long time to see through.",
    },

    { kind: "h2", id: "diagnosing", text: "Telling it apart from a real bug" },
    {
      kind: "p",
      text: "One check settles it. Build for production and run the built output — not `next dev`.",
    },
    {
      kind: "code",
      lang: "bash",
      code: `npm run build && npm start`,
    },
    {
      kind: "p",
      text: "If the feature works there and not in development, you are looking at a StrictMode interaction, not a bug in your logic. Do not spend the afternoon reading the logic.",
    },

    { kind: "h2", id: "fixing", text: "Two fixes" },
    { kind: "h3", id: "fix-scope", text: "1. Move the guard inside the component" },
    {
      kind: "p",
      text: "A `useRef` is re-created on the second mount, so the remount initialises normally. This is the right fix when the guard exists to protect against a double *run*, which is precisely what StrictMode is testing for.",
    },
    {
      kind: "code",
      lang: "tsx",
      code: `const initialised = useRef(false);

useEffect(() => {
  if (initialised.current) return;
  initialised.current = true;
  // …
}, []);`,
    },
    { kind: "h3", id: "fix-idempotent", text: "2. Make the effect idempotent and drop the guard" },
    {
      kind: "p",
      text: "Better still, write the effect so running it twice is harmless, and delete the guard entirely. `addEventListener` with a stable handler reference is already idempotent; a fetch that writes a row is not, and needs deduplication on the server side rather than a client-side flag that development will defeat.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Do not reach for the third option",
      text: "Turning StrictMode off makes the symptom disappear and leaves the underlying fragility in place. The double-mount is a test, and this is the test failing.",
    },

    { kind: "h2", id: "the-rule", text: "The rule I now follow" },
    {
      kind: "p",
      text: "Any state that decides whether an effect has already run must live at the same lifetime as the effect. Module scope outlives the component; a ref does not. When those two lifetimes disagree, development and production disagree with them — and the environment that lies to you is the one you spend all day in.",
    },
  ],

  faqs: [
    {
      q: "Why do my event listeners not work under React StrictMode in development?",
      a: "StrictMode mounts, cleans up, and remounts each component. If your initialisation guard is stored outside the component — in module scope — it stays true through the cleanup, so the second mount skips initialisation and never re-attaches the listeners the cleanup removed. The listeners stay detached for the rest of the session.",
    },
    {
      q: "How do I know if StrictMode is the cause and not my code?",
      a: "Run a production build and test against that. StrictMode's double-mount only happens in development, so a feature that works in the built output and fails under the dev server is almost certainly hitting this rather than a logic bug.",
    },
    {
      q: "Should I disable StrictMode to fix it?",
      a: "No. The double-mount is a deliberate test for effects that are not safe to run twice, and disabling it hides the symptom while leaving the fragility in place. Move the guard into a useRef so it resets with the component, or make the effect idempotent and remove the guard entirely.",
    },
  ],

  seeAlso: ["/learnings", "/agents/migi"],
};

export default post;
