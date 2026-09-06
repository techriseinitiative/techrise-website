import Link from "next/link";
import { Code2, GitBranch, ArrowRight, Sparkles, Filter, Users } from "lucide-react";

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
    color: "from-[#22D3EE] to-[#0284C7]",
  },
  {
    title: "VerbaLearn",
    category: "EdTech",
    description: "Voice-first literacy app for first-graders in low-bandwidth regions. Works offline. Currently used in 200+ schools.",
    contributors: ["Sofia G.", "Marcus L."],
    link: "https://github.com/techrise/verbalearn",
    color: "from-[#A78BFA] to-[#7C3AED]",
  },
  {
    title: "GridShare",
    category: "Energy · Open Source",
    description: "Peer-to-peer solar energy trading platform. Enables households with rooftop solar to sell excess energy to neighbors.",
    contributors: ["Aarav M.", "Lina K.", "Yusuf A.", "Sara P."],
    link: "https://github.com/techrise/gridshare",
    color: "from-[#F59E0B] to-[#D97706]",
  },
  {
    title: "MedTranslate",
    category: "Health · AI",
    description: "Real-time medical translation app for non-English speaking patients in emergency rooms. HIPAA-compliant.",
    contributors: ["Daniel O.", "Emma T."],
    link: "https://github.com/techrise/medtranslate",
    color: "from-[#F87171] to-[#FB7185]",
  },
  {
    title: "CodeMentor Match",
    category: "Developer Tools",
    description: "AI-powered matching system that pairs early-career developers with mentors based on learning style and goals.",
    contributors: ["Priya S.", "Wei C."],
    link: "https://github.com/techrise/mentor-match",
    color: "from-[#34D399] to-[#059669]",
  },
  {
    title: "FarmOS",
    category: "Agriculture",
    description: "Open-source farm management system for smallholder farmers. Tracks crops, weather, and yields across mobile and SMS.",
    contributors: ["Lina K.", "Marcus L.", "Aarav M."],
    link: "https://github.com/techrise/farmos",
    color: "from-[#84CC16] to-[#16A34A]",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#0A0A0F] overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full badge-amber text-xs animate-fade-up">
              <Code2 className="h-3.5 w-3.5" />
              Project Showcase
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight text-[#F5F5F7] animate-fade-up delay-100">
              Real projects. <br /><span className="gradient-text">Real impact.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl animate-fade-up delay-200">
              Every project here was built by students in our programs — solving problems that matter in their communities.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="border-y border-[#232330] bg-[#13131A]/80 sticky top-[68px] z-30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-4 flex items-center gap-3 overflow-x-auto">
          <Filter className="h-4 w-4 text-[#6B7280] shrink-0" />
          {["All", "AI", "EdTech", "Sustainability", "Health", "Developer Tools"].map((f, i) => (
            <button
              key={f}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                i === 0
                  ? "bg-[#6366F1] text-[#F5F5F7]"
                  : "bg-[#232330] text-[#9CA3AF] hover:bg-[#3A3A50] hover:text-[#F5F5F7]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-16 sm:py-20 bg-[#0A0A0F]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                className="group relative overflow-hidden card-glow hover:border-[#6366F1]/40 transition-all duration-300"
              >
                <div className={`relative h-44 bg-gradient-to-br ${p.color} overflow-hidden`}>
                  <div className="absolute inset-0 bg-hero-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 className="h-16 w-16 text-white/30 group-hover:scale-110 group-hover:rotate-3 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#818CF8]">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-display font-bold text-2xl text-[#F5F5F7]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#9CA3AF] leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <Users className="h-4 w-4 text-[#6B7280]" />
                    <span>{p.contributors.length} contributor{p.contributors.length !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="mt-5 pt-5 border-t border-[#232330] flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {p.contributors.slice(0, 3).map((c, i) => {
                        const gradients = [
                          "from-[#F87171] to-[#FB7185]",
                          "from-[#34D399] to-[#10B981]",
                          "from-[#F59E0B] to-[#D97706]",
                        ];
                        return (
                          <span
                            key={i}
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${gradients[i % 3]} border-2 border-[#13131A] text-white text-xs font-bold`}
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
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#818CF8] hover:text-[#6366F1] group/link transition"
                    >
                      <GitBranch className="h-4 w-4" />
                      View
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUBMIT CTA */}
      <section className="py-20 bg-[#13131A]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#232330] bg-gradient-to-br from-[#13131A] via-[#1a1740] to-[#13131A] p-10 sm:p-14">
            <div className="absolute inset-0 bg-hero-grid pointer-events-none opacity-40" />
            <div className="absolute -top-20 right-0 w-60 h-60 bg-[#6366F1]/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <Sparkles className="h-10 w-10 text-[#F59E0B]" />
              <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F5F5F7]">
                Built something cool?
              </h2>
              <p className="mt-3 text-[#9CA3AF] max-w-xl">
                Submissions open soon — get your project featured in the showcase and connect with mentors, sponsors, and collaborators.
              </p>
              <Link href="/contact" className="mt-7 btn-primary inline-flex">
                Get notified
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
