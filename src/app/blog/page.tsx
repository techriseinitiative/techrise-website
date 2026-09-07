import Link from "next/link";
import { PenLine, Calendar, ArrowRight, Clock, Sparkles } from "lucide-react";

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
    color: "from-[#0F766E] to-[#14B8A6]",
  },
  {
    title: "Building AquaSense: From dorm room idea to 14 villages",
    excerpt: "Aarav Mehta's journey from a weekend hackathon project to a product deployed across South Asia.",
    author: "Aarav Mehta",
    date: "Feb 14, 2026",
    readTime: "12 min read",
    tag: "Story",
    color: "from-[#14B8A6] to-[#5ECAD4]",
  },
  {
    title: "The case for learning in public",
    excerpt: "Why sharing your learning process — failures included — is the best thing you can do for your career.",
    author: "Daniel Okafor",
    date: "Jan 30, 2026",
    readTime: "6 min read",
    tag: "Opinion",
    color: "from-[#F57342] to-[#FB923C]",
  },
  {
    title: "Top 5 tools every beginner developer needs in 2026",
    excerpt: "We surveyed 1,200 students and compiled the definitive list of tools that actually matter when you're starting out.",
    author: "Sofia Garcia",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    tag: "Tutorial",
    color: "from-[#EAB308] to-[#F59E0B]",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-16 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4] animate-fade-up">
              <PenLine className="h-4 w-4" />
              Blog & News
            </div>
            <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F9FAFB] animate-fade-up delay-100">
              Stories from the <br />
              <span className="gradient-text">TechRise community.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl animate-fade-up delay-200">
              Tutorials, opinion pieces, and behind-the-scenes looks at what&apos;s being built across our global network.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="pb-16 bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <Link href="#" className="group block relative overflow-hidden rounded-2xl card-interactive">
            <div className="grid lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-[#0F766E] via-[#14B8A6] to-[#F57342] p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                <div className="relative">
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur text-white px-3 py-1 rounded mb-4">
                    Featured
                  </span>
                  <p className="text-xs font-semibold text-white/80 mt-6">Jan 1, 2026</p>
                </div>
              </div>
              <div className="p-8 lg:p-12 bg-[#111827]">
                <span className="badge badge-primary">
                  Community
                </span>
                <h2 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-[#F9FAFB] leading-tight">
                  TechRise 2025 Year in Review: 2,400 students, 48 countries, 120 projects
                </h2>
                <p className="mt-4 text-[#9CA3AF] leading-relaxed">
                  A look back at everything we shipped together last year — the programs that launched, the projects that shipped, and the milestones we hit as a community. Plus: what&apos;s coming in 2026.
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-[#9CA3AF]">
                  <span className="font-semibold text-[#F9FAFB]">TechRise Team</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" />15 min read</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="pb-20 sm:pb-28 bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {POSTS.map((post, idx) => (
              <Link
                key={post.title}
                href="#"
                className="group card-interactive overflow-hidden block"
              >
                <div className={`h-32 bg-gradient-to-br ${post.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PenLine className="h-10 w-10 text-white/30" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-5">
                  <span className="badge badge-primary">
                    {post.tag}
                  </span>
                  <h3 className="mt-3 font-display font-bold text-lg text-[#F9FAFB] leading-snug line-clamp-2 group-hover:text-[#5ECAD4] transition">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#1F2937] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#F9FAFB]">{post.author}</p>
                      <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </p>
                    </div>
                    <p className="text-xs text-[#6B7280] flex items-center gap-1">
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