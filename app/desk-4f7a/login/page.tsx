import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Sign in" },
  robots: { index: false, follow: false, nocache: true },
};

// Never prerendered or cached — this page reads a query param and sits in front
// of personal data.
export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const { e } = await searchParams;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-[340px]">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white/35 uppercase mb-3">
          Restricted
        </p>
        <h1 className="font-manrope text-2xl tracking-tight mb-6">Sign in</h1>

        {/* One field, one message. A wrong password and an unknown one are the
            same failure, so there is nothing here to enumerate. */}
        <form action="/desk-4f7a/login/submit" method="post" className="space-y-3">
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            autoFocus
            required
            aria-label="Password"
            aria-invalid={e ? true : undefined}
            className="w-full rounded-lg border border-white/[0.12] bg-white/[0.03] px-4 py-3 font-manrope text-[15px] text-white placeholder-white/25 outline-none focus:border-white/35 transition-colors"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-white px-4 py-3 font-manrope text-[15px] font-medium text-black hover:bg-white/90 transition-colors"
          >
            Continue
          </button>
        </form>

        {e ? (
          <p role="alert" className="mt-4 font-manrope text-[13px] text-red-400/80">
            {e === "rate"
              ? "Too many attempts. Wait a few minutes and try again."
              : "That did not work."}
          </p>
        ) : null}
      </div>
    </main>
  );
}
