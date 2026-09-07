import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, User, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true, image: true, bio: true } } },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const words = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  // Fetch related posts
  const related = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: post.id },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: { id: true, title: true, slug: true, excerpt: true, publishedAt: true, author: { select: { name: true } } },
  });

  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 sm:pt-28 pb-12 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          {post.coverImageUrl && (
            <div className="rounded-2xl overflow-hidden border border-[#374151] mb-8 aspect-[16/9] bg-[#111827]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#F9FAFB] leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-white text-sm font-bold">
                {post.author.name[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-[#F9FAFB]">{post.author.name}</p>
                {post.author.bio && <p className="text-xs text-[#6B7280] line-clamp-1">{post.author.bio}</p>}
              </div>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                : ""}
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readTime} min read
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20 bg-[#0A0E14]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <article
            className="prose prose-invert max-w-none text-[#9CA3AF] leading-relaxed
              prose-headings:font-display prose-headings:font-bold prose-headings:text-[#F9FAFB]
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:my-4 prose-p:text-base
              prose-a:text-[#5ECAD4] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#F9FAFB]
              prose-blockquote:border-l-4 prose-blockquote:border-[#0F766E] prose-blockquote:pl-4 prose-blockquote:italic
              prose-code:text-[#14B8A6] prose-code:bg-[#111827] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-[#111827] prose-pre:border prose-pre:border-[#374151]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-16 bg-[#111827]">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <h2 className="font-display font-bold text-2xl text-[#F9FAFB] mb-8">Keep reading</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="card-interactive p-6 group block"
                >
                  <h3 className="font-display font-bold text-lg text-[#F9FAFB] leading-snug line-clamp-2 group-hover:text-[#5ECAD4] transition">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#9CA3AF] line-clamp-2">
                    {r.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-[#6B7280] flex items-center gap-1">
                    {r.author.name} ·{" "}
                    {r.publishedAt
                      ? new Date(r.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
