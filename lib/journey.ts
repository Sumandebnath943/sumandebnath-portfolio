/**
 * "Something you won't find in my resume" — the story, as data.
 *
 * The résumé (lib/resume.ts) is the record: titles, dates, outcomes. This is the
 * part underneath it — how someone with no plan and no obvious talent ended up
 * where the résumé starts. The two must not contradict each other, so the dates
 * here are the dates there:
 *
 *   BA English (Hons), West Bengal State University ....... 2013–2016
 *   MBA Marketing, PIBM .................................. 2016–2018
 *   CBS Ventures, Kerala ................................. Jan–Oct 2018
 *   PIBM ................................................. Mar 2019 – present
 *
 * Every claim with a number behind it is either evidenced by an artifact in
 * `public/journey-assets/` or is Suman's own recollection, and the two are
 * deliberately never blurred: `stat` values that came off a screenshot carry the
 * screenshot beside them.
 *
 * On the artifacts: the originals are full-screen grabs holding other people's
 * names, faces and a personal bookmarks bar. They live OUTSIDE the served folder
 * in `_source-journey-assets/`, and only the cropped evidence is in `public/`.
 * If new artwork is ever regenerated from an original, crop it the same way —
 * see scripts/ or the crop list in the commit that introduced this file.
 */

export type Interaction =
  | "begin" // enter the story
  | "assemble" // broken words snap into a sentence
  | "choose" // two doors; the story takes the other one
  | "attend" // mark the days he showed up
  | "grow" // hold to grow the follower counter
  | "unlock" // reveal the self-taught stack, one tool at a time
  | "travel" // Kolkata to Pune
  | "reveal" // uncover the Illusion logo
  | "shut" // the door that closed
  | "open" // the portfolio that opened it again
  | "pile" // the KRAs stack up
  | "wait" // the months nobody asks about
  | "expand" // seven years, opened out
  | "build" // ship the AI products
  | "converge" // the four circles meet
  | "finish"; // the ask

export type Artifact = {
  src: string;
  /** Shown under the artifact. Says what it is and when. */
  caption: string;
  alt: string;
  /** Portrait phone grabs need a different frame from wide desktop grabs. */
  shape?: "wide" | "tall" | "mark";
};

export type Stat = { value: string; label: string };

export type Chapter = {
  id: string;
  /** Shown as the chapter's timestamp. Not always a single year. */
  when: string;
  title: string;
  /** The narrative. Each string is one paragraph. */
  lines: string[];
  /** The one line that carries the chapter, pulled out visually. */
  pull?: string;
  art: string;
  interaction: Interaction;
  /** The label on the control that advances the story. */
  cue: string;
  stats?: Stat[];
  artifacts?: Artifact[];
  /** Everything that would otherwise be cut. Opened, never forced. */
  depth?: { label: string; items: string[] };
};

export const JOURNEY_TITLE = "Something you won't find in my resume";
export const JOURNEY_DECK =
  "Seventeen years, from a boy who could not put one English sentence together to " +
  "someone who ships AI products alone. No plan at any point. You have to walk it " +
  "with me — it does not scroll past on its own.";

