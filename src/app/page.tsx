import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Code2,
  Users,
  Heart,
  Calendar,
  Trophy,
  Lightbulb,
  Globe,
  Quote,
  Zap,
  Target,
  GitBranch,
  Star,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ValueProposition />
      <ProgramsShowcase />
      <ImpactStats />
      <FeaturedEvents />
      <FeaturedProjects />
      <Testimonials />
      <CTASection />
    </>
  );
}

/* ============================================================
   HERO
============================================================ */
function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-radial-indigo pointer-events-none" />
      <div className="absolute top-20 -left-32 w-[500px] h-[500px] bg-[#6366F1]/20 rounded-full blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-[#22D3EE]/15 rounded-full blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "-6s" }} />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 px-4 py-1.5 text-xs font-semibold text-[#818CF8] animate-fade-up">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Now accepting applications for Spring 2026</span>
              <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" />
            </div>

            <h1 className="mt-8 font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[#F5F5F7] animate-fade-up delay-100">
              Where curious minds{" "}
              <span className="gradient-text">rise into creators.</span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-xl animate-fade-up delay-200">
              We help students evolve from learners into builders through real-world programs, hands-on competitions, and a global community of mentors.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up delay-300">
              <Link href="/events" className="btn-primary text-sm">
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/donate" className="btn-amber text-sm">
                <Heart className="h-4 w-4" fill="currentColor" />
                Support Us
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-14 grid grid-cols-3 gap-8 max-w-md animate-fade-up delay-400">
              {[
                { value: "2,400+", label: "Students" },
                { value: "48", label: "Countries" },
                { value: "120+", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-3xl sm:text-4xl text-[#F5F5F7] glow-indigo animate-pulse-glow">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative h-[480px] sm:h-[560px] hidden lg:flex animate-fade-up delay-200">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HERO VISUAL
============================================================ */
function HeroVisual() {
  return (
    <div className="relative w-full h-full">
      {/* Glowing card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[340px]">
          {/* Layered cards */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/30 via-[#1a1740] to-[#13131A] rounded-[2rem] rotate-6 shadow-2xl shadow-indigo-900/30 border border-[#6366F1]/10" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/20 via-[#13131A] to-[#13131A] rounded-[2rem] -rotate-2 shadow-2xl border border-[#22D3EE]/10" />

          {/* Code window */}
          <div className="relative bg-[#0A0A0F] rounded-[1.8rem] shadow-2xl border border-[#232330] overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-[#232330]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/70" />
              <span className="ml-3 text-[10px] font-mono text-[#6B7280]">techrise.js</span>
            </div>
            {/* Code */}
            <div className="p-6 font-mono text-xs space-y-1.5 text-[#9CA3AF]">
              <p><span className="text-[#F87171]">const</span> <span className="text-[#818CF8]">future</span> <span className="text-[#F87171]">=</span> <span className="text-[#F59E0B]">await</span> <span className="text-[#22D3EE]">TechRise</span>.<span className="text-[#34D399]">rise</span>()</p>
              <p className="pl-4"><span className="text-[#F87171]">.</span><span className="text-[#34D399]">learn</span>()</p>
              <p className="pl-4"><span className="text-[#F87171]">.</span><span className="text-[#34D399]">build</span>()</p>
              <p className="pl-4"><span className="text-[#F87171]">.</span><span className="text-[#34D399]">connect</span>()</p>
              <p className="pl-4"><span className="text-[#F87171]">.</span><span className="text-[#34D399]">launch</span>()</p>
              <p className="pt-3 text-[#34D399]">✓ Mission accomplished</p>
              <p className="text-[#6B7280] text-[10px] pt-2">— Inspired by 2,400+ students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute top-4 right-0 card-glow rounded-2xl px-4 py-3 shadow-xl animate-float">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#34D399] to-[#059669] flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">Winner</p>
            <p className="text-sm font-bold text-[#F5F5F7]">Buildathon 2025</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 card-glow rounded-2xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: "-2.5s" }}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center">
            <Users className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">Joined today</p>
            <p className="text-sm font-bold text-[#F5F5F7]">+247 learners</p>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 -right-4 card-glow rounded-2xl px-4 py-2.5 shadow-xl animate-float" style={{ animationDelay: "-4s" }}>
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-[#F59E0B]" fill="currentColor" />
          ))}
          <span className="ml-1.5 text-xs font-bold text-[#F5F5F7]">4.9</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SOCIAL PROOF
============================================================ */
function SocialProof() {
  return (
    <section className="border-y border-[#232330] bg-[#13131A]/60">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-10">
        <p className="text-center text-[10px] font-semibold tracking-[0.2em] text-[#6B7280] uppercase">
          Trusted by learners, partners, and communities worldwide
        </p>
        <div className="mt-7 flex items-center justify-center flex-wrap gap-x-14 gap-y-4 opacity-40">
          {["GitHub", "Vercel", "Stripe", "Neon", "Resend", "Linear"].map((name) => (
            <span key={name} className="font-display font-bold text-lg text-[#9CA3AF]">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VALUE PROPOSITION
============================================================ */
function ValueProposition() {
  const pillars = [
    {
      icon: Lightbulb,
      title: "Learn",
      desc: "Build real skills with structured programs, mentorship, and hands-on workshops designed for every level.",
      color: "from-[#6366F1] to-[#818CF8]",
      glow: "shadow-indigo-500/20",
    },
    {
      icon: Code2,
      title: "Build",
      desc: "Contribute to real-world projects and showcase work that solves problems that matter in your community.",
      color: "from-[#22D3EE] to-[#06B6D4]",
      glow: "shadow-cyan-500/20",
    },
    {
      icon: Globe,
      title: "Connect",
      desc: "Collaborate globally with learners, mentors, and partners across 48 countries — your network is your net worth.",
      color: "from-[#34D399] to-[#10B981]",
      glow: "shadow-emerald-500/20",
    },
    {
      icon: Heart,
      title: "Support",
      desc: "Donate or sponsor to keep the mission running and remove financial barriers for the next generation.",
      color: "from-[#F59E0B] to-[#F97316]",
      glow: "shadow-amber-500/20",
    },
  ];

  return (
    <section className="section-pad bg-[#0A0A0F]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full badge-indigo text-xs">
            <Zap className="h-3 w-3" />
            What we stand for
          </div>
          <h2 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
            One mission.{" "}
            <span className="gradient-text">Four pillars.</span>
          </h2>
          <p className="mt-4 text-lg text-[#9CA3AF]">
            TechRise is more than a community. It's an ecosystem designed to turn curiosity into capability.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="card-glow group p-6 hover:border-[#6366F1]/40"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} shadow-lg ${p.glow} mb-5`}>
                <p.icon className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F5F5F7] mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROGRAMS SHOWCASE
============================================================ */
function ProgramsShowcase() {
  return (
    <section className="section-pad bg-[#13131A]">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full badge-indigo text-xs">
              <Rocket className="h-3 w-3" />
              Our Programs
            </div>
            <h2 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
              From first line of code to launching your startup.
            </h2>
            <p className="mt-5 text-lg text-[#9CA3AF] leading-relaxed">
              Whether you're just getting started or already shipping, our programs meet you where you are and push you further.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { title: "Beginner Tracks", desc: "HTML, CSS, JavaScript fundamentals with built-in peer review" },
                { title: "Buildathons", desc: "48-hour sprints to ship a project from idea to demo" },
                { title: "Open Source Sprints", desc: "Contribute to real projects used by real people" },
                { title: "Founder Track", desc: "1-on-1 mentorship and resources to launch your own venture" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 group">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center group-hover:bg-[#6366F1]/20 transition">
                    <Target className="h-4 w-4 text-[#818CF8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#F5F5F7]">{item.title}</p>
                    <p className="text-sm text-[#9CA3AF] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/events"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#818CF8] hover:text-[#6366F1] group/link transition"
            >
              See all upcoming programs
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>

          {/* Right visual */}
          <div className="relative h-[500px]">
            {/* Layered card stack */}
            <div className="absolute top-0 right-0 w-72 sm:w-80 aspect-[3/4] rotate-3 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] shadow-2xl shadow-indigo-900/30" />
            <div className="absolute top-6 right-6 w-72 sm:w-80 aspect-[3/4] -rotate-2 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] shadow-2xl shadow-cyan-900/20" />
            <div className="absolute top-12 right-12 w-72 sm:w-80 aspect-[3/4] bg-[#13131A] rounded-2xl shadow-2xl border border-[#232330] p-6 flex flex-col">
              {/* Window dots */}
              <div className="flex items-center gap-1.5 mb-5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/60" />
              </div>
              {/* Event card */}
              <div className="rounded-xl bg-[#0A0A0F] border border-[#232330] p-4 mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Upcoming</p>
                <p className="font-display font-bold text-lg text-[#F5F5F7] mt-1 leading-tight">Spring Buildathon 2026</p>
                <p className="text-xs text-[#9CA3AF] mt-1">March 15-17 · Online</p>
              </div>
              {/* Progress */}
              <div className="rounded-xl bg-gradient-to-br from-[#6366F1]/10 to-[#22D3EE]/10 border border-[#6366F1]/20 p-4 mb-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#818CF8]">Registered</p>
                  <p className="text-xs font-bold text-[#F5F5F7]">847 / 1,000</p>
                </div>
                <div className="mt-2 h-1.5 bg-[#0A0A0F] rounded-full overflow-hidden">
                  <div className="h-full w-[84.7%] bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full" />
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { value: "$25K", label: "Prizes" },
                  { value: "48h", label: "Duration" },
                  { value: "12", label: "Tracks" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-[#0A0A0F] border border-[#232330] p-2">
                    <p className="font-display font-bold text-sm text-[#F5F5F7]">{s.value}</p>
                    <p className="text-[10px] text-[#6B7280]">{s.label}</p>
                  </div>
                ))}
              </div>
              <button className="mt-auto pt-4 w-full rounded-full bg-[#6366F1] text-white text-sm font-semibold py-2.5 hover:bg-[#818CF8] transition">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   IMPACT STATS
============================================================ */
function ImpactStats() {
  return (
    <section className="relative section-pad bg-[#0A0A0F] overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#6366F1]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#22D3EE]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
            Impact that <span className="gradient-text">scales.</span>
          </h2>
          <p className="mt-4 text-lg text-[#9CA3AF]">
            Real numbers from real people — verified through program completion data.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "2,400+", label: "Active Learners", icon: Users },
            { value: "120+", label: "Shipped Projects", icon: GitBranch },
            { value: "48", label: "Countries Reached", icon: Globe },
            { value: "$180K", label: "Donated & Distributed", icon: Heart },
          ].map((s) => (
            <div
              key={s.label}
              className="card-glow rounded-2xl p-6 text-center hover:border-[#6366F1]/30 transition"
            >
              <s.icon className="h-7 w-7 text-[#818CF8] mx-auto mb-4" />
              <p className="font-display font-bold text-3xl sm:text-4xl text-[#F5F5F7] tracking-tight glow-indigo animate-pulse-glow">
                {s.value}
              </p>
              <p className="text-sm text-[#9CA3AF] mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURED EVENTS
============================================================ */
function FeaturedEvents() {
  const events = [
    {
      title: "Spring Buildathon 2026",
      type: "Buildathon",
      date: "Mar 15 — 17, 2026",
      location: "Online · Global",
      status: "Registration Open",
      tag: "EVENT",
      color: "from-[#6366F1] to-[#818CF8]",
    },
    {
      title: "AI for Good Challenge",
      type: "Competition",
      date: "Apr 5 — Jun 1, 2026",
      location: "Hybrid · 12 cities",
      status: "Coming Soon",
      tag: "COMPETITION",
      color: "from-[#22D3EE] to-[#06B6D4]",
    },
    {
      title: "Full-Stack in 6 Weeks",
      type: "Program",
      date: "Rolling Admissions",
      location: "Online · Self-paced",
      status: "Enrolling Now",
      tag: "PROGRAM",
      color: "from-[#34D399] to-[#10B981]",
    },
  ];

  return (
    <section className="section-pad bg-[#13131A]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full badge-indigo text-xs">
              <Calendar className="h-3 w-3" />
              Featured Programs
            </div>
            <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
              What's happening now
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#818CF8] hover:text-[#6366F1] group/link transition"
          >
            View all events
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {events.map((e) => (
            <Link
              key={e.title}
              href="/events"
              className="card-glow group overflow-hidden"
            >
              {/* Header */}
              <div className={`relative h-44 bg-gradient-to-br ${e.color} p-5 overflow-hidden`}>
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative h-full flex flex-col justify-between">
                  <span className="self-start text-[10px] font-bold tracking-widest text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {e.tag}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white/80">{e.type}</p>
                    <p className="font-display font-bold text-xl text-white mt-0.5 leading-tight">
                      {e.title}
                    </p>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                  <Calendar className="h-4 w-4 text-[#6B7280]" />
                  <span>{e.date}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#9CA3AF]">
                  <Globe className="h-4 w-4 text-[#6B7280]" />
                  <span>{e.location}</span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#34D399]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    {e.status}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#6B7280] group-hover:text-[#818CF8] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURED PROJECTS
============================================================ */
function FeaturedProjects() {
  const projects = [
    {
      title: "AquaSense",
      tag: "AI · Sustainability",
      desc: "Low-cost water quality monitoring using edge ML on a $5 microcontroller.",
      contributors: ["Aarav M.", "Priya S.", "Daniel O."],
      color: "from-[#22D3EE] to-[#0891B2]",
    },
    {
      title: "VerbaLearn",
      tag: "EdTech",
      desc: "Voice-first literacy app for first-graders in low-bandwidth regions.",
      contributors: ["Sofia G.", "Marcus L."],
      color: "from-[#818CF8] to-[#6366F1]",
    },
    {
      title: "GridShare",
      tag: "Energy · Open Source",
      desc: "Peer-to-peer solar energy trading platform deployed in 3 villages.",
      contributors: ["Aarav M.", "Lina K.", "Yusuf A.", "Sara P."],
      color: "from-[#F59E0B] to-[#D97706]",
    },
  ];

  return (
    <section className="section-pad bg-[#0A0A0F]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full badge-amber text-xs">
              <Code2 className="h-3 w-3" />
              Community Showcase
            </div>
            <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
              Built by the community.
            </h2>
            <p className="mt-3 text-[#9CA3AF] max-w-xl">
              Real projects, shipped by students — solving problems that matter in their communities.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#818CF8] hover:text-[#6366F1] group/link transition"
          >
            See all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.title} className="card-glow group overflow-hidden">
              <div className={`relative h-40 bg-gradient-to-br ${p.color} overflow-hidden`}>
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 className="h-14 w-14 text-white/25 group-hover:scale-110 group-hover:rotate-3 transition-transform" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#818CF8]">
                  {p.tag}
                </p>
                <h3 className="mt-1 font-display font-bold text-2xl text-[#F5F5F7]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-5 pt-5 border-t border-[#232330] flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {p.contributors.slice(0, 3).map((c, i) => {
                      const gradients = ["from-rose-400 to-pink-500", "from-emerald-400 to-teal-500", "from-amber-400 to-orange-500"];
                      return (
                        <span key={i} className={`inline-block h-7 w-7 rounded-full bg-gradient-to-br ${gradients[i % 3]} border-2 border-[#13131A] text-white text-xs font-bold flex items-center justify-center`}>
                          {c[0]}
                        </span>
                      );
                    })}
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#6B7280] group-hover:text-[#818CF8] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
============================================================ */
function Testimonials() {
  const quotes = [
    {
      quote: "TechRise turned a curious kid with a laptop into a builder shipping tools used by thousands. I owe so much to this community.",
      name: "Aarav Mehta",
      role: "Software Engineer · Alumnus '24",
      color: "from-[#6366F1] to-[#818CF8]",
    },
    {
      quote: "As a mentor, the most rewarding part is seeing that 'aha' moment when a student connects the dots and ships their first real project.",
      name: "Priya Sharma",
      role: "Senior Engineer · Mentor",
      color: "from-[#22D3EE] to-[#06B6D4]",
    },
    {
      quote: "We sponsored TechRise's programs last year and got back something money can't buy: a pipeline of incredible, motivated junior engineers.",
      name: "Daniel Okafor",
      role: "CTO · Sponsor Partner",
      color: "from-[#34D399] to-[#10B981]",
    },
  ];

  return (
    <section className="section-pad bg-[#13131A]">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full badge-muted text-xs text-[#9CA3AF]">
            <Quote className="h-3 w-3" />
            Voices from the community
          </div>
          <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
            Stories from people we've grown with.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <div key={q.name} className="card-glow p-7">
              <Quote className="h-7 w-7 text-[#6366F1]/40 mb-5" fill="currentColor" />
              <p className="text-[#9CA3AF] leading-relaxed font-medium text-[15px]">
                "{q.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-[#232330]">
                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${q.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {q.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-[#F5F5F7] text-sm">{q.name}</p>
                  <p className="text-xs text-[#6B7280]">{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
============================================================ */
function CTASection() {
  return (
    <section className="relative section-pad bg-[#0A0A0F] overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#6366F1]/25 rounded-full blur-[150px] animate-blob pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] bg-[#F59E0B]/15 rounded-full blur-[150px] animate-blob pointer-events-none" style={{ animationDelay: "-9s" }} />

      <div className="relative mx-auto max-w-4xl px-6 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#6366F1]/20 bg-gradient-to-br from-[#13131A] via-[#1a1740] to-[#13131A] px-10 sm:px-14 py-16 sm:py-20">
          <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full badge-indigo text-xs">
                <Rocket className="h-3 w-3" />
                Your journey starts here
              </div>
              <h2 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
                Ready to rise?
              </h2>
              <p className="mt-4 text-lg text-[#9CA3AF] max-w-md">
                Join 2,400+ learners building real skills, real projects, and real futures. No prior experience needed — just curiosity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link href="/signup" className="btn-primary justify-center text-sm py-4">
                Create free account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/donate" className="btn-amber justify-center text-sm py-4">
                <Heart className="h-4 w-4" fill="currentColor" />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
