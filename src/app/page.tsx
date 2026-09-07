import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Calendar,
  Users,
  Globe,
  Code2,
  Sparkles,
  Target,
  Check,
  Trophy,
  Quote,
  ExternalLink,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [featuredEvents, featuredProjects, stats] = await Promise.all([
    prisma.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { startDate: "asc" },
      take: 3,
      include: { _count: { select: { registrations: true } } },
    }),
    prisma.project.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    Promise.all([
      prisma.user.count(),
      prisma.project.count({ where: { status: "APPROVED" } }),
      prisma.donation.aggregate({ where: { status: "SUCCEEDED" }, _sum: { amount: true } }),
    ]),
  ]);

  const [userCount, projectCount, donationAgg] = stats;
  const totalRaised = (donationAgg._sum.amount ?? 0) / 100;

  return (
    <>
      <Hero userCount={userCount} projectCount={projectCount} />
      <ValueProposition />
      <ProgramsShowcase />
      <ImpactStats userCount={userCount} projectCount={projectCount} totalRaised={totalRaised} />
      <FeaturedEvents events={featuredEvents} />
      <FeaturedProjects projects={featuredProjects} />
      <Testimonials />
      <CTASection />
    </>
  );
}

/* ============================================================
   HERO
============================================================ */
function Hero({ userCount, projectCount }: { userCount: number; projectCount: number }) {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0A0E14]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E]/5 via-transparent to-[#F57342]/5 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F57342]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4] animate-fade-up">
              <Sparkles className="h-4 w-4" />
              <span>Spring 2026 programs now open</span>
            </div>

            <h1 className="mt-8 font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[#F9FAFB] animate-fade-up delay-100">
              Join {userCount.toLocaleString()}+ learners <br />
              <span className="text-[#0F766E]">building real</span>{" "}
              <span className="gradient-text">skills.</span>
            </h1>

            <p className="mt-6 text-lg text-[#9CA3AF] leading-relaxed max-w-xl animate-fade-up delay-200">
              Hands-on programs, global competitions, and a community that believes in learning by doing. No prior experience needed — just curiosity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up delay-300">
              <Link href="/events" className="btn-primary text-base">
                Explore Programs
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/donate" className="btn-outline text-base">
                <Heart className="h-5 w-5" />
                Support Us
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 animate-fade-up delay-400">
              {[
                { value: userCount.toLocaleString() + "+", label: "Students" },
                { value: "48", label: "Countries" },
                { value: projectCount.toLocaleString() + "+", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-3xl text-[#F9FAFB]">{stat.value}</p>
                  <p className="text-sm text-[#9CA3AF] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative h-[400px] sm:h-[480px] hidden lg:flex animate-fade-up delay-200">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HERO VISUAL — Clean, minimal, distinctive
============================================================ */
function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main card */}
      <div className="relative w-[320px] rounded-2xl border border-[#374151] bg-[#111827] shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1F2937]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F57342]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#EAB308]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
          <span className="ml-3 text-xs font-mono text-[#6B7280]">techrise.dev</span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#0F766E]/20 flex items-center justify-center">
              <Code2 className="h-5 w-5 text-[#5ECAD4]" />
            </div>
            <div>
              <p className="font-display font-semibold text-[#F9FAFB]">Welcome back</p>
              <p className="text-xs text-[#6B7280]">Your learning journey continues</p>
            </div>
          </div>

          <div className="rounded-lg bg-[#0A0E14] p-4 border border-[#1F2937]">
            <p className="text-xs text-[#6B7280] mb-2">Progress this week</p>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-bold text-lg text-[#F9FAFB]">72%</span>
              <span className="text-xs text-[#22C55E]">+12%</span>
            </div>
            <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-white text-xs font-bold">
              Y
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <span key={i} className="h-8 w-8 rounded-full bg-[#1F2937] border-2 border-[#111827] flex items-center justify-center text-[10px] text-[#9CA3AF]">
                  {i}
                </span>
              ))}
            </div>
            <span className="text-xs text-[#6B7280]">+3 peers online</span>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-4 -right-4 rounded-xl bg-[#111827] border border-[#374151] px-4 py-3 shadow-lg animate-fade-up delay-200">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#22C55E]/20 flex items-center justify-center">
            <Check className="h-4 w-4 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#F9FAFB]">Verified</p>
            <p className="text-[10px] text-[#6B7280]">Certificate earned</p>
          </div>
        </div>
      </div>

      {/* Stats badge */}
      <div className="absolute -bottom-4 -left-4 rounded-xl bg-[#111827] border border-[#374151] px-4 py-3 shadow-lg animate-fade-up delay-300">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-[#5ECAD4]" />
          <div>
            <p className="font-display font-bold text-lg text-[#F9FAFB]">48</p>
            <p className="text-[10px] text-[#6B7280]">countries</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VALUE PROPOSITION
============================================================ */
function ValueProposition() {
  const pillars = [
    {
      icon: Target,
      title: "Learn",
      desc: "Build real skills with structured programs designed for every level.",
      color: "from-[#0F766E] to-[#14B8A6]",
    },
    {
      icon: Code2,
      title: "Build",
      desc: "Contribute to real-world projects that make a measurable impact.",
      color: "from-[#F57342] to-[#FB923C]",
    },
    {
      icon: Globe,
      title: "Connect",
      desc: "Collaborate globally with learners, mentors, and partners.",
      color: "from-[#14B8A6] to-[#5ECAD4]",
    },
    {
      icon: Heart,
      title: "Support",
      desc: "Join a community that invests in each other's growth.",
      color: "from-[#EAB308] to-[#F59E0B]",
    },
  ];

  return (
    <section className="section-pad bg-[#0A0E14]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4]">
            <Sparkles className="h-4 w-4" />
            Our Foundation
          </div>
          <h2 className="mt-6 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
            One mission. <span className="gradient-text">Four pillars.</span>
          </h2>
          <p className="mt-4 text-lg text-[#9CA3AF]">
            TechRise is more than a community — it&apos;s an ecosystem designed to turn curiosity into capability.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {pillars.map((p) => (
            <div key={p.title} className="card-interactive p-6">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} shadow-lg mb-5`}>
                <p.icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F9FAFB] mb-2">
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
  const programs = [
    { title: "Beginner Tracks", desc: "HTML, CSS, JavaScript fundamentals with built-in peer review", icon: Target },
    { title: "Buildathons", desc: "48-hour sprints to ship a project from idea to demo", icon: Code2 },
    { title: "Open Source Sprints", desc: "Contribute to real projects used by real people", icon: Globe },
    { title: "Founder Track", desc: "1-on-1 mentorship and resources to launch your venture", icon: Heart },
  ];

  return (
    <section className="section-pad bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#F57342]/15 border border-[#F57342]/25 px-4 py-2 text-sm font-semibold text-[#FB923C]">
              <Sparkles className="h-4 w-4" />
              Our Programs
            </div>
            <h2 className="mt-6 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
              From first line of code to launching your startup.
            </h2>
            <p className="mt-5 text-lg text-[#9CA3AF] leading-relaxed">
              Whether you&apos;re just getting started or already shipping, our programs meet you where you are and push you further.
            </p>

            <div className="mt-8 space-y-4 stagger">
              {programs.map((item) => (
                <div key={item.title} className="flex gap-4 group">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 flex items-center justify-center group-hover:bg-[#0F766E]/25 transition">
                    <item.icon className="h-5 w-5 text-[#5ECAD4]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#F9FAFB]">{item.title}</p>
                    <p className="text-sm text-[#9CA3AF] mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/events"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#5ECAD4] hover:text-[#14B8A6] transition"
            >
              See all upcoming programs
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right visual */}
          <div className="relative h-[400px] hidden lg:flex">
            <div className="absolute top-0 right-0 w-72 h-96 rotate-3 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] shadow-2xl opacity-20" />
            <div className="absolute top-8 right-8 w-72 h-96 -rotate-2 rounded-2xl bg-gradient-to-br from-[#F57342] to-[#FB923C] shadow-2xl opacity-20" />
            <div className="absolute top-16 right-16 w-72 h-96 bg-[#111827] rounded-2xl shadow-2xl border border-[#374151] p-6 flex flex-col">
              <div className="flex items-center gap-1.5 mb-5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F57342]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#EAB308]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
              </div>
              <div className="rounded-xl bg-[#0A0E14] border border-[#1F2937] p-4 mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Upcoming</p>
                <p className="font-display font-bold text-lg text-[#F9FAFB] mt-1 leading-tight">Spring Buildathon 2026</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Mar 15-17 · Online</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[#0F766E]/10 to-[#14B8A6]/10 border border-[#0F766E]/20 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#5ECAD4]">Registered</p>
                  <p className="text-xs font-bold text-[#F9FAFB]">847 / 1,000</p>
                </div>
                <div className="mt-2 h-1.5 bg-[#0A0E14] rounded-full overflow-hidden">
                  <div className="h-full w-[84.7%] bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-full" />
                </div>
              </div>
              <button className="mt-auto pt-4 w-full rounded-lg bg-[#0F766E] text-white text-sm font-semibold py-3 hover:bg-[#14B8A6] transition">
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
function ImpactStats({
  userCount,
  projectCount,
  totalRaised,
}: {
  userCount: number;
  projectCount: number;
  totalRaised: number;
}) {
  return (
    <section className="relative section-pad bg-[#0A0E14] overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
            Impact that <span className="gradient-text">scales.</span>
          </h2>
          <p className="mt-4 text-lg text-[#9CA3AF]">
            Real numbers from real people — verified through program completion data.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {[
            { value: userCount.toLocaleString() + "+", label: "Active Learners", icon: Users },
            { value: projectCount.toLocaleString() + "+", label: "Shipped Projects", icon: Code2 },
            { value: "48", label: "Countries Reached", icon: Globe },
            { value: `$${totalRaised >= 1000 ? (totalRaised / 1000).toFixed(0) + "K" : totalRaised.toLocaleString()}`, label: "Donated", icon: Heart },
          ].map((s) => (
            <div
              key={s.label}
              className="card-interactive rounded-2xl p-6 text-center"
            >
              <s.icon className="h-7 w-7 text-[#5ECAD4] mx-auto mb-4" />
              <p className="font-display font-bold text-3xl text-[#F9FAFB]">{s.value}</p>
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
function FeaturedEvents({
  events,
}: {
  events: Array<{
    id: string;
    title: string;
    slug: string;
    description: string;
    type: string;
    startDate: Date;
    location: string | null;
    capacity: number | null;
    _count: { registrations: number };
  }>;
}) {
  const typeLabel: Record<string, string> = {
    EVENT: "EVENT",
    COMPETITION: "COMPETITION",
  };

  const gradients = [
    "from-[#0F766E] to-[#14B8A6]",
    "from-[#F57342] to-[#FB923C]",
    "from-[#14B8A6] to-[#5ECAD4]",
  ];

  return (
    <section className="section-pad bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4]">
              <Calendar className="h-4 w-4" />
              Featured Programs
            </div>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
              What&apos;s happening now
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5ECAD4] hover:text-[#14B8A6] transition"
          >
            View all events
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {events.slice(0, 3).map((e, idx) => (
            <Link
              key={e.id}
              href={`/events/${e.slug}`}
              className="card-interactive group overflow-hidden block"
            >
              {/* Header */}
              <div className={`relative h-40 p-5 bg-gradient-to-br ${gradients[idx % gradients.length]}`}>
                <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                <div className="relative h-full flex flex-col justify-between">
                  <span className="self-start text-[10px] font-bold tracking-widest text-white bg-white/20 px-2.5 py-1 rounded">
                    {typeLabel[e.type] ?? e.type}
                  </span>
                  <div>
                    <p className="font-display font-bold text-xl text-white mt-1 leading-tight">
                      {e.title}
                    </p>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                  <Calendar className="h-4 w-4 text-[#6B7280]" />
                  <span>{new Date(e.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                {e.location && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <Globe className="h-4 w-4 text-[#6B7280]" />
                    <span>{e.location}</span>
                  </div>
                )}
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22C55E]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    Register now
                  </span>
                  <ArrowRight className="h-5 w-5 text-[#6B7280] group-hover:text-[#5ECAD4] group-hover:translate-x-1 transition-all" />
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
function FeaturedProjects({
  projects,
}: {
  projects: Array<{
    id: string;
    title: string;
    slug: string;
    description: string;
    contributors: string[];
    externalLink: string | null;
  }>;
}) {
  const gradients = [
    "from-[#14B8A6] to-[#5ECAD4]",
    "from-[#0F766E] to-[#14B8A6]",
    "from-[#F57342] to-[#FB923C]",
  ];

  return (
    <section className="section-pad bg-[#0A0E14]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#F57342]/15 border border-[#F57342]/25 px-4 py-2 text-sm font-semibold text-[#FB923C]">
              <Code2 className="h-4 w-4" />
              Community Showcase
            </div>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
              Built by the community.
            </h2>
            <p className="mt-3 text-[#9CA3AF] max-w-xl">
              Real projects, shipped by students — solving problems that matter in their communities.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5ECAD4] hover:text-[#14B8A6] transition"
          >
            See all projects
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.slice(0, 3).map((p, idx) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="card-interactive group overflow-hidden"
            >
              <div className={`relative h-36 bg-gradient-to-br ${gradients[idx % gradients.length]} overflow-hidden`}>
                <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 className="h-14 w-14 text-white/30 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-2xl text-[#F9FAFB]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-5 pt-5 border-t border-[#1F2937] flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {p.contributors.slice(0, 3).map((c, i) => {
                      const colors = ["bg-[#F57342]", "bg-[#22C55E]", "bg-[#EAB308]"];
                      return (
                        <span key={i} className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${colors[i % 3]} border-2 border-[#1A2332] text-white text-xs font-bold`}>
                          {c[0]}
                        </span>
                      );
                    })}
                  </div>
                  {p.externalLink ? (
                    <a
                      href={p.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5ECAD4] hover:text-[#14B8A6] transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </a>
                  ) : (
                    <ArrowRight className="h-5 w-5 text-[#6B7280] group-hover:text-[#5ECAD4] group-hover:translate-x-1 transition-all" />
                  )}
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
   TESTIMONIALS
============================================================ */
function Testimonials() {
  const quotes = [
    {
      quote: "TechRise turned a curious kid with a laptop into a builder shipping tools used by thousands. I owe so much to this community.",
      name: "Aarav Mehta",
      role: "Software Engineer · Alumnus '24",
    },
    {
      quote: "As a mentor, the most rewarding part is seeing that 'aha' moment when a student connects the dots and ships their first real project.",
      name: "Priya Sharma",
      role: "Senior Engineer · Mentor",
    },
    {
      quote: "We sponsored TechRise's programs last year and got back something money can't buy: a pipeline of incredible, motivated junior engineers.",
      name: "Daniel Okafor",
      role: "CTO · Sponsor Partner",
    },
  ];

  return (
    <section className="section-pad bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4]">
            <Quote className="h-4 w-4" />
            Voices from the community
          </div>
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
            Stories from people we&apos;ve grown with.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q, idx) => (
            <div key={q.name} className="card-interactive p-7">
              <Quote className="h-7 w-7 text-[#0F766E] mb-5" fill="currentColor" />
              <p className="text-[#9CA3AF] leading-relaxed font-medium">
                &ldquo;{q.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-[#1F2937]">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  idx === 0 ? "bg-[#0F766E]" :
                  idx === 1 ? "bg-[#14B8A6]" :
                  "bg-[#F57342]"
                }`}>
                  {q.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-[#F9FAFB] text-sm">{q.name}</p>
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
    <section className="relative section-pad bg-[#0A0E14] overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-50" />
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#0F766E]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] bg-[#F57342]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#374151] bg-gradient-to-br from-[#111827] via-[#0F766E]/10 to-[#111827] px-10 sm:px-14 py-16 sm:py-20">
          <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-30" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4]">
                <Sparkles className="h-4 w-4" />
                Your journey starts here
              </div>
              <h2 className="mt-6 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
                Ready to rise?
              </h2>
              <p className="mt-4 text-lg text-[#9CA3AF] max-w-md">
                Join 2,400+ learners building real skills, real projects, and real futures. No prior experience needed — just curiosity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link href="/signup" className="btn-primary justify-center text-base py-4">
                Create free account
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/donate" className="btn-accent justify-center text-base py-4">
                <Heart className="h-5 w-5" fill="currentColor" />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
