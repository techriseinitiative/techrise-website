import Link from "next/link";
import { Heart, Target, Eye, Compass, Users, Lightbulb, Globe, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About",
  description: "Learn about TechRise Initiative's mission, story, and the team behind it.",
};

const TEAM = [
  { name: "Aarav Mehta", role: "Founder & CEO", color: "from-primary-500 to-primary-700" },
  { name: "Priya Sharma", role: "Head of Programs", color: "from-accent-500 to-accent-700" },
  { name: "Daniel Okafor", role: "Community Lead", color: "from-emerald-500 to-emerald-700" },
  { name: "Sofia Garcia", role: "Operations", color: "from-violet-500 to-violet-700" },
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
      <section className="relative pt-16 sm:pt-24 pb-16 sm:pb-20 bg-ink-50 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm animate-fade-up">
            <Compass className="h-3.5 w-3.5 text-primary-600" />
            About TechRise
          </div>
          <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight animate-fade-up delay-100">
            We exist to <span className="text-gradient">turn curiosity</span> into capability.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed max-w-2xl mx-auto animate-fade-up delay-200">
            TechRise Initiative is a global community building the next generation of problem-solvers through technology education, hands-on programs, and real collaboration.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 text-primary-700 px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
                <Eye className="h-3 w-3" />
                Our Mission
              </div>
              <h2 className="mt-5 font-display font-bold text-4xl tracking-tight">
                Empowering individuals through technology, innovation, and global collaboration.
              </h2>
              <p className="mt-5 text-lg text-ink-600 leading-relaxed">
                We help learners evolve into creators by building real-world skills, engaging in meaningful competitions, and contributing to impactful projects.
              </p>
              <p className="mt-4 text-ink-600 leading-relaxed">
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
                <div key={s.label} className="rounded-2xl bg-ink-50 border border-ink-200 p-6 hover:border-primary-200 hover:shadow-lg transition">
                  <p className="font-display font-bold text-3xl text-gradient-blue">{s.value}</p>
                  <p className="text-sm text-ink-600 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 sm:py-28 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-100 text-accent-700 px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
              <Lightbulb className="h-3 w-3" />
              What we live by
            </div>
            <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight">
              Values, not vibes.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="group rounded-2xl bg-white p-7 border border-ink-200 hover:border-ink-300 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-ink-900">{v.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 text-primary-700 px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
              <Users className="h-3 w-3" />
              The Team
            </div>
            <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl tracking-tight">
              A small team, a big mission.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((m) => (
              <div key={m.name} className="group rounded-2xl bg-ink-50 border border-ink-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`h-32 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-4xl font-display font-bold`}>
                  {m.name[0]}
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-ink-900">{m.name}</h3>
                <p className="text-sm text-ink-500 mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-ink-50">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
            Join the movement.
          </h2>
          <p className="mt-4 text-lg text-ink-600 max-w-xl mx-auto">
            Whether you're a learner, mentor, or sponsor — there's a place for you here.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/events" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-ink-800 transition hover:scale-[1.02]">
              Explore programs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/donate" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 border border-ink-200 hover:border-ink-300 hover:bg-ink-50 transition">
              <Heart className="h-4 w-4 text-accent-500" fill="currentColor" />
              Support us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
