import Link from "next/link";
import { Code2, GitBranch, ArrowRight, Sparkles, Filter, Users, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Project Showcase",
  description: "Real projects built by the TechRise community — solving real problems.",
};

const PROJECTS = [
  {
    title: "AquaSense",
    category: "AI · Sustainability",
    description: "Low-cost water quality monitoring system using edge ML on a $5 microcontroller. Deployed in 14 villages across South Asia.",
    contributors: ["Aarav M.", "Priya S.", "Daniel O."],
    link: "https://github.com/techrise/aquasense",
    color: "from-[#14B8A6] to-[#5ECAD4]",
  },
  {
    title: "VerbaLearn",
    category: "EdTech",
    description: "Voice-first literacy app for first-graders in low-bandwidth regions. Works offline. Currently used in 200+ schools.",
    contributors: ["Sofia G.", "Marcus L."],
    link: "https://github.com/techrise/verbalearn",
    color: "from-[#0F766E] to-[#14B8A6]",
  },
  {
    title: "GridShare",
    category: "Energy · Open Source",
    description: "Peer-to-peer solar energy trading platform. Enables households with rooftop solar to sell excess energy to neighbors.",
    contributors: ["Aarav M.", "Lina K.", "Yusuf A.", "Sara P."],
    link: "https://github.com/techrise/gridshare",
    color: "from-[#F57342] to-[#FB923C]",
  },
  {
    title: "MedTranslate",
    category: "Health · AI",
    description: "Real-time medical translation app for non-English speaking patients in emergency rooms. HIPAA-compliant.",
    contributors: ["Daniel O.", "Emma T."],
    link: "https://github.com/techrise/medtranslate",
    color: "from-[#F57342] to-[#E11D48]",
  },
  {
    title: "CodeMentor Match",
    category: "Developer Tools",
    description: "AI-powered matching system that pairs early-career developers with mentors based on learning style and goals.",
    contributors: ["Priya S.", "Wei C."],
    link: "https://github.com/techrise/mentor-match",
    color: "from-[#22C55E] to-[#059669]",
  },
  {
    title: "FarmOS",
    category: "Agriculture",
    description: "Open-source farm management system for smallholder farmers. Tracks crops, weather, and yields across mobile and SMS.",
    contributors: ["Lina K.", "Marcus L.", "Aarav M."],
    link: "https://github.com/techrise/farmos",
    color: "from-[#EAB308] to-[#F59E0B]",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#F57342]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#F57342]/15 border border-[#F57342]/25 px-4 py-2 text-sm font-semibold text-[#FB923C] animate-fade-up">
              <Code2 className="h-4 w-4" />
              Project Showcase
            </div>
            <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F9FAFB] animate-fade-up delay-100">
              Real projects. <br />
              <span className="gradient-warm">Real impact.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl animate-fade-up delay-200">
              Every project here was built by students in our programs — solving problems that matter in their communities.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="border-y border-[#1F2937] bg-[#111827]/90 sticky top-16 z-30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-4 flex items-center gap-3 overflow-x-auto">
          <Filter className="h-5 w-5 text-[#6B7280] shrink-0" />
          {["All", "AI", "EdTech", "Sustainability", "Health", "Developer Tools"].map((f, i) => (
            <button
              key={f}
              className={`shrink-0 rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                i === 0
                  ? "bg-[#0F766E] text-white"
                  : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151] hover:text-[#F9FAFB]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-16 sm:py-20 bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p, idx) => (
              <article
                key={p.title}
                className="card-interactive group overflow-hidden"
              >
                <div className={`relative h-44 bg-gradient-to-br ${p.color} overflow-hidden`}>
                  <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 className="h-16 w-16 text-white/30 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#5ECAD4]">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-display font-bold text-2xl text-[#F9FAFB]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#9CA3AF] leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <Users className="h-4 w-4 text-[#6B7280]" />
                    <span>{p.contributors.length} contributor{p.contributors.length !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="mt-5 pt-5 border-t border-[#1F2937] flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {p.contributors.slice(0, 3).map((c, i) => {
                        const colors = ["bg-[#F57342]", "bg-[#22C55E]", "bg-[#EAB308]"];
                        return (
                          <span
                            key={i}
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${colors[i % 3]} border-2 border-[#1A2332] text-white text-xs font-bold`}
                          >
                            {c[0]}
                          </span>
                        );
                      })}
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5ECAD4] hover:text-[#14B8A6] group/link transition"
                    >
                      <GitBranch className="h-4 w-4" />
                      View
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUBMIT CTA */}
      <section className="py-20 bg-[#111827]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#374151] bg-gradient-to-br from-[#111827] via-[#0F766E]/10 to-[#111827] p-10 sm:p-14">
            <div className="absolute inset-0 bg-pattern-dots pointer-events-none opacity-30" />
            <div className="absolute -top-20 right-0 w-60 h-60 bg-[#F57342]/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <Sparkles className="h-10 w-10 text-[#F57342]" />
              <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
                Built something cool?
              </h2>
              <p className="mt-3 text-[#9CA3AF] max-w-xl">
                Submissions open soon — get your project featured in the showcase and connect with mentors, sponsors, and collaborators.
              </p>
              <Link href="/contact" className="mt-7 btn-primary inline-flex">
                Get notified
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}