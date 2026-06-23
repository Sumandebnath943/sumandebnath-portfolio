import type { Metadata } from "next";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { FadeInUp, BentoGridContainer, BentoCard } from "@/components/ui/AnimatedBento";
import { SITE_URL } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Fun Apps & Experiments",
  description:
    "A creative sandbox of generative art, interactive experiences, and fun applications by Suman Debnath.",
  alternates: { canonical: "/fun-apps" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/fun-apps`,
    title: "Fun Apps & Experiments · Suman Debnath",
    description:
      "A creative sandbox of generative art, interactive experiences, and fun applications.",
    images: ["/og-image.png"],
  },
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

        {/* ── PROJECT 01 · SOUL CANVAS ── */}
        <section className="px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <FadeInUp>
              <div className="flex items-center gap-5 md:gap-8 mb-10">
                <span className="font-mono text-xs md:text-sm text-[#1a1a1a]/30 font-bold tracking-widest">01</span>
                <h2 className="font-manrope font-semibold text-xl md:text-2xl tracking-tight whitespace-nowrap text-[#1a1a1a]">Soul Canvas</h2>
                <span className="h-px flex-1 bg-black/10" />
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#1a1a1a]/40 font-semibold whitespace-nowrap hidden sm:block">Interactive Art</span>
              </div>
            </FadeInUp>
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
                <h3 className="text-3xl md:text-4xl font-manrope font-semibold text-[#1a1a1a] mb-4">
                  Soul Canvas
                </h3>
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

        {/* ── PROJECT 02 · THE DESIGN MUSEUM ── */}
        <section className="px-6 md:px-10 mt-24 md:mt-32">
          <div className="max-w-6xl mx-auto">
            <FadeInUp>
              <div className="flex items-center gap-5 md:gap-8 mb-10">
                <span className="font-mono text-xs md:text-sm text-[#1a1a1a]/30 font-bold tracking-widest">02</span>
                <h2 className="font-manrope font-semibold text-xl md:text-2xl tracking-tight text-[#1a1a1a]">The Design Museum <span className="font-serif italic font-normal text-base md:text-lg text-[#1a1a1a]/45">(Wife&rsquo;s Design Portfolio 😉)</span></h2>
                <span className="h-px flex-1 bg-black/10" />
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#1a1a1a]/40 font-semibold whitespace-nowrap hidden sm:block">Interactive Portfolio</span>
              </div>
            </FadeInUp>
            <BentoGridContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* BLOCK 1: Full-width 16:9 hero image */}
              <BentoCard className="md:col-span-3 rounded-[2.5rem] relative overflow-hidden border border-black/[0.04] shadow-sm group aspect-[1376/768] cursor-pointer">
                <Image
                  src="/shraddha-portfolio/museum-hero.png"
                  alt="The Design Museum — particle constellation transitioning into a walkable marble gallery"
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                />
              </BentoCard>

              {/* BLOCK 2: Title, Tagline & What it does */}
              <BentoCard className="bg-white rounded-[2.5rem] p-10 flex flex-col justify-center border border-black/[0.04] shadow-sm">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/70 bg-black/5 px-3 py-1.5 rounded-full font-bold">
                    Interactive Portfolio
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/30 font-semibold">
                    2026
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-manrope font-semibold text-[#1a1a1a] mb-4">
                  The Design Museum
                  <span className="block mt-2 font-serif italic font-normal text-base md:text-lg text-[#1a1a1a]/45">
                    (Wife&rsquo;s Design Portfolio 😉)
                  </span>
                </h3>
                <p className="font-serif italic text-xl text-[#1a1a1a]/50 leading-snug mb-10">
                  A walkable 3D portfolio museum for graphic designer Shraddha Sonel — hosted by an AI guide.
                </p>

                <p className="font-bold text-[#1a1a1a] mb-4 text-sm uppercase tracking-wider">What it does</p>
                <ul className="space-y-4 text-sm text-[#1a1a1a]/60 font-manrope leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a1a1a]/30 mt-0.5">✦</span>
                    <span>A cinematic particle constellation morphs through her face and art forms over a career timeline.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1a1a1a]/30 mt-0.5">✦</span>
                    <span>Step inside a first-person 3D gallery where an AI docent greets, guides, and chats with you.</span>
                  </li>
                </ul>
              </BentoCard>

              {/* BLOCK 3: Interactive Launch Button */}
              <BentoCard className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-xl hover:bg-black transition-all duration-500 group relative overflow-hidden aspect-square md:aspect-auto">
                <a
                  href="https://shraddhasonel.houseofnamus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label="Launch The Design Museum"
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
                    Enter<br />Museum
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
                      150,000 GPU particles (React Three Fiber · Three.js) form a living constellation that shatters into a walkable marble gallery.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-[#1a1a1a]/40 text-xs font-mono">02</span>
                    </div>
                    <p className="text-sm text-[#1a1a1a]/60 font-manrope leading-relaxed">
                      An AI guide avatar, powered by Groq (Llama 3.3), leads visitors through the wings and answers questions by voice.
                    </p>
                  </div>
                </div>
              </BentoCard>

              {/* FEATURE 1: AI Guide (dark accent) */}
              <BentoCard className="bg-[#1a1a1a] rounded-[2.5rem] p-8 flex flex-col shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4" />
                    <path d="M8 16h.01" />
                    <path d="M16 16h.01" />
                  </svg>
                </div>
                <h3 className="font-manrope font-semibold text-lg text-white mb-2">Talking AI Guide</h3>
                <p className="text-sm text-white/55 font-manrope leading-relaxed">
                  A virtual host greets you, leads the way, and chats about each piece in real time.
                </p>
              </BentoCard>

              {/* FEATURE 2: Walkable 3D (WASD) */}
              <BentoCard className="bg-white rounded-[2.5rem] p-8 flex flex-col border border-black/[0.04] shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 9 2 12 5 15" />
                    <polyline points="9 5 12 2 15 5" />
                    <polyline points="15 19 12 22 9 19" />
                    <polyline points="19 9 22 12 19 15" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                  </svg>
                </div>
                <h3 className="font-manrope font-semibold text-lg text-[#1a1a1a] mb-2">Walk It in 3D</h3>
                <p className="text-sm text-[#1a1a1a]/55 font-manrope leading-relaxed">
                  Roam the gallery in first person with WASD movement and mouse-look controls.
                </p>
              </BentoCard>

              {/* FEATURE 3: Spotlit exhibits */}
              <BentoCard className="bg-white rounded-[2.5rem] p-8 flex flex-col border border-black/[0.04] shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                  </svg>
                </div>
                <h3 className="font-manrope font-semibold text-lg text-[#1a1a1a] mb-2">Spotlit Exhibits</h3>
                <p className="text-sm text-[#1a1a1a]/55 font-manrope leading-relaxed">
                  Dynamic spotlights follow you and illuminate each design as you approach the walls.
                </p>
              </BentoCard>

              {/* FEATURE 4: Sit & reflect */}
              <BentoCard className="bg-white rounded-[2.5rem] p-8 flex flex-col border border-black/[0.04] shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v3H7v-3a2 2 0 0 0-4 0Z" />
                    <path d="M5 18v2" />
                    <path d="M19 18v2" />
                  </svg>
                </div>
                <h3 className="font-manrope font-semibold text-lg text-[#1a1a1a] mb-2">Sit &amp; Reflect</h3>
                <p className="text-sm text-[#1a1a1a]/55 font-manrope leading-relaxed">
                  Benches invite you to pause and take in the gallery at your own pace.
                </p>
              </BentoCard>

              {/* FEATURE 5: Download kiosk */}
              <BentoCard className="bg-white rounded-[2.5rem] p-8 flex flex-col border border-black/[0.04] shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <h3 className="font-manrope font-semibold text-lg text-[#1a1a1a] mb-2">Download Kiosk</h3>
                <p className="text-sm text-[#1a1a1a]/55 font-manrope leading-relaxed">
                  An in-museum kiosk to grab her résumé or full portfolio in a single tap.
                </p>
              </BentoCard>

              {/* FEATURE 6: Voice chat (dark accent) */}
              <BentoCard className="bg-[#1a1a1a] rounded-[2.5rem] p-8 flex flex-col shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
                <h3 className="font-manrope font-semibold text-lg text-white mb-2">Voice Conversations</h3>
                <p className="text-sm text-white/55 font-manrope leading-relaxed">
                  Speak to the guide and hear it reply — hands-free voice chat, right in the browser.
                </p>
              </BentoCard>

              {/* BLOCK 5: Constellation square image */}
              <BentoCard className="bg-[#050505] rounded-[2.5rem] relative overflow-hidden aspect-square border border-black/[0.04] shadow-sm group cursor-pointer">
                <Image
                  src="/shraddha-portfolio/museum-constellation.png"
                  alt="Particle constellation forming Shraddha Sonel's face among her art forms"
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
                />
              </BentoCard>

              {/* BLOCK 6: Gallery banner (pairs with the constellation square) */}
              <BentoCard className="md:col-span-2 rounded-[2.5rem] relative overflow-hidden border border-black/[0.04] shadow-sm group min-h-[260px] cursor-pointer">
                <Image
                  src="/shraddha-portfolio/museum-gallery.png"
                  alt="The walkable marble gallery hall with the AI guide avatar"
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
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
