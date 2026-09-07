import Link from "next/link";
import { PenLine, Calendar, ArrowRight, Clock, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Blog",
  description: "News, tutorials, and stories from the TechRise community.",
};

const gradients = [
  "from-[#0F766E] to-[#14B8A6]",
  "from-[#14B8A6] to-[#5ECAD4]",
  "from-[#F57342] to-[#FB923C]",
  "from-[#EAB308] to-[#F59E0B]",
];

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true, image: true } } },
  });

  const featured = posts[0];
  const rest = posts.slice(1);

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
      {featured && (
        <section className="pb-16 bg-[#0A0E14]">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Link href={`/blog/${featured.slug}`} className="group block relative overflow-hidden rounded-2xl card-interactive">
              <div className="grid lg:grid-cols-2">
                <div className="h-64 lg:h-auto bg-gradient-to-br from-[#0F766E] via-[#14B8A6] to-[#F57342] p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                  <div className="relative">
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur text-white px-3 py-1 rounded mb-4">
                      Featured
                    </span>
                    <p className="text-xs font-semibold text-white/80 mt-6">
                      {featured.publishedAt
                        ? new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="p-8 lg:p-12 bg-[#111827]">
                  <span className="badge badge-primary">Community</span>
                  <h2 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-[#F9FAFB] leading-tight group-hover:text-[#5ECAD4] transition">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[#9CA3AF] leading-relaxed line-clamp-2">
                    {featured.excerpt ?? stripHtml(featured.content).slice(0, 180) + "..."}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <span className="font-semibold text-[#F9FAFB]">{featured.author.name}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />{estimateReadTime(featured.content)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* POSTS GRID */}
      <section className="pb-20 sm:pb-28 bg-[#111827]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {posts.length === 0 ? (
            <div className="rounded-2xl bg-[#0A0E14] border border-[#374151] p-12 text-center">
              <Sparkles className="h-10 w-10 text-[#5ECAD4] mx-auto mb-3" />
              <p className="font-display font-bold text-xl text-[#F9FAFB]">No posts yet</p>
              <p className="text-sm text-[#9CA3AF] mt-2">Stories and updates from the community will appear here.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {rest.map((post, idx) => {
                const color = gradients[idx % gradients.length];
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group card-interactive overflow-hidden block"
                  >
                    <div className={`h-32 bg-gradient-to-br ${color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PenLine className="h-10 w-10 text-white/30" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="badge badge-primary">Community</span>
                      <h3 className="mt-3 font-display font-bold text-lg text-[#F9FAFB] leading-snug line-clamp-2 group-hover:text-[#5ECAD4] transition">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                        {post.excerpt ?? stripHtml(post.content).slice(0, 140) + "..."}
                      </p>
                      <div className="mt-4 pt-4 border-t border-[#1F2937] flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-[#F9FAFB]">{post.author.name}</p>
                          <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                              : "Draft"}
                          </p>
                        </div>
                        <p className="text-xs text-[#6B7280] flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {estimateReadTime(post.content)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
