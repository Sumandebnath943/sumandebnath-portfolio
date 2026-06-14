import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { FadeInUp, BentoGridContainer, BentoCard } from "@/components/ui/AnimatedBento";

export const metadata: Metadata = {
  title: "Fun Apps & Experiments · Suman Debnath",
  description:
    "A creative sandbox of generative art, interactive experiences, and fun applications.",
  alternates: { canonical: "/fun-apps" },
};

export default function FunAppsPage() {
  return (
    <MotionProvider>
      <Navigation />

      <main className="bg-[#f4f4f0] text-[#1a1a1a] min-h-screen selection:bg-[#1a1a1a] selection:text-white pb-32 overflow-hidden">
        {/* ── HERO ── */}
        <section className="pt-40 pb-16 md:pt-48 md:pb-24 px-6 md:px-10">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <FadeInUp delay={0}>
              <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#1a1a1a]/40 mb-6 font-semibold">
                Creative Sandbox
              </p>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1 className="font-manrope font-semibold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 text-[#1a1a1a]">
                Fun{" "}
                <span className="font-serif italic font-normal text-[#1a1a1a]/50">
                  apps
                </span>
                .
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="font-manrope text-base md:text-lg text-[#1a1a1a]/60 max-w-2xl leading-relaxed">
                A curated collection of interactive art, generative experiences, and purely creative explorations outside of traditional systems.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* ── BENTO GRID ── */}
        <section className="px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <BentoGridContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* BLOCK 1: Hovering Image (Spans 2 columns) */}
              <BentoCard className="md:col-span-2 rounded-[2.5rem] relative overflow-hidden border border-black/[0.04] shadow-sm group min-h-[300px] md:min-h-0 cursor-pointer">
                <Image
                  src="/soul-canvas.png"
                  alt="Soul Canvas Art"
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                />
              </BentoCard>

              {/* BLOCK 2: Title, Tagline & What it does */}
              <BentoCard className="bg-white rounded-[2.5rem] p-10 flex flex-col justify-center border border-black/[0.04] shadow-sm">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/70 bg-black/5 px-3 py-1.5 rounded-full font-bold">
                    Interactive Art
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/30 font-semibold">
                    2026
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-manrope font-semibold text-[#1a1a1a] mb-4">
                  Soul Canvas
                </h2>
                <p className="font-serif italic text-xl text-[#1a1a1a]/50 leading-snug mb-10">
                  A cinematic exploration of your psychological architecture.
                </p>

                <p className="font-bold text-[#1a1a1a] mb-4 text-sm uppercase tracking-wider">What it does</p>
                <ul className="space-y-4 text-sm text-[#1a1a1a]/60 font-manrope leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a1a1a]/30 mt-0.5">✦</span>
                    <span>Transforms your psychological profile into a living 3D particle sculpture.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a1a1a]/30 mt-0.5">✦</span>
                    <span>Matches you to 1 of 47 generative art forms based on poetic questions.</span>
                  </li>
                </ul>
              </BentoCard>

              {/* BLOCK 3: Interactive Launch Button */}
              <BentoCard className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-xl hover:bg-black transition-all duration-500 group relative overflow-hidden aspect-square md:aspect-auto">
                <a
                  href="https://soulcanvas.houseofnamus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label="Launch Soul Canvas"
                />
                
                {/* Top Right Arrow */}
                <div className="self-end w-14 h-14 bg-white/10 rounded-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.15] group-hover:bg-white/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <path d="M7 17l9.2-9.2M17 16.8V7H7.2" />
                  </svg>
                </div>

                {/* Bottom Left Text */}
                <div className="mt-auto pt-8">
                  <p className="font-manrope font-semibold text-white/50 text-xs uppercase tracking-widest mb-2">Live App</p>
                  <span className="font-manrope font-bold text-3xl md:text-4xl text-white block leading-[1.1]">
                    Launch<br />Experience
                  </span>
                </div>
              </BentoCard>

              {/* BLOCK 4: How it works */}
              <BentoCard className="bg-white rounded-[2.5rem] p-10 flex flex-col justify-center border border-black/[0.04] shadow-sm">
                <p className="font-bold text-[#1a1a1a] mb-6 text-sm uppercase tracking-wider">The Engine</p>
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-[#1a1a1a]/40 text-xs font-mono">01</span>
                    </div>
                    <p className="text-sm text-[#1a1a1a]/60 font-manrope leading-relaxed">
                      Real-time GPU-computed GLSL vertex shaders rendering up to 100,000 particles simultaneously at 60fps.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-[#1a1a1a]/40 text-xs font-mono">02</span>
                    </div>
                    <p className="text-sm text-[#1a1a1a]/60 font-manrope leading-relaxed">
                      100% private processing running entirely in your browser using Three.js and GSAP physics.
                    </p>
                  </div>
                </div>
              </BentoCard>

              {/* BLOCK 5: Dark 1:1 Image */}
              <BentoCard className="bg-[#050505] rounded-[2.5rem] relative overflow-hidden aspect-square border border-black/[0.04] shadow-sm group cursor-pointer">
                <Image
                  src="/soul-canvas-dark.jpg"
                  alt="Soul Canvas Dark Edition"
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
                />
              </BentoCard>

            </BentoGridContainer>
          </div>
        </section>
      </main>

      <Footer />
    </MotionProvider>
  );
}
