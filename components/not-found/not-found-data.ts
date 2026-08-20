import type { ClipName } from "@/components/robot/RobotModel";

/**
 * Copy and choreography for the 404.
 */

/**
 * The loop, in order, each played once at its own natural length.
 *
 * The arc is the joke: nobody comes here, so the robot is **asleep**; you wake
 * him and he has a **look** for the page you asked for; he does not find it and
 * **dances** anyway. Then round again.
 *
 * Durations come from the clips themselves — 17.6s / 8.0s / 3.8s, measured with
 * scripts/inspect-robot-glb.mjs. Nothing is re-timed: an earlier version ran
 * Sleeping at 1.45× to shorten the cycle and it read as a robot in fast-forward.
 * `playOnce` + `onFinished` sequences them at true speed instead.
 */
export const LOOP: readonly ClipName[] = ["Sleeping", "Looking", "SillyDancing"];

/**
 * Where the speech bubble sits, as a percentage down the robot's box.
 *
 * It has to move, because the robot does. Asleep he is a horizontal shape along
 * the floor and a bubble at the top of the frame is talking to empty air; awake
 * he is upright and his head is near the top. Transitioned in CSS so it glides
 * between the two rather than jumping on the clip change.
 */
export const CLIP_BUBBLE_TOP: Record<string, string> = {
  // Asleep he is a horizontal shape across the middle of the frame, so the
  // bubble sits above it. Once the per-clip camera centred the lying body this
  // had to come *up* — at 44% it was resting on top of him.
  Sleeping: "15%",
  // Upright, head near the top of the frame, so the bubble tucks just above it.
  Looking: "0%",
  SillyDancing: "0%",
};

/**
 * Camera per clip — position and field of view — eased between by CameraRig.
 *
 * One framing cannot serve both poses. Measured off screenshots at fov 30: the
 * standing robot filled only 17%–71% of the canvas, so a quarter of the box was
 * empty; raising the camera to centre him then pushed the sleeping body clean
 * off the bottom edge. These two entries are the resolution — tight on a
 * horizontal shape near the floor, tall and a little further back for an
 * upright one.
 */
export const CLIP_CAMERA: Record<
  string,
  { pos: [number, number, number]; look: [number, number, number]; fov: number }
> = {
  // The robot's feet sit at groupY = -1.15, so a body on the floor is a wide,
  // flat shape around y ≈ -1.0. Aim there and sit slightly above it, looking
  // down the way you would at someone asleep.
  //
  // 5.5 rather than 4.4, and this one is a WIDTH constraint, not a height one.
  // Lying down the robot is the widest thing this canvas ever has to hold —
  // fingertips to toes, well over two world units — and at 4.4 his feet were
  // clipped by the right edge. Horizontal framing depends on the canvas aspect
  // (visible width = visible height × aspect), so the box is also capped to
  // stay at least as wide as it is tall; see app/not-found.tsx. Without that
  // cap a tall desktop window makes the column narrower in proportion and the
  // clipping returns, having looked fine at every size it was tested at.
  Sleeping: { pos: [0, -0.15, 5.5], look: [0, -1.0, 0], fov: 24 },
  // Upright, ~1.8 units tall from -1.15 to 0.65, so its middle is y ≈ -0.25.
  // The aim sits a little above that middle, which pushes the figure down the
  // frame; pulled back to 5.8, that parks the standing robot
  // at roughly 22%–95% of the canvas instead of 9%–92%.
  //
  // The top fifth is deliberately kept empty: the speech bubble lives there,
  // and it is a fixed ~40px tall whatever the canvas is. That is 9% of a 454px
  // desktop canvas but **17% of a 240px mobile one**, which is why the bubble
  // clipped his head on phones first. Reserving the band in the *camera* rather
  // than by shrinking the canvas means the robot stays large and the clearance
  // holds at every viewport size, because vertical-fov framing is
  // aspect-independent.
  //
  // Both Looking and SillyDancing raise a hand above head height, so the
  // clearance is measured against the raised hand, not the scalp.
  Looking: { pos: [0, -0.05, 5.8], look: [0, -0.05, 0], fov: 24 },
  SillyDancing: { pos: [0, -0.05, 5.8], look: [0, -0.05, 0], fov: 24 },
};

/**
 * What he says, and **when he can say it**.
 *
 * Lines are per-clip because they are reactions, not decoration: "You woke me
 * up for this?" only makes sense once he is on his feet, and a robot who is
 * asleep should not be narrating the search. A line drawn from the wrong pool
 * is the difference between a character and a caption.
 */
export const CLIP_LINES: Record<string, readonly string[]> = {
  // Asleep. Barely conscious, and not addressing you yet.
  Sleeping: [
    "Zzz…",
    "Nobody ever comes to this page.",
    "Zzz… wake me if you find it.",
  ],
  // Awake and searching. This is where being disturbed belongs.
  Looking: [
    "You woke me up for this?",
    "Nothing here. I looked properly.",
    "This page has never existed.",
    "44 agents. None of them found it.",
  ],
  // Given up, enjoying himself anyway.
  SillyDancing: [
    "404. And I checked twice.",
    "No page. Still dancing.",
    "I found a résumé instead.",
    "Wrong turn — happens to everyone.",
  ],
};

/** How long a line stays up before the next one from the same pool. */
export const BUBBLE_MS = 5_500;

/** Real destinations. A 404 that is only a joke is a dead end. */
export const DESTINATIONS: readonly { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Résumé", href: "/resume" },
  { label: "Projects", href: "/projects" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" },
];
