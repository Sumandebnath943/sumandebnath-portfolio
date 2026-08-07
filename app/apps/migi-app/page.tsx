import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MotionProvider from "@/components/providers/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import {
  Reveal,
  FadeIn,
  MigiFlowField,
  PhoneMockup,
  DualMockupDisplay,
  TripleMockupGrid,
  AgentCoverflow,
  SecurityArchitecture,
} from "@/components/migi-app/MigiAppVisuals";

/* ── SEO ───────────────────────────────────────────────────────────────── */
const SITE = "https://sumandebnath.houseofnamus.com";
export const metadata: Metadata = {
  title: "MIGI Companion App — Native Control for AI Agents",
  description:
    "A private, hardware-gated native Android wrapper for the MIGI Agent Control Dashboard. Featuring biometric security, session continuity, and immersive edge-to-edge UI.",
  keywords: [
    "MIGI App", "AI agents companion app", "Android WebView", "Biometric authentication",
    "Suman Debnath", "Agent control dashboard", "Native Android",
  ],
  alternates: { canonical: "/apps/migi-app" },
  openGraph: {
    type: "website",
    title: "MIGI Companion App — Native Control for AI Agents",
    description: "Hardware-gated native Android control layer for the MIGI AI Agent fleet.",
    url: `${SITE}/apps/migi-app`,
    images: [{ url: "/migi-app/images/dashboard.jpg", width: 1080, height: 2400 }],
  },
};

