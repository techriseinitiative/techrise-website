import Link from "next/link";
import { Heart, Target, Eye, Compass, Users, Lightbulb, Globe, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About",
  description: "Learn about TechRise Initiative's mission, story, and the team behind it.",
};

const TEAM = [
  { name: "Aarav Mehta", role: "Founder & CEO", color: "from-[#6366F1] to-[#818CF8]" },
  { name: "Priya Sharma", role: "Head of Programs", color: "from-[#22D3EE] to-[#06B6D4]" },
  { name: "Daniel Okafor", role: "Community Lead", color: "from-[#34D399] to-[#10B981]" },
  { name: "Sofia Garcia", role: "Operations", color: "from-[#A78BFA] to-[#7C3AED]" },
];

const VALUES = [
  { icon: Heart, title: "Empathy First", desc: "We design for the student who doesn't have access to formal education, the volunteer giving their weekends, and the sponsor who wants real impact." },
  { icon: Target, title: "Outcome Driven", desc: "Every program ends with a shipped project, a public portfolio piece, or a hire — not a certificate that collects dust." },
  { icon: Globe, title: "Global by Default", desc: "48 countries. 12 time zones. One mission. We meet people where they are, online or in person." },
  { icon: Sparkles, title: "Show, Don't Tell", desc: "We build in public, share what works, share what doesn't, and invite the community to help us iterate." },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 sm:pt-24 pb-16 sm:pb-20 bg-[#0A0A0F] overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full badge-indigo text-xs animate-fade-up">
            <Compass className="h-3.5 w-3.5" />
            About TechRise
          </div>
          <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight text-[#F5F5F7] animate-fade-up delay-100">
            We exist to <span className="gradient-text">turn curiosity</span> into capability.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto animate-fade-up delay-200">
            TechRise Initiative is a global community building the next generation of problem-solvers through technology education, hands-on programs, and real collaboration.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 sm:py-28 bg-[#13131A]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full badge-indigo text-xs">
                <Eye className="h-3 w-3" />
                Our Mission
              </div>
              <h2 className="mt-5 font-display font-bold text-4xl tracking-tight text-[#F5F5F7]">
                Empowering individuals through technology, innovation, and global collaboration.
              </h2>
              <p className="mt-5 text-lg text-[#9CA3AF] leading-relaxed">
                We help learners evolve into creators by building real-world skills, engaging in meaningful competitions, and contributing to impactful projects.
              </p>
              <p className="mt-4 text-[#9CA3AF] leading-relaxed">
                Through education, collaboration, and innovation, our goal is to make technology accessible to all and inspire the next generation of problem-solvers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2023", label: "Founded" },
                { value: "48", label: "Countries" },
                { value: "2,400+", label: "Students" },
                { value: "120+", label: "Projects" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-[#0A0A0F] border border-[#232330] p-6 hover:border-[#6366F1]/40 transition cursor-default">
                  <p className="font-display font-bold text-3xl text-[#F5F5F7] glow-indigo">{s.value}</p>
                  <p className="text-sm text-[#9CA3AF] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 sm:py-28 bg-[#0A0A0F]">
        <div className="absolute inset-0 bg-hero-grid pointer-events-none opacity-40" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full badge-cyan text-xs">
              <Lightbulb className="h-3 w-3" />
              What we live by
            </div>
            <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
              Values, not vibes.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="card-glow group p-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366F1]/15 text-[#818CF8] group-hover:bg-[#6366F1]/25 transition">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-[#F5F5F7]">{v.title}</h3>
                <p className="mt-2 text-[#9CA3AF] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 sm:py-28 bg-[#13131A]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full badge-emerald text-xs">
              <Users className="h-3 w-3" />
              The Team
            </div>
            <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
              A small team, a big mission.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((m) => (
              <div key={m.name} className="card-glow p-6 text-center">
                <div className={`h-32 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-4xl font-display font-bold mx-auto`}>
                  {m.name[0]}
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-[#F5F5F7]">{m.name}</h3>
                <p className="text-sm text-[#9CA3AF] mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28 bg-[#0A0A0F] overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid pointer-events-none opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F5F5F7]">
            Join the movement.
          </h2>
          <p className="mt-4 text-lg text-[#9CA3AF] max-w-xl mx-auto">
            Whether you&apos;re a learner, mentor, or sponsor — there&apos;s a place for you here.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/events" className="btn-primary">
              Explore programs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/donate" className="btn-amber">
              <Heart className="h-4 w-4" fill="currentColor" />
              Support us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
