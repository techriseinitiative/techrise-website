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
    <section className="relative overflow-hidden bg-ink-50">
      {/* Background layers */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-hero-grid pointer-events-none" />
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "-6s" }} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-20 sm:pt-28 pb-20 sm:pb-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm animate-fade-up">
              <Sparkles className="h-3.5 w-3.5 text-accent-500" />
              <span>Now accepting applications for Spring 2026 programs</span>
              <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            </div>

            <h1 className="mt-7 font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] animate-fade-up delay-100">
              Where <span className="text-gradient">curious minds</span>
              <br className="hidden sm:block" /> rise into{" "}
              <span className="text-gradient">creators</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed max-w-xl animate-fade-up delay-200">
              We help students evolve from learners into builders through real-world programs, hands-on competitions, and a global community of mentors.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up delay-300">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ink-900/20 hover:shadow-ink-900/40 hover:bg-ink-800 transition-all hover:scale-[1.02] active:scale-95"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/donate"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink-900 border border-ink-200 hover:border-ink-300 hover:bg-ink-50 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
              >
                <Heart className="h-4 w-4 text-accent-500" fill="currentColor" />
                Support Us
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md animate-fade-up delay-400">
              {[
                { value: "2,400+", label: "Students" },
                { value: "48", label: "Countries" },
                { value: "120+", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-ink-900">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-ink-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative h-[500px] sm:h-[560px] lg:h-[620px] animate-fade-up delay-300">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HERO VISUAL — Floating card composition
============================================================ */
function HeroVisual() {
  return (
    <div className="relative w-full h-full">
      {/* Main glowing card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 sm:w-96 aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900 rounded-[2.5rem] shadow-2xl shadow-primary-900/40 rotate-6" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500 via-accent-600 to-primary-700 rounded-[2.5rem] shadow-2xl shadow-accent-500/30 -rotate-3 opacity-90" />

          {/* Code window on top */}
          <div className="absolute inset-4 bg-ink-950 rounded-[2rem] shadow-2xl overflow-hidden border border-ink-800/50">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-ink-800">
              <span className="h-2.5 w-2.5 rounded-full bg-error/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
              <span className="ml-3 text-[10px] font-mono text-ink-500">main.js</span>
            </div>
            {/* Code lines */}
            <div className="p-5 font-mono text-xs space-y-1.5 text-ink-300">
              <p><span className="text-pink-400">const</span> <span className="text-cyan-300">future</span> <span className="text-pink-400">=</span> <span className="text-amber-300">await</span> <span className="text-blue-300">TechRise</span>.<span className="text-emerald-300">rise</span>()</p>
              <p className="pl-3"><span className="text-pink-400">.</span><span className="text-emerald-300">learn</span>()</p>
              <p className="pl-3"><span className="text-pink-400">.</span><span className="text-emerald-300">build</span>()</p>
              <p className="pl-3"><span className="text-pink-400">.</span><span className="text-emerald-300">connect</span>()</p>
              <p className="pl-3"><span className="text-pink-400">.</span><span className="text-emerald-300">launch</span>()</p>
              <p className="pt-2 text-emerald-400">✓ Mission accomplished</p>
              <p className="text-ink-500 text-[10px] pt-2">— Inspired by 2,400+ students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge: top right */}
      <div className="absolute top-6 right-4 sm:right-0 glass rounded-2xl p-3 pr-5 shadow-xl animate-float">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-semibold text-ink-500">WINNER</p>
            <p className="text-sm font-bold text-ink-900">Buildathon 2025</p>
          </div>
        </div>
      </div>

      {/* Floating badge: bottom left */}
      <div className="absolute bottom-12 left-0 sm:-left-2 glass rounded-2xl p-3 pr-5 shadow-xl animate-float" style={{ animationDelay: "-2s" }}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
            <Users className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-semibold text-ink-500">JOINED TODAY</p>
            <p className="text-sm font-bold text-ink-900">+247 learners</p>
          </div>
        </div>
      </div>

      {/* Floating badge: middle right */}
      <div className="absolute top-1/2 -right-2 sm:right-4 glass rounded-2xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: "-4s" }}>
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-amber-400" fill="currentColor" />
          ))}
          <span className="ml-1.5 text-xs font-bold text-ink-900">4.9</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SOCIAL PROOF — Logo marquee
============================================================ */
function SocialProof() {
  return (
    <section className="relative py-12 border-y border-ink-200 bg-white/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p className="text-center text-xs font-semibold tracking-widest text-ink-500 uppercase">
          Trusted by learners, partners, and communities worldwide
        </p>
        <div className="mt-8 flex items-center justify-center flex-wrap gap-x-12 gap-y-4 opacity-60">
          {["GitHub", "Vercel", "Stripe", "Neon", "Resend", "Auth.js"].map((name) => (
            <span key={name} className="font-display font-bold text-lg sm:text-xl text-ink-700">
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
      color: "from-primary-500 to-primary-700",
      glow: "shadow-primary-500/30",
    },
    {
      icon: Code2,
      title: "Build",
      desc: "Contribute to real-world projects and showcase work that solves problems that matter to your community.",
      color: "from-accent-500 to-accent-700",
      glow: "shadow-accent-500/30",
    },
    {
      icon: Globe,
      title: "Connect",
      desc: "Collaborate globally with learners, mentors, and partners across 48 countries — your network is your net worth.",
      color: "from-emerald-500 to-emerald-700",
      glow: "shadow-emerald-500/30",
    },
    {
      icon: Heart,
      title: "Support",
      desc: "Donate or sponsor to keep the mission running and remove financial barriers for the next generation.",
      color: "from-rose-500 to-pink-600",
      glow: "shadow-rose-500/30",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-ink-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 text-primary-700 px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
            <Zap className="h-3 w-3" />
            What we stand for
          </div>
          <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight">
            One mission. <span className="text-gradient-blue">Four pillars.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            TechRise is more than a community. It's an ecosystem designed to turn curiosity into capability.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group relative card-shine bg-white rounded-2xl p-6 border border-ink-200 hover:border-ink-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} shadow-lg ${p.glow} mb-5`}>
                <p.icon className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-display font-bold text-xl text-ink-900 mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed">
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
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-100 text-accent-700 px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
              <Rocket className="h-3 w-3" />
              Our Programs
            </div>
            <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight">
              From first line of code to launching your startup.
            </h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">
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
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center group-hover:bg-primary-100 transition">
                    <Target className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink-900">{item.title}</p>
                    <p className="text-sm text-ink-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/events"
              className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800 group"
            >
              See all upcoming programs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Visual: stacked cards */}
          <div className="relative h-[520px]">
            <div className="absolute top-0 right-0 w-72 sm:w-80 aspect-[3/4] rotate-3 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-2xl shadow-primary-500/30" />
            <div className="absolute top-6 right-6 w-72 sm:w-80 aspect-[3/4] -rotate-2 rounded-3xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-2xl shadow-accent-500/30" />
            <div className="absolute top-12 right-12 w-72 sm:w-80 aspect-[3/4] bg-white rounded-3xl shadow-2xl border border-ink-200 p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <span className="h-2.5 w-2.5 rounded-full bg-error/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
              </div>
              <div className="rounded-xl bg-ink-50 p-4 border border-ink-200 mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-500">Upcoming</p>
                <p className="mt-1 font-display font-bold text-lg text-ink-900 leading-tight">
                  Spring Buildathon 2026
                </p>
                <p className="mt-1 text-xs text-ink-500">March 15-17 · Online</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-4 border border-primary-100 mb-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-primary-700">Registered</p>
                  <p className="text-xs font-bold text-ink-900">847 / 1000</p>
                </div>
                <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full w-[84.7%] bg-gradient-to-r from-primary-600 to-accent-500 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { value: "$25K", label: "Prizes" },
                  { value: "48h", label: "Duration" },
                  { value: "12", label: "Tracks" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-ink-50 p-2">
                    <p className="font-display font-bold text-sm text-ink-900">{s.value}</p>
                    <p className="text-[10px] text-ink-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-3">
                <button className="w-full rounded-full bg-ink-900 text-white text-sm font-semibold py-2.5">
                  Register Now
                </button>
              </div>
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
    <section className="relative py-20 sm:py-24 bg-aurora text-white overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-500/15 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
            Impact that <span className="text-gradient">scales</span>.
          </h2>
          <p className="mt-4 text-lg text-ink-300">
            Real numbers from real people — every metric is verified through program completion data.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "2,400+", label: "Active Learners", icon: Users },
            { value: "120+", label: "Shipped Projects", icon: GitBranch },
            { value: "48", label: "Countries Reached", icon: Globe },
            { value: "$180K", label: "Donated & Distributed", icon: Heart },
          ].map((s) => (
            <div
              key={s.label}
              className="glass-dark rounded-2xl p-6 hover:bg-white/10 transition group"
            >
              <s.icon className="h-6 w-6 text-accent-400 mb-3" />
              <p className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                {s.value}
              </p>
              <p className="text-sm text-ink-300 mt-1">{s.label}</p>
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
      type: "Buildathon",
      title: "Spring Buildathon 2026",
      date: "Mar 15 — 17, 2026",
      location: "Online · Global",
      status: "Registration Open",
      tag: "EVENT",
    },
    {
      type: "Competition",
      title: "AI for Good Challenge",
      date: "Apr 5 — Jun 1, 2026",
      location: "Hybrid · 12 cities",
      status: "Coming Soon",
      tag: "COMPETITION",
    },
    {
      type: "Workshop",
      title: "Full-Stack in 6 Weeks",
      date: "Rolling Admissions",
      location: "Online · Self-paced",
      status: "Enrolling Now",
      tag: "PROGRAM",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-ink-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 text-primary-700 px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
              <Calendar className="h-3 w-3" />
              Featured Programs
            </div>
            <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
              What's happening now
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800 group"
          >
            View all events
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {events.map((e, i) => (
            <Link
              key={e.title}
              href="/events"
              className="group relative overflow-hidden rounded-2xl bg-white border border-ink-200 hover:border-ink-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-44 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-5 overflow-hidden">
                <div className="absolute inset-0 bg-hero-grid opacity-30" />
                <div className="relative h-full flex flex-col justify-between">
                  <span className="self-start text-[10px] font-bold tracking-widest text-white/80 bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">
                    {e.tag}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white/80">{e.type}</p>
                    <p className="font-display font-bold text-xl text-white mt-0.5">
                      {e.title}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-ink-600">
                  <Calendar className="h-4 w-4" />
                  <span>{e.date}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-ink-600">
                  <Globe className="h-4 w-4" />
                  <span>{e.location}</span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    {e.status}
                  </span>
                  <ArrowRight className="h-4 w-4 text-ink-400 group-hover:text-ink-900 group-hover:translate-x-1 transition-all" />
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
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "VerbaLearn",
      tag: "EdTech",
      desc: "Voice-first literacy app for first-graders in low-bandwidth regions.",
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "GridShare",
      tag: "Energy · Open Source",
      desc: "Peer-to-peer solar energy trading platform deployed in 3 villages.",
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-100 text-accent-700 px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
              <Code2 className="h-3 w-3" />
              Community Showcase
            </div>
            <h2 className="mt-4 font-display font-bold text-4xl sm:text-5xl tracking-tight">
              Built by the community.
            </h2>
            <p className="mt-3 text-ink-600 max-w-xl">
              Real projects, shipped by real students — solving real problems in their communities.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800 group"
          >
            See all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group card-shine relative overflow-hidden rounded-2xl bg-ink-50 border border-ink-200 hover:border-ink-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`relative h-40 bg-gradient-to-br ${p.color} overflow-hidden`}>
                <div className="absolute inset-0 bg-hero-grid opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 className="h-12 w-12 text-white/30 group-hover:scale-110 group-hover:rotate-3 transition-transform" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-primary-700">
                  {p.tag}
                </p>
                <h3 className="mt-1 font-display font-bold text-xl text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {["from-rose-400 to-pink-500", "from-emerald-400 to-teal-500", "from-amber-400 to-orange-500"].map((g, i) => (
                      <span key={i} className={`inline-block h-7 w-7 rounded-full bg-gradient-to-br ${g} border-2 border-white`} />
                    ))}
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-400 group-hover:text-ink-900 group-hover:translate-x-1 transition-all" />
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
      color: "from-primary-500 to-primary-700",
    },
    {
      quote: "As a mentor, the most rewarding part is seeing that 'aha' moment when a student connects the dots and ships their first real project.",
      name: "Priya Sharma",
      role: "Senior Engineer · Mentor",
      color: "from-accent-500 to-accent-700",
    },
    {
      quote: "We sponsored TechRise's programs last year and got back something money can't buy: a pipeline of incredible, motivated junior engineers.",
      name: "Daniel Okafor",
      role: "CTO · Sponsor Partner",
      color: "from-emerald-500 to-emerald-700",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-ink-50 overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-100/40 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-200 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-ink-700">
            <Quote className="h-3 w-3" />
            Voices from the community
          </div>
          <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight">
            Stories from people we've grown with.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="group relative rounded-2xl bg-white p-7 border border-ink-200 hover:border-ink-300 hover:shadow-xl transition-all"
            >
              <Quote className="h-7 w-7 text-primary-200 mb-4" fill="currentColor" />
              <p className="text-ink-700 leading-relaxed font-medium">
                "{q.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-ink-100">
                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${q.color} flex items-center justify-center text-white font-bold`}>
                  {q.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-ink-900 text-sm">{q.name}</p>
                  <p className="text-xs text-ink-500">{q.role}</p>
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
    <section className="relative py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-aurora px-8 sm:px-14 py-16 sm:py-20">
          <div className="absolute inset-0 bg-hero-grid opacity-30" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-500/40 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: "-9s" }} />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
                <Rocket className="h-3 w-3" />
                Your journey starts here
              </div>
              <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight text-white">
                Ready to rise?
              </h2>
              <p className="mt-4 text-lg text-ink-200 max-w-md">
                Join 2,400+ learners building real skills, real projects, and real futures. No prior experience needed — just curiosity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink-900 font-bold px-7 py-4 shadow-2xl hover:scale-[1.02] active:scale-95 transition"
              >
                Create free account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/donate"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white font-bold px-7 py-4 hover:bg-white/15 transition"
              >
                <Heart className="h-4 w-4 text-accent-400" fill="currentColor" />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
