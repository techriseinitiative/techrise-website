import Link from "next/link";
import { Heart, Target, Eye, Compass, Users, Lightbulb, Globe, Sparkles, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "About",
  description: "Learn about TechRise Initiative's mission, story, and the team behind it.",
};

const VALUES = [
  { icon: Heart, title: "Empathy First", desc: "We design for the student who doesn't have access to formal education, the volunteer giving their weekends, and the sponsor who wants real impact." },
  { icon: Target, title: "Outcome Driven", desc: "Every program ends with a shipped project, a public portfolio piece, or a hire — not a certificate that collects dust." },
  { icon: Globe, title: "Global by Default", desc: "48 countries. 12 time zones. One mission. We meet people where they are, online or in person." },
  { icon: Sparkles, title: "Show, Don't Tell", desc: "We build in public, share what works, share what doesn't, and invite the community to help us iterate." },
];

const teamGradients = [
  "from-[#0F766E] to-[#14B8A6]",
  "from-[#14B8A6] to-[#5ECAD4]",
  "from-[#F57342] to-[#FB923C]",
  "from-[#EAB308] to-[#F59E0B]",
];

export default async function AboutPage() {
  const [admins, stats] = await Promise.all([
    prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true, name: true, bio: true, image: true },
    }),
    Promise.all([
      prisma.user.count(),
      prisma.project.count({ where: { status: "APPROVED" } }),
    ]),
  ]);

  const [userCount, projectCount] = stats;

  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4] animate-fade-up">
            <Compass className="h-4 w-4" />
            About TechRise
          </div>
          <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F9FAFB] animate-fade-up delay-100">
            We exist to <span className="gradient-text">turn curiosity</span> into capability.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto animate-fade-up delay-200">
            TechRise Initiative is a global community building the next generation of problem-solvers through technology education, hands-on programs, and real collaboration.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 sm:py-28 bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4]">
                <Eye className="h-4 w-4" />
                Our Mission
              </div>
              <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
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
                { value: userCount.toLocaleString() + "+", label: "Students" },
                { value: projectCount.toLocaleString() + "+", label: "Projects" },
              ].map((s) => (
                <div key={s.label} className="card-interactive rounded-2xl p-6 text-center">
                  <p className="font-display font-bold text-3xl text-[#F9FAFB]">{s.value}</p>
                  <p className="text-sm text-[#9CA3AF] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 sm:py-28 bg-[#0A0E14]">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-30" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#14B8A6]/15 border border-[#14B8A6]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4]">
              <Lightbulb className="h-4 w-4" />
              What we live by
            </div>
            <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
              Values, not vibes.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="card-interactive group p-7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F766E]/15 text-[#5ECAD4] group-hover:bg-[#0F766E]/25 transition">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-[#F9FAFB]">{v.title}</h3>
                <p className="mt-2 text-[#9CA3AF] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 sm:py-28 bg-[#111827]" id="team">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/25 px-4 py-2 text-sm font-semibold text-[#22C55E]">
              <Users className="h-4 w-4" />
              The Team
            </div>
            <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
              A small team, a big mission.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {admins.map((m, idx) => (
              <div key={m.id} className="card-interactive p-6 text-center">
                <div className={`h-32 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-4xl font-display font-bold mx-auto ${teamGradients[idx % teamGradients.length]}`}>
                  {m.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.image} alt={m.name} className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    m.name[0]
                  )}
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-[#F9FAFB]">{m.name}</h3>
                {m.bio && (
                  <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2">{m.bio.split(".")[0]}.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0F766E]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 sm:px-8 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
            Join the movement.
          </h2>
          <p className="mt-4 text-lg text-[#9CA3AF] max-w-xl mx-auto">
            Whether you&apos;re a learner, mentor, or sponsor — there&apos;s a place for you here.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/events" className="btn-primary">
              Explore programs
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/donate" className="btn-accent">
              <Heart className="h-5 w-5" fill="currentColor" />
              Support us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
