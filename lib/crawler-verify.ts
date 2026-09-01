// Is the crawler who it says it is?
//
// A user agent is a string the client picks. "ChatGPT-User" costs nothing to
// type and is worth typing: a UA that reads like a well-behaved answer engine
// gets waved past filters that would stop `curl`. Scanners have noticed.
//
// On 2026-09-01 two requests arrived carrying OpenAI's exact ChatGPT-User
// string and asked for /.env.sample and /.git/HEAD. They came from
// 104.23.175.224 and 162.159.98.239 — Cloudflare — while all 204 prefixes
// OpenAI publishes for that agent are Azure. The alerts reported both as
// "OpenAI · ChatGPT live fetch".
//
// That is not only a security blind spot. It is an AEO one. The crawler feed
// exists to show whether answer engines are actually reading this site
// (AEO_PLAYBOOK §1); a forger inflates the single number the feed is for.
//
// ── The one rule ─────────────────────────────────────────────────────────────
//
// "forged" is an accusation, and it is only ever made from a list that actually
// loaded and actually parsed. A network failure, a soft-404 that returns HTML
// with a 200, an empty prefix array, a vendor that publishes nothing, a missing
// or unparseable IP — every one of those returns "unverified", never "forged".
//
// The asymmetry is deliberate. A wrong "verified" costs one missed scanner. A
// wrong "forged" teaches him to distrust the alerts, which costs the feature.
// docs.claude.com/claudebot.json is exactly this trap: it answers 200 with an
// HTML page, so a parser that shrugged at non-JSON would brand every genuine
// Claude fetch a forgery.

/** What we are willing to say about a crawler's claimed identity. */
export type Verdict = "verified" | "forged" | "unverified";

export interface VerifyResult {
  verdict: Verdict;
  /** The vendor whose list was consulted — for the alert line. */
  vendor: string | null;
  /** Why, in a few words, ready to print. */
  detail: string;
}

interface Vendor {
  name: string;
  /** Every list that can legitimately contain this vendor's fetchers. The union
   *  is what counts: we are answering "is this Google at all", not "is this
   *  specifically Googlebot rather than Google-InspectionTool". */
  lists: string[];
}

// Only vendors that publish a machine-readable list of the IPs their crawlers
// use. Anything absent here is unverifiable by design and says so.
//
// ⚠ Anthropic publishes no such list as of 2026-09-01 — claudebot.json,
// claude-user.json and ips.json are all 404 on anthropic.com, and the
// docs.claude.com path is an HTML soft-404. So Claude-User, Claude-SearchBot
// and ClaudeBot always come back "unverified". That is honest, not a gap to
// paper over: without a published range there is no way to tell a real Claude
// fetch from a forged one, and guessing would be worse than admitting it. If
// Anthropic ever publishes one, adding it here is a three-line change.
const VENDORS: [RegExp, Vendor][] = [
  [
    /chatgpt-user|oai-searchbot|gptbot/i,
    {
      name: "OpenAI",
      lists: [
        "https://openai.com/gptbot.json",
        "https://openai.com/searchbot.json",
        "https://openai.com/chatgpt-user.json",
      ],
    },
  ],
  [
    /googlebot|google-inspectiontool|googleother|google-extended/i,
    {
      name: "Google",
      lists: [
        "https://developers.google.com/search/apis/ipranges/googlebot.json",
        "https://developers.google.com/search/apis/ipranges/special-crawlers.json",
        "https://developers.google.com/search/apis/ipranges/user-triggered-fetchers.json",
      ],
    },
  ],
  [
    /bingbot|bingpreview|microsoftpreview/i,
    { name: "Microsoft", lists: ["https://www.bing.com/toolbox/bingbot.json"] },
  ],
  [
    /perplexity/i,
    {
      name: "Perplexity",
      lists: [
        "https://www.perplexity.com/perplexitybot.json",
        "https://www.perplexity.com/perplexity-user.json",
      ],
    },
  ],
];

/** The vendor this UA claims to belong to, if it claims one we can check. */
function claimedVendor(ua: string): Vendor | null {
  for (const [re, v] of VENDORS) if (re.test(ua)) return v;
  return null;
}

// ── CIDR matching ────────────────────────────────────────────────────────────
//
// Both families have to work. Vercel hands us v6 for a growing share of clients
// and every list above publishes ipv6Prefix entries, so v4-only matching would
// quietly downgrade real crawlers to "forged" — precisely the failure this file
// exists to prevent.
//
// An address is held as 16-bit groups rather than one integer: v6 needs 128
// bits, JavaScript numbers carry 53, and the project targets ES2017, where
// BigInt literals are not available. Groups need neither, and comparing a
// prefix is a short masked walk along the array.

interface Addr {
  groups: number[];
  /** 32 or 128 — a v4 address must never match a v6 prefix by accident. */
  width: number;
}

interface Prefix extends Addr {
  bits: number;
}

function parseV4(ip: string): number[] | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  const b: number[] = [];
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const n = Number(p);
    if (n > 255) return null;
    b.push(n);
  }
  return [(b[0] << 8) | b[1], (b[2] << 8) | b[3]];
}

