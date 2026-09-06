import Link from "next/link";
import { Code2, ExternalLink, GitBranch, ArrowRight, Sparkles, Filter, Users } from "lucide-react";

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
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "VerbaLearn",
    category: "EdTech",
    description: "Voice-first literacy app for first-graders in low-bandwidth regions. Works offline. Currently used in 200+ schools.",
    contributors: ["Sofia G.", "Marcus L."],
    link: "https://github.com/techrise/verbalearn",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "GridShare",
    category: "Energy · Open Source",
    description: "Peer-to-peer solar energy trading platform. Enables households with rooftop solar to sell excess energy to neighbors.",
    contributors: ["Aarav M.", "Lina K.", "Yusuf A.", "Sara P."],
    link: "https://github.com/techrise/gridshare",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "MedTranslate",
    category: "Health · AI",
    description: "Real-time medical translation app for non-English speaking patients in emergency rooms. HIPAA-compliant.",
    contributors: ["Daniel O.", "Emma T."],
    link: "https://github.com/techrise/medtranslate",
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "CodeMentor Match",
    category: "Developer Tools",
    description: "AI-powered matching system that pairs early-career developers with mentors based on learning style and goals.",
    contributors: ["Priya S.", "Wei C."],
    link: "https://github.com/techrise/mentor-match",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "FarmOS",
    category: "Agriculture",
    description: "Open-source farm management system for smallholder farmers. Tracks crops, weather, and yields across mobile and SMS.",
    contributors: ["Lina K.", "Marcus L.", "Aarav M."],
    link: "https://github.com/techrise/farmos",
    color: "from-lime-500 to-green-600",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 bg-ink-50 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm animate-fade-up">
              <Code2 className="h-3.5 w-3.5 text-accent-500" />
              Project Showcase
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight animate-fade-up delay-100">
              Real projects. <br /><span className="text-gradient">Real impact.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed max-w-2xl animate-fade-up delay-200">
              Every project here was built by students in our programs — solving problems that matter in their communities.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="border-y border-ink-200 bg-white sticky top-16 sm:top-20 z-30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-4 flex items-center gap-3 overflow-x-auto">
          <Filter className="h-4 w-4 text-ink-500 shrink-0" />
          {["All", "AI", "EdTech", "Sustainability", "Health", "Developer Tools"].map((f, i) => (
            <button
              key={f}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                i === 0
                  ? "bg-ink-900 text-white"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-16 sm:py-20 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                className="group relative overflow-hidden rounded-2xl bg-white border border-ink-200 hover:border-ink-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`relative h-44 bg-gradient-to-br ${p.color} overflow-hidden`}>
                  <div className="absolute inset-0 bg-hero-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 className="h-16 w-16 text-white/30 group-hover:scale-110 group-hover:rotate-3 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-primary-700">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-display font-bold text-2xl text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm text-ink-500">
                    <Users className="h-4 w-4" />
                    <span>{p.contributors.length} contributor{p.contributors.length !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="mt-5 pt-5 border-t border-ink-100 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {p.contributors.slice(0, 3).map((c, i) => {
                        const gradients = [
                          "from-rose-400 to-pink-500",
                          "from-emerald-400 to-teal-500",
                          "from-amber-400 to-orange-500",
                        ];
                        return (
                          <span
                            key={i}
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${gradients[i % 3]} border-2 border-white text-white text-xs font-bold`}
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
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-700 hover:text-ink-900 group/link"
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
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-white to-accent-50 p-10 sm:p-14 border border-ink-200">
            <Sparkles className="h-10 w-10 text-accent-500" />
            <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight">
              Built something cool?
            </h2>
            <p className="mt-3 text-ink-600 max-w-xl">
              Submissions open soon — get your project featured in the showcase and connect with mentors, sponsors, and collaborators.
            </p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-ink-800 transition hover:scale-[1.02]">
              Get notified
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