export const chapters: Chapter[] = [
  {
    id: "prologue",
    when: "Before any of it",
    title: "I was never the talented one",
    lines: [
      "There is a version of this story where the child is gifted, the parents spot it early, and everything after is just the plan unfolding. That is not this story.",
      "I was mediocre. Genuinely, unremarkably mediocre. I had no goal, no subject I burned for, no picture of who I would become. I went with the flow, and the flow did not seem to be going anywhere in particular.",
      "Everything that follows happened to someone with no plan. I think that is the only part of it worth telling.",
    ],
    pull: "I went with the flow. The flow did not seem to be going anywhere.",
    art: "prologue",
    interaction: "begin",
    cue: "Start where it started",
  },
  {
    id: "tutor",
    when: "2009 · Class 9",
    title: "The tutor who was never supposed to be mine",
    lines: [
      "I could not speak one correct sentence in English. Not a hard one — one. It was the subject I was quietly certain I would never be any good at, and I had arranged my expectations accordingly.",
      "Then my tutors changed. Not because anyone planned it — there was trouble with the previous ones, and a replacement arrived. His name was Sunirmal Babu.",
      "He did not fix my grammar first. He made me like the thing. That turns out to be the whole trick, and almost nobody does it. Within two years the boy who could not manage a sentence took a star mark in English in his secondary exam.",
      "I have thought about this a lot since. Nothing about my life was engineered. The single most important input arrived because somebody else had a scheduling problem.",
    ],
    pull: "The most important thing that ever happened to me was an accident of scheduling.",
    art: "tutor",
    interaction: "assemble",
    cue: "Put the sentence together",
  },
  {
    id: "commerce",
    when: "2011 · The wrong turn, taken deliberately",
    title: "So naturally, I chose commerce",
    lines: [
      "Star mark in English. The obvious next step was English. I went and did commerce.",
      "I want to be honest that there was no strategy in this. It was what people around me did, so I did it, and for a while it worked better than it had any right to. I fell in love with commerce. Debits, credits, the logic of it — I was good at it.",
      "Then something happened.",
      "It is not in this story. But its effect is: whatever grip I had on the subject was simply gone. Not weakened. Gone. I finished my 12th holding nothing.",
    ],
    pull: "Something happened. It is not in this story. Its effect is.",
    art: "commerce",
    interaction: "choose",
    cue: "Pick the sensible door",
  },
  {
    id: "college",
    when: "2013–2016 · The college that said yes",
    title: "One small college said yes",
    lines: [
      "After 12th I decided on English Honours — back to the one thing that had ever caught. My English marks were excellent. Every other mark was equally, symmetrically terrible.",
      "I searched for a long time. One very small college in New Barrackpore said yes: New Barrackpore Prafulla Chandra Mahavidyalaya. NBPCM. I owe it more than it knows, because nobody else was offering.",
      "And then I did not go.",
      "Across three years of my undergraduate degree I can still count the days I attended. Not estimate — count. I was not out being a rebel. I was at home, on a dial-up connection, teaching myself something nobody had assigned.",
    ],
    pull: "Three years of college. I can still count the days I attended.",
    art: "college",
    interaction: "attend",
    cue: "Mark the days he showed up",
  },
  {
    id: "wolambo",
    when: "2011–2016 · World of Lamborghini",
    title: "A page about supercars, run by a boy with no car",
    lines: [
      "It started as a Facebook page called World of Lamborghini. I had never sat in one. That did not seem relevant.",
      "It went past 82,000 followers. For context: in 2013 that was not a growth-hack, a budget or a team. It was a teenager posting relentlessly from a bedroom in West Bengal, on an internet connection you would not accept today.",
      "One post — a Lamborghini against a Mustang, December 2015 — eventually reached 677,503 people. I still have the screenshot, because I did not entirely believe it either.",
      "Then I built it a home. WOLAMBO went to Twitter, Instagram, a YouTube channel, and its own website at wolambo.weebly.com — which I designed, wrote and published myself. The blog still exists. I have not posted on it in about ten years.",
    ],
    pull: "82,000 followers, from a bedroom, on dial-up, at nineteen.",
    art: "wolambo",
    interaction: "grow",
    cue: "Hold to grow the page",
    stats: [
      { value: "677,503", label: "reach, one post" },
      { value: "82,000+", label: "followers at peak" },
      { value: "31,541", label: "blog visitors, one week" },
    ],
    artifacts: [
      {
        src: "/journey-assets/wolambo-post-677k.jpg",
        caption: "The drift-battle post, revisited in 2019 — 677,503 people reached.",
        alt: "Facebook post from World of Lamborghini dated 16 December 2015, showing 677,503 people reached.",
        shape: "tall",
      },
      {
        src: "/journey-assets/wolambo-page.png",
        caption: "The page itself, September 2015 — 68,448 reach that week.",
        alt: "The World of Lamborghini Facebook page with its cover art and weekly reach panel.",
      },
      {
        src: "/journey-assets/wolambo-post-256k.png",
        caption: "The same post at the time: 256,236 reached, 8,049 engagements.",
        alt: "Facebook post insights showing 256,236 people reached and 8,049 reactions, comments and shares.",
      },
      {
        src: "/journey-assets/wolambo-blog.jpg",
        caption: "wolambo.weebly.com — built, written and published by me, 2016.",
        alt: "The World of Lamborghini website homepage with navigation and a Lamborghini article.",
      },
    ],
  },
  {
    id: "selftaught",
    when: "2013–2016 · The classroom I actually attended",
    title: "YouTube, on dial-up, instead of college",
    lines: [
      "Running the page was not enough. I wanted to know why things worked, so I taught myself the discipline underneath it — from YouTube, over dial-up, at an age when I was supposed to be in a lecture hall.",
      "Search engine optimisation. A Google Ads account. Google Analytics, where I learned to read real-time traffic, bounce rate, sources, retention. In 2013 and 2014, with nobody assigning it and nobody checking.",
      "I have the audience-retention chart from one of those videos: 61.48% average duration viewed. I was optimising watch-time before I had heard the phrase.",
      "In parallel I went deep into Adobe. Hundreds of hours of Photoshop. Then Premiere Pro, After Effects, Lightroom. Shooting, retouching, posters, pamphlets, brochures, logos. Everything I know about design today, I learned in the years I was not attending college.",
    ],
    pull: "I was optimising watch-time before I had heard the phrase.",
    art: "selftaught",
    interaction: "unlock",
    cue: "Open what he taught himself",
    stats: [
      { value: "61.48%", label: "average video retention" },
      { value: "200,341", label: "reach in one week" },
    ],
    artifacts: [
      {
        src: "/journey-assets/wolambo-retention.png",
        caption: "Audience retention, read and acted on at nineteen — 61.48% average.",
        alt: "Facebook video audience retention chart showing 61.48 percent average duration viewed.",
      },
      {
        src: "/journey-assets/wolambo-insights-200k.png",
        caption: "One week: 200,341 reach, 16,923 post clicks, 9,031 engaged.",
        alt: "Facebook page insights showing 200,341 total reach and 16,923 post clicks for one week.",
      },
      {
        src: "/journey-assets/wolambo-blog-stats.png",
        caption: "The blog's own numbers: 31,541 unique visitors in a week.",
        alt: "Weebly dashboard for wolambo.weebly.com showing 31,541 unique visitors and 34,904 page views in a week.",
      },
    ],
    depth: {
      label: "everything taught to himself, no course, no teacher",
      items: [
        "Search engine optimisation — on-page, structure, keywords",
        "Google Ads — account setup, campaigns",
        "Google Analytics — real-time, bounce rate, sources, retention",
        "Social strategy across Facebook, Twitter, Instagram, YouTube",
        "Website building and publishing (wolambo.weebly.com)",
        "Content writing and editorial calendars",
        "Adobe Photoshop — hundreds of hours",
        "Adobe Premiere Pro — editing",
        "Adobe After Effects — motion and logo animation",
        "Adobe Lightroom — photo processing",
        "Photography, retouching, photo editing",
        "Posters, pamphlets, brochures, logos",
      ],
    },
  },
  {
    id: "mba",
    when: "2016 · Kolkata → Pune",
    title: "Marketing, by elimination",
    lines: [
      "I did not want to teach, and I did not want an MA. So I changed direction again and decided on an MBA — which meant leaving Kolkata for Pune, and being somewhere I knew nobody.",
      "I chose marketing by elimination. I was never a finance person. I did not want HR. Marketing was what remained — and, as it happened, the only thing I had been doing for free since I was seventeen.",
      "I would like to say I then applied myself. I bunked classes to keep building things.",
    ],
    pull: "I chose marketing because it was the only box left. It was also the only thing I had ever done.",
    art: "mba",
    interaction: "travel",
    cue: "Take the train",
  },
  {
    id: "illusion",
    when: "2016–2017 · The company that never opened",
    title: "Illusion Effects · “Artificially Real”",
    lines: [
      "I wanted to start an agency. I called it Illusion Effects, and I gave it everything a company gets except customers: a logo, an animated logo intro, brochures, leaflets, a plan.",
      "I built all of it sitting in the college IT lab on a laptop with 4 GB of RAM, rendering motion graphics a few seconds at a time.",
      "It never opened. I have kept the logo for nine years.",
      "Its tagline was “Artificially Real”. I picked those two words in 2016 because they sounded good together. I now spend my working life building things that are exactly that, and I did not see it coming for another seven years.",
    ],
    pull: "I named it “Artificially Real” in 2016. It took me seven more years to understand what I had written.",
    art: "illusion",
    interaction: "reveal",
    cue: "Uncover the logo",
    artifacts: [
      {
        src: "/journey-assets/illusion-logo.png",
        caption: "Illusion Effects, 2016. The agency that never opened.",
        alt: "The Illusion Effects logo in red and black, with the tagline Artificially Real.",
        shape: "mark",
      },
    ],
  },
  {
    id: "rejected",
    when: "November 2017",
    title: "The one company I was waiting for, and the room I was thrown out of",
    lines: [
      "A company came to campus with the one profile I actually wanted — brand and digital marketing. I had been waiting the entire two years for that specific profile to walk in.",
      "I cleared the written round.",
      "I was cut in the group discussion.",
      "That is the whole event. There is no lesson inside it and no silver lining. I simply did not get through the round, on the day it mattered, for the only job I wanted.",
    ],
    pull: "I cleared the written. I was cut in the GD. For the only job I wanted.",
    art: "rejected",
    interaction: "shut",
    cue: "Close the door",
  },
  {
    id: "hired",
    when: "November 2017 · The other way in",
    title: "Hired on the spot, without an interview",
    lines: [
      "I did not go home. I went to Bibhas sir, the director of my college. He knew me — not from class, which I had a patchy relationship with, but from the work I had done with him. He knew what I could actually do.",
      "He called the CEO of that company and asked him to meet me.",
      "So I met him, and I did the only thing I had: I showed him the work. Designs. Websites. The blog. The campaigns. And a Facebook page with more than 80,000 followers that I had built at an age when most portfolios are empty.",
      "He hired me on the spot. No interview, no second round.",
      "The rejection was fair and the hire was fair, and they happened for the same reason: what I had built existed, and a form could not see it.",
    ],
    pull: "The interview could not see the work. A person could.",
    art: "hired",
    interaction: "open",
    cue: "Show him the work",
    artifacts: [
      {
        src: "/journey-assets/wolambo-page-52k.png",
        caption: "What was on the table that afternoon.",
        alt: "The World of Lamborghini Facebook page showing 52,605 likes.",
      },
      {
        src: "/journey-assets/wolambo-post-89k.png",
        caption: "89,205 reached on a single post — evidence, not a claim.",
        alt: "Facebook post insights showing 89,205 people reached and 7,175 post clicks.",
      },
    ],
  },
  {
    id: "kerala",
    when: "January – October 2018 · Kerala",
    title: "The hardest year, and the one I would not trade",
    lines: [
      "The job took me to Kerala, to a company called CBS Ventures. I will be plain about it: it was a brutal year, and I lasted about ten months.",
      "I also did everything. Design was my responsibility — pamphlets, brochures, posters, social creatives, logos, videos. Digital marketing was my responsibility. And then, because the company was what it was, HR became my responsibility too. I was taking interviews. I was barely out of college.",
      "It was a hard place to work and it made me competent. Both of those are true, and I have stopped trying to make them cancel out.",
      "The learnings from that year were priceless. I just would not want to buy them twice.",
    ],
    pull: "It was a hard place to work and it made me competent. Both are true.",
    art: "kerala",
    interaction: "pile",
    cue: "Take on one more thing",
    depth: {
      label: "what one job quietly contained",
      items: [
        "Pamphlets, brochures, posters",
        "Social media creatives and campaigns",
        "Logo design",
        "Video production and editing",
        "Digital marketing — end to end",
        "SEO and web presence",
        "Recruitment: screening and taking interviews",
        "Whatever else had nobody else assigned to it",
      ],
    },
  },
  {
    id: "gap",
    when: "October 2018 – February 2019",
    title: "Four months that are not on the résumé",
    lines: [
      "I left Kerala with no next thing arranged.",
      "Two months in Kolkata. Two months in Bangalore. Freelancing to stay afloat, and interviewing — repeatedly, and without success for a while.",
      "On a résumé this is a gap between two dates. In life it was four months of not knowing whether the first job had been the high point.",
      "I am including it because every career has these and almost nobody shows them. Mine is right here: October 2018 to February 2019.",
    ],
    pull: "On the résumé it is white space between two dates. It was four months of not knowing.",
    art: "gap",
    interaction: "wait",
    cue: "Wait it out",
  },
  {
    id: "pibm",
    when: "March 2019 – present · PIBM, Pune",
    title: "Seven years in the same building, and none of them the same",
    lines: [
      "I came back to Pune and joined PIBM in the brand marketing department. I am still there. It is the longest I have stayed anywhere, and the reason is that the job kept changing under me.",
      "I built a brand from scratch. I ran national programmes and international ones. I ran online reputation management for an institution, which is a polite phrase for standing between a brand and the internet on a bad day.",
      "I have designed, daily, with my own hands — and coordinated thousands more designs I did not draw. Brochures, leaflets, pamphlets, social creatives. Thousands of videos and content strategies. Hundreds of decks.",
      "And I have worked directly with the CEO and the chairman, nearly every working day, for seven years. That is the part I would put first if I were allowed only one line. Not the volume — the altitude.",
    ],
    pull: "Seven years reporting into the room where it gets decided.",
    art: "pibm",
    interaction: "expand",
    cue: "Open the seven years",
    stats: [
      { value: "7 yrs", label: "with the CEO & chairman" },
      { value: "1,000s", label: "designs coordinated" },
      { value: "100+", label: "decks and pitches" },
    ],
    depth: {
      label: "what seven years actually contained",
      items: [
        "Handled national programmes",
        "Handled international programmes",
        "Built a brand from scratch",
        "Online reputation management for the institution",
        "Brand image and positioning",
        "Online and digital marketing strategy",
        "Poster and campaign design, hands on, daily",
        "Social media management and social strategy",
        "Coordinated the digital marketing team",
        "Coordinated the web design team",
        "Coordinated the graphic design team",
        "Coordinated the admissions team",
        "Coordinated the counselling team",
        "Coordinated the sales team",
        "Coordinated the academic team",
        "Worked daily with the CEO and chairman",
        "Countless PPTs, product decks and product pitches",
        "Thousands of designs coordinated: brochures, leaflets, pamphlets, social",
        "Thousands of videos and content strategies",
        "Hundreds of designs and pieces of content made personally",
      ],
    },
  },
  {
    id: "ai",
    when: "2023 – present",
    title: "Teaching myself a second time",
    lines: [
      "When AI became a daily word, I did what I did at nineteen: I went and learned it, without anyone assigning it.",
      "In roughly two years I have built more than twenty working AI products. I have shipped over forty agents that run on their own. I have built my own small language model and fine-tuned a large one. I write context-aware prompts as a discipline, not a trick.",
      "I do not know how to code. I want to say that clearly, because people assume it and then feel misled.",
      "What I know is what to build and how to get it built — the requirement, the architecture, the trade-off, the release. AI closed the gap between the person who can specify a product and the person who can produce one. I had spent ten years becoming the first. I became the second in two.",
    ],
    pull: "I do not know how to code. I have shipped twenty products. Both sentences are true.",
    art: "ai",
    interaction: "build",
    cue: "Ship them",
    stats: [
      { value: "20+", label: "AI products shipped" },
      { value: "40+", label: "autonomous agents" },
      { value: "1 + 1", label: "own SLM · fine-tuned LLM" },
    ],
    depth: {
      label: "the second self-teaching, itemised",
      items: [
        "ChatGPT, Claude, Gemini — worked with daily, to depth",
        "AI-native product development",
        "AI-native coding",
        "AI-assisted coding",
        "Scalable product development with AI",
        "20+ working AI products in ~2 years",
        "40+ AI agents running autonomously",
        "Built an SLM of my own (PentaCMD)",
        "Fine-tuned an LLM (Qdex-1.5B)",
        "Prompt engineering and context engineering",
      ],
    },
  },
  {
    id: "converge",
    when: "Now",
    title: "Jack of all trades. Master of many.",
    lines: [
      "The industry says “jack of all trades” as an insult. I have decided to take it as a description and be proud of it, because of what the four things add up to.",
      "I understand business. I understand marketing, because I have run it. I understand demand, because I have had to create it with no budget. And now I understand development, because I build.",
      "Most people have one of these. Some have two. The combination is rare, and it is rare for a boring reason: each one takes years, and nothing forces you to collect all four unless your career keeps refusing to go in a straight line.",
      "Mine never did. That turned out to be the advantage.",
    ],
    pull: "Business. Marketing. Demand. Development. Most people have one.",
    art: "converge",
    interaction: "converge",
    cue: "Bring them together",
  },
  {
    id: "five",
    when: "The ask",
    title: "This is 5%",
    lines: [
      "Some things I am proud of, in no particular order — including the one you are reading.",
    ],
    art: "five",
    interaction: "finish",
    cue: "Finish the story",
    depth: {
      label: "the list",
      items: [
        "Built a 200-page brochure in a single day",
        "Built 5 websites in one month — all SEO-ready, all with payment gateways",
        "Built 20+ AI applications through AI-native coding",
        "Made 100+ PPTs, product decks and business decks (and I hate making PPTs)",
        "I design, I actually use AI, I edit video, I run ads, I write strategy, I ideate, I ship products",
        "Built my own SLM, and fine-tuned an LLM",
        "Built 40+ AI agents that run on their own",
        "Write context-aware prompts as a discipline — prompt and context engineering",
        "This website. Try typing “hire” anywhere on it.",
      ],
    },
  },
];

/** The last line, kept out of the chapter data because it is the whole point. */
export const CLOSING_LINE =
  "This is 5%. I still have 95% left to achieve. Can you give me that opportunity to achieve that 95%?";

export const JOURNEY_ARTIFACT_NOTE =
  "Screenshots are cropped from originals from 2014–2019. Nothing has been recreated.";