function parseV6(ip: string): number[] | null {
  // An IPv4-mapped tail (::ffff:1.2.3.4) is still a v6 literal. Fold the tail
  // into two hex groups first so the logic around "::" stays uniform.
  let s = ip;
  const tail = s.match(/(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (tail) {
    const v4 = parseV4(tail[1]);
    if (!v4) return null;
    s = `${s.slice(0, -tail[1].length)}${v4[0].toString(16)}:${v4[1].toString(16)}`;
  }

  const halves = s.split("::");
  if (halves.length > 2) return null;

  const head = halves[0] ? halves[0].split(":") : [];
  const rear = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  // Without "::" every one of the eight groups must be written out.
  if (halves.length === 1 && head.length !== 8) return null;
  if (head.length + rear.length > 8) return null;

  const text = [
    ...head,
    ...(Array(8 - head.length - rear.length).fill("0") as string[]),
    ...rear,
  ];

  const groups: number[] = [];
  for (const g of text) {
    if (!/^[0-9a-f]{1,4}$/i.test(g)) return null;
    groups.push(parseInt(g, 16));
  }
  return groups;
}

function parseIp(ip: string): Addr | null {
  const s = ip.trim().replace(/^\[|\]$/g, "");
  if (!s) return null;
  if (s.includes(":")) {
    const groups = parseV6(s);
    return groups ? { groups, width: 128 } : null;
  }
  const groups = parseV4(s);
  return groups ? { groups, width: 32 } : null;
}

function parsePrefix(cidr: string, width: number): Prefix | null {
  const [addr, len] = cidr.split("/");
  if (!addr || len === undefined || !/^\d{1,3}$/.test(len)) return null;
  const bits = Number(len);
  if (bits > width) return null;
  const parsed = parseIp(addr);
  if (!parsed || parsed.width !== width) return null;
  return { groups: parsed.groups, width, bits };
}

function contains(p: Prefix, ip: Addr): boolean {
  // 32-bit values sit at the bottom of the 128-bit space, so without this a v4
  // address could fall inside a wide v6 prefix.
  if (p.width !== ip.width) return false;

  let left = p.bits;
  for (let i = 0; i < p.groups.length && left > 0; i++) {
    const take = left >= 16 ? 16 : left;
    // Masking as we go means a prefix whose host bits are not zeroed still
    // matches, so the lists do not have to be perfectly normalised.
    const mask = take === 16 ? 0xffff : (0xffff << (16 - take)) & 0xffff;
    if ((ip.groups[i] & mask) !== (p.groups[i] & mask)) return false;
    left -= take;
  }
  return true;
}

// ── Fetching the lists ───────────────────────────────────────────────────────

const TTL_OK = 12 * 60 * 60 * 1000;
// A failure is cached too, briefly, so an outage at OpenAI cannot turn every
// crawler alert into three outbound requests that are going to fail anyway.
const TTL_FAIL = 10 * 60 * 1000;

const cache = new Map<string, { at: number; prefixes: Prefix[] | null }>();

/**
 * One published list, parsed into prefixes. `null` means "could not be trusted"
 * — the distinction from an empty array matters, because empty would otherwise
 * read as "this vendor owns no IPs" and convict everybody.
 */
async function loadList(url: string): Promise<Prefix[] | null> {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < (hit.prefixes ? TTL_OK : TTL_FAIL)) {
    return hit.prefixes;
  }

  let prefixes: Prefix[] | null = null;
  try {
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(3_000),
    });
    if (res.ok) {
      // Guard the soft-404: a 200 carrying HTML is not a list, and treating it
      // as one is how a real crawler gets branded a forgery.
      const body = await res.text();
      if (!/^\s*[<]/.test(body)) {
        const json = JSON.parse(body) as {
          prefixes?: { ipv4Prefix?: string; ipv6Prefix?: string }[];
        };
        if (Array.isArray(json.prefixes) && json.prefixes.length > 0) {
          const out: Prefix[] = [];
          for (const entry of json.prefixes) {
            const p = entry.ipv4Prefix
              ? parsePrefix(entry.ipv4Prefix, 32)
              : entry.ipv6Prefix
                ? parsePrefix(entry.ipv6Prefix, 128)
                : null;
            if (p) out.push(p);
          }
          if (out.length > 0) prefixes = out;
        }
      }
    }
  } catch {
    // Stays null. Unverifiable is a fine answer; a wrong accusation is not.
  }

  cache.set(url, { at: Date.now(), prefixes });
  return prefixes;
}

/**
 * Check a claimed identity against the vendor's own published ranges.
 *
 * Called from /api/crawl inside `after()`, never from proxy.ts — the proxy runs
 * on every request and must not grow a network dependency. Here the cost falls
 * on crawlers only, after the response has already gone out.
 */
export async function verifyCrawler(ua: string, ip: string): Promise<VerifyResult> {
  const vendor = claimedVendor(ua || "");
  if (!vendor) {
    return { verdict: "unverified", vendor: null, detail: "no published IP list to check against" };
  }

  const parsed = parseIp(ip || "");
  if (!parsed) {
    return { verdict: "unverified", vendor: vendor.name, detail: "no usable client IP" };
  }

  const lists = await Promise.all(vendor.lists.map(loadList));
  const usable = lists.filter((l): l is Prefix[] => l !== null);
  if (usable.length === 0) {
    return {
      verdict: "unverified",
      vendor: vendor.name,
      detail: `could not load ${vendor.name}'s published ranges`,
    };
  }

  for (const list of usable) {
    for (const p of list) {
      if (contains(p, parsed)) {
        return {
          verdict: "verified",
          vendor: vendor.name,
          detail: `IP is in ${vendor.name}'s published range`,
        };
      }
    }
  }

  // Only reachable with at least one list loaded and parsed.
  const partial = usable.length < vendor.lists.length ? " (of the lists that loaded)" : "";
  return {
    verdict: "forged",
    vendor: vendor.name,
    detail: `IP is in none of ${vendor.name}'s published ranges${partial}`,
  };
}
