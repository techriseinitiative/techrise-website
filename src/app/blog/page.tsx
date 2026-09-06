import Link from "next/link";
import { PenLine, Calendar, ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "News, tutorials, and stories from the TechRise community.",
};

const POSTS = [
  {
    title: "How we taught 500 students to ship their first app in 6 weeks",
    excerpt: "Behind the scenes of our most ambitious cohort yet — the curriculum, the challenges, and what we'd do differently.",
    author: "Priya Sharma",
    date: "Feb 28, 2026",
    readTime: "8 min read",
    tag: "Community",
    color: "from-primary-500 to-primary-700",
  },
  {
    title: "Building AquaSense: From dorm room idea to 14 villages",
    excerpt: "Aarav Mehta's journey from a weekend hackathon project to a product deployed across South Asia.",
    author: "Aarav Mehta",
    date: "Feb 14, 2026",
    readTime: "12 min read",
    tag: "Story",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "The case for learning in public",
    excerpt: "Why sharing your learning process — failures included — is the best thing you can do for your career.",
    author: "Daniel Okafor",
    date: "Jan 30, 2026",
    readTime: "6 min read",
    tag: "Opinion",
    color: "from-accent-500 to-accent-700",
  },
  {
    title: "Top 5 tools every beginner developer needs in 2026",
    excerpt: "We surveyed 1,200 students and compiled the definitive list of tools that actually matter when you're starting out.",
    author: "Sofia Garcia",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    tag: "Tutorial",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 bg-ink-50 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm animate-fade-up">
              <PenLine className="h-3.5 w-3.5 text-primary-600" />
              Blog & News
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight animate-fade-up delay-100">
              Stories from the <br /><span className="text-gradient">TechRise community.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed max-w-2xl animate-fade-up delay-200">
              Tutorials, opinion pieces, and behind-the-scenes looks at what's being built across our global network.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="pb-16 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Link href="#" className="group block relative overflow-hidden rounded-3xl bg-white border border-ink-200 hover:border-ink-300 hover:shadow-2xl transition-all hover:-translate-y-0.5">
            <div className="grid lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-grid opacity-20" />
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                <div className="relative">
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/15 backdrop-blur text-white px-3 py-1 rounded-full mb-4">
                    Featured
                  </span>
                  <p className="text-xs font-semibold text-white/80 mt-6">Jan 1, 2026</p>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full">
                  Community
                </span>
                <h2 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-ink-900 leading-tight">
                  TechRise 2025 Year in Review: 2,400 students, 48 countries, 120 projects
                </h2>
                <p className="mt-4 text-ink-600 leading-relaxed">
                  A look back at everything we shipped together last year — the programs that launched, the projects that shipped, and the milestones we hit as a community. Plus: what's coming in 2026.
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-ink-500">
                  <span className="font-semibold text-ink-700">TechRise Team</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />15 min read</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="pb-20 sm:pb-28 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {POSTS.map((post) => (
              <Link
                key={post.title}
                href="#"
                className="group rounded-2xl bg-white border border-ink-200 overflow-hidden hover:border-ink-300 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className={`h-32 bg-gradient-to-br ${post.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-hero-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PenLine className="h-10 w-10 text-white/30" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-ink-100 text-ink-600 px-2 py-0.5 rounded-full">
                    {post.tag}
                  </span>
                  <h3 className="mt-3 font-display font-bold text-lg text-ink-900 leading-snug line-clamp-2 group-hover:text-primary-700 transition">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-ink-700">{post.author}</p>
                      <p className="text-xs text-ink-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </p>
                    </div>
                    <p className="text-xs text-ink-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