/* ── Gradient Helpers ───────────────────────────────────────────────────── */
const gWhite = { background: "linear-gradient(180deg,#ffffff 0%,rgba(255,255,255,0.5) 100%)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };
const gLime = { background: "linear-gradient(135deg,#E2F97D 0%,#C6F24E 50%,#9ECB22 100%)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const };

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-dmmono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[#C6F24E]/50">
      <span className="h-px w-6 bg-gradient-to-r from-[#C6F24E]/70 to-transparent" />
      {children}
    </span>
  );
}

export default function MigiAppPage() {
  return (
    <MotionProvider>
      <Navigation />

      <style dangerouslySetInnerHTML={{ __html: `
        .fa-grain::before{content:'';position:absolute;inset:0;opacity:0.03;pointer-events:none;z-index:1;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:256px 256px;}
        .fa-card{transition:transform .4s cubic-bezier(.22,1,.36,1),border-color .4s, box-shadow .4s;}
        .fa-card:hover{transform:translateY(-5px);border-color:rgba(198, 242, 78, 0.22);box-shadow:0 30px 70px -30px rgba(198, 242, 78, 0.15);}
      `}} />

      <main className="relative fa-grain" style={{ background: "#080A0F" }}>

        {/* ════════════════════════ HERO ════════════════════════════ */}
        <section className="relative overflow-hidden" style={{ background: "radial-gradient(125% 75% at 50% -5%, #18220A 0%, #0F1607 35%, #0A0D14 70%, #080A0F 100%)" }}>
          <MigiFlowField tone="lime" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-36 text-center">
            
            <Reveal><Kicker>Private Companion App · Suman Debnath</Kicker></Reveal>

            <Reveal delay={0.06}>
              <h1 className="font-manrope font-extrabold text-[2.7rem] sm:text-[3.7rem] md:text-[4.7rem] leading-[1.0] tracking-[-0.045em] mt-6 mb-6">
                <span style={gWhite}>Agent control,</span><br/>
                <span className="font-serif italic font-normal" style={gLime}>in your pocket.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-manrope text-[1.02rem] md:text-[1.15rem] text-white/45 leading-relaxed max-w-2xl mx-auto mb-8">
                A custom native Android wrapper designed to extend the MIGI Agent Dashboard into a secure, instant-access mobile app experience. 
                <span className="text-white/65"> Hardware gated. Session persistent. Edge-to-edge.</span>
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex flex-col items-center gap-3.5 mt-8">
                <div className="group relative inline-flex items-center gap-3 rounded-full border border-[#C6F24E]/20 bg-[#C6F24E]/[0.05] px-6 py-2">
                  <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C6F24E] opacity-75"></span><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C6F24E]"></span></span>
                  <span className="font-dmmono text-[11px] uppercase tracking-widest text-[#C6F24E]">Private Operations App</span>
                </div>
                <span className="font-manrope text-[11px] tracking-wide text-white/30 max-w-xs text-center leading-relaxed">
                  This application is heavily secured and tightly coupled to the private MIGI server. It is not publicly distributed.
                </span>
              </div>
              <div className="mt-8 flex justify-center">
                <Link href="/agents/migi" className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white transition-colors border-b border-white/10 hover:border-white/30 pb-0.5">
                   Learn about the MIGI Agent Fleet <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </Reveal>
            
          </div>

          <div className="relative z-10 w-full mt-16 md:mt-24 pb-20">
             <PhoneMockup src="/migi-app/images/dashboard.jpg" alt="MIGI Dashboard" float />
          </div>
        </section>

        {/* ════════════════ THE PROBLEM & SECURE ENTRY ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.05]" style={{ background: "linear-gradient(180deg,#080A0F,#0D1018 50%,#080A0F)" }}>
          <MigiFlowField tone="ink" />
          <div className="relative z-10 max-w-6xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Reveal><Kicker>Secure Entry & Session Continuity</Kicker></Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6 mb-5">
                    <span style={gWhite}>Escaping the</span>{" "}
                    <span className="font-serif italic font-normal text-white/50">browser.</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="font-manrope text-[15px] md:text-base text-white/45 leading-relaxed mb-8">
                    Managing autonomous AI agents from a mobile browser meant opening tabs, typing passphrases, and supplying 2FA codes repeatedly. Standard browsers also lacked hardware gating, leaving live operations vulnerable if the device was unlocked and handed to someone else.
                  </p>
                </Reveal>
                
                <div className="space-y-6">
                  <FadeIn delay={0.15}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-10 h-10 shrink-0 rounded-xl bg-[#C6F24E]/10 flex items-center justify-center border border-[#C6F24E]/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6F24E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      </div>
                      <div>
                        <h4 className="font-manrope font-bold text-white/90">Hardware Biometric Lock</h4>
                        <p className="font-manrope text-sm text-white/40 mt-1">Requires fingerprint or face ID before rendering the app, completely locking out unauthorized physical access.</p>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.25}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </div>
                      <div>
                        <h4 className="font-manrope font-bold text-white/90">7-Day Session Persistence</h4>
                        <p className="font-manrope text-sm text-white/40 mt-1">Persists the server's HTTP-only JWT token directly in Android's native `CookieManager`. Log in once, stay authenticated securely.</p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                 <PhoneMockup src="/migi-app/images/loading.jpg" alt="Migi Secure Entry Loading" className="w-[280px] md:w-[320px]" />
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════ THE COMMAND CENTER ════════════════ */}
        <section className="relative py-24 md:py-32 pb-40 overflow-hidden border-t border-white/[0.05]" style={{ background: "radial-gradient(120% 90% at 50% 0%, #151A10 0%, #0A0C08 40%, #080A0F 100%)" }}>
          <MigiFlowField tone="lime" />
          <div className="relative z-10 w-full px-6">
            <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
              <Reveal><Kicker>Core Interface</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6">
                  <span style={gWhite}>The Command Center</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                 <p className="mt-6 font-manrope text-[15px] text-white/45 leading-relaxed max-w-2xl mx-auto">
                   An immersive, edge-to-edge UI that hides system bars using Android's `WindowInsetsControllerCompat`. Full visibility of your active sessions, agent metrics, and live fleet data without browser chrome getting in the way.
                 </p>
              </Reveal>
            </div>
            
            <TripleMockupGrid items={[
              { src: "/migi-app/images/dashboard.jpg", alt: "Main Dashboard", label: "Overview" },
              { src: "/migi-app/images/agents.jpg", alt: "Agent Fleet List", label: "Fleet Roster" },
              { src: "/migi-app/images/Active-session-control-section.jpg", alt: "Active Session Control", label: "Active Control" }
            ]} />
          </div>
        </section>

        {/* ════════════════ MAS & ECHO ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 pb-40 overflow-hidden border-t border-white/[0.05]" style={{ background: "linear-gradient(180deg,#080A0F,#0D1216 50%,#080A0F)" }}>
          <MigiFlowField tone="ink" />
          <div className="relative z-10 max-w-6xl mx-auto">
            
            {/* MAS */}
            <div className="mb-32">
              <div className="text-center mb-16">
                <Reveal><Kicker>The Orchestrator</Kicker></Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-4">
                    <span style={gWhite}>MIGI</span> <span className="font-serif italic font-normal pr-2" style={gLime}>MAS</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-4 font-manrope text-[15px] text-white/45 max-w-2xl mx-auto">
                    The multi-agent system on mobile. Give it a high-level goal, and watch as it dynamically provisions specialized agents, orchestrates tasks, and reports back in real-time.
                  </p>
                </Reveal>
              </div>
              <DualMockupDisplay 
                src1="/migi-app/images/MIGI-MAS-loading.jpg" alt1="MIGI MAS Loading" label1="Initializing System"
                src2="/migi-app/images/MIGI-MAS.jpg" alt2="MIGI MAS Active" label2="Live Orchestration"
              />
            </div>

            {/* ECHO */}
            <div>
              <div className="text-center mb-16">
                <Reveal><Kicker>The Knowledge Brain</Kicker></Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-4">
                    <span style={gWhite}>MIGI</span> <span className="font-serif italic font-normal text-white/50 pr-2">ECHO</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-4 font-manrope text-[15px] text-white/45 max-w-2xl mx-auto">
                    A conversational RAG interface directly connected to your second brain. Query documents, retrieve specific context, and talk directly to your personal knowledge base on the go.
                  </p>
                </Reveal>
              </div>
              <DualMockupDisplay 
                src1="/migi-app/images/MIGI-ECHO-loading.jpg" alt1="MIGI ECHO Loading" label1="Connecting Context"
                src2="/migi-app/images/MIGI-ECHO.jpg" alt2="MIGI ECHO Active" label2="Conversational Interface"
              />
            </div>

          </div>
        </section>

        {/* ════════════════ SPECIALIST FLEET (12 AGENTS) ════════════════ */}
        <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.05]" style={{ background: "radial-gradient(120% 90% at 50% 0%, #151A10 0%, #0A0C08 40%, #080A0F 100%)" }}>
          <MigiFlowField tone="lime" />
          <div className="relative z-10 w-full overflow-hidden">
            <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto px-6">
              <Reveal><Kicker>The Specialist Fleet</Kicker></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6">
                  <span style={gWhite}>40+ Agents.</span><br/>
                  <span className="font-serif italic font-normal" style={gLime}>Infinite leverage.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                 <p className="mt-6 font-manrope text-[15px] text-white/45 leading-relaxed mx-auto">
                   Every specialized agent is accessible from the mobile app. Whether it's managing finances, analyzing health metrics, tracking job applications, or scraping web data, the entire fleet is just a tap away.
                 </p>
              </Reveal>
            </div>
            
            <AgentCoverflow agents={[
              { src: "/migi-app/images/Finance-agent.jpg", alt: "Finance Agent", name: "Finance Agent" },
              { src: "/migi-app/images/Health-analysis-agent.jpg", alt: "Health Analysis Agent", name: "Health Analyst" },
              { src: "/migi-app/images/Jobs-agent.jpg", alt: "Jobs Agent", name: "Career Manager" },
              { src: "/migi-app/images/Jobs-agent-job-lists.jpg", alt: "Job Lists", name: "Job Tracking" },
              { src: "/migi-app/images/Data-tracking-agent.jpg", alt: "Data Tracking", name: "Data Tracker" },
              { src: "/migi-app/images/Outreach-agent.jpg", alt: "Outreach Agent", name: "Outreach Bot" },
              { src: "/migi-app/images/Build-suggestion-agent.jpg", alt: "Build Suggestion", name: "Build Analyst" },
              { src: "/migi-app/images/Skills-suggestions-agent.jpg", alt: "Skills Suggestions", name: "Skill Assessor" },
              { src: "/migi-app/images/Web-watch-alert-agent.jpg", alt: "Web Watch Alert", name: "Web Monitor" },
              { src: "/migi-app/images/team-manager-agent.jpg", alt: "Team Manager", name: "Team Manager" },
              { src: "/migi-app/images/Launch-agent.jpg", alt: "Launch Agent", name: "Launch Ops" },
              { src: "/migi-app/images/LLMs.jpg", alt: "Model Routing", name: "Model Router" }
            ]} />
          </div>
        </section>

        {/* ════════════════ SECURITY MODEL ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg,#C6F24E,#A5D129)" }}>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-14 md:mb-18">
              <Reveal>
                <span className="inline-flex items-center gap-2 font-dmmono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[#12131A]/60">
                  <span className="h-px w-6 bg-[#12131A]/30" />
                  Architecture & Security
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mt-6 text-[#12131A]">
                  Strict isolation, <span className="font-serif italic font-normal text-[#12131A]/70">by design.</span>
                </h2>
              </Reveal>
            </div>
            
            <Reveal delay={0.1}>
               <SecurityArchitecture />
            </Reveal>
          </div>
        </section>

        {/* ════════════════ FINAL CTA ════════════════ */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-white/[0.05]">
          <MigiFlowField tone="lime" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
             
            <Reveal>
              <div className="w-24 h-24 mx-auto mb-8 bg-[#12131A] rounded-3xl border border-[#C6F24E]/30 flex items-center justify-center shadow-[0_0_50px_rgba(198,242,78,0.15)] p-4 overflow-hidden relative">
                <Image src="/migi-app/images/migi-app-icon.png" alt="Migi Logo" fill className="object-cover" />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="font-manrope font-bold text-[2.1rem] md:text-[3.4rem] leading-[1.06] tracking-[-0.03em] mb-6">
                <span style={gWhite}>Part of the</span>{" "}<span className="font-serif italic font-normal" style={gLime}>MIGI Ecosystem</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-manrope text-[15px] md:text-base text-white/45 leading-relaxed max-w-2xl mx-auto mb-10">
                The companion app is just the access layer. The true power lies in the autonomous fleet of agents running in the cloud, forming a complete personal operating system.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
               <Link href="/agents/migi" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl px-8 py-4 text-sm font-semibold text-white/90 hover:bg-white/[0.08] hover:border-white/[0.2] transition-all group">
                 Explore the MIGI OS
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </Link>
            </Reveal>

          </div>
        </section>

      </main>

      <Contact variant="dark" />
      <Footer />
    </MotionProvider>
  );
}
