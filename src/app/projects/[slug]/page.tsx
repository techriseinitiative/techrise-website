import { notFound } from "next/navigation";
import Link from "next/link";
import { Code2, ExternalLink, ArrowRight, Users, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project || project.status !== "APPROVED") {
    notFound();
  }

  const colors = ["#0F766E", "#F57342", "#14B8A6", "#22C55E"];
  const colorIdx = parseInt(project.id.slice(-1), 16) % colors.length;
  const color = colors[colorIdx];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 sm:pt-28 pb-10 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
              style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
            >
              <Code2 className="h-3 w-3" />
              Community project
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F9FAFB] leading-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20 sm:pb-28 bg-[#0A0E14]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {project.imageUrls.length > 0 && (
                <div className="space-y-4">
                  {project.imageUrls.map((url, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-[#374151] bg-[#111827]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-auto" />
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-7">
                <h2 className="font-display font-bold text-xl text-[#F9FAFB] mb-4">About the project</h2>
                <div className="text-[#9CA3AF] leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
                <h3 className="font-display font-bold text-base text-[#F9FAFB] mb-4">Project details</h3>

                {project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F766E] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#14B8A6] transition mb-4"
                  >
                    View project
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

                <div className="pt-4 border-t border-[#1F2937]">
                  <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-3">Contributors</h4>
                  <ul className="space-y-2">
                    {project.contributors.map((c, i) => {
                      const colorI = colors[i % colors.length];
                      return (
                        <li key={c} className="flex items-center gap-3">
                          <span
                            className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: colorI }}
                          >
                            {c[0]?.toUpperCase()}
                          </span>
                          <span className="text-sm text-[#F9FAFB]">{c}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111827]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F9FAFB]">
            Inspired by {project.title}?
          </h2>
          <p className="mt-3 text-[#9CA3AF]">
            Join our programs and ship your own project with mentorship and support from the community.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/events" className="btn-primary">
              Browse programs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/projects" className="btn-outline">
              See more projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
