import Link from "next/link";
import { Code2, ArrowRight, Sparkles, Users, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Project Showcase",
  description: "Real projects built by the TechRise community — solving real problems.",
};

const gradients = [
  "from-[#14B8A6] to-[#5ECAD4]",
  "from-[#0F766E] to-[#14B8A6]",
  "from-[#F57342] to-[#FB923C]",
  "from-[#F57342] to-[#E11D48]",
  "from-[#22C55E] to-[#059669]",
  "from-[#EAB308] to-[#F59E0B]",
];

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });

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

      {/* PROJECTS GRID */}
      <section className="py-16 sm:py-20 bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {projects.length === 0 ? (
            <div className="rounded-2xl bg-[#111827] border border-[#374151] p-12 text-center">
              <Sparkles className="h-10 w-10 text-[#5ECAD4] mx-auto mb-3" />
              <p className="font-display font-bold text-xl text-[#F9FAFB]">No projects yet</p>
              <p className="text-sm text-[#9CA3AF] mt-2">Check back soon as the community keeps building.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p, idx) => {
                const cover = p.imageUrls[0];
                const color = gradients[idx % gradients.length];
                return (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="card-interactive group overflow-hidden"
                  >
                    <div className={`relative h-44 ${cover ? "bg-[#111827]" : `bg-gradient-to-br ${color}`} overflow-hidden`}>
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-pattern-dots opacity-20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Code2 className="h-16 w-16 text-white/30 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-display font-bold text-2xl text-[#F9FAFB]">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm text-[#9CA3AF] leading-relaxed line-clamp-2">
                        {p.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-sm text-[#9CA3AF]">
                        <Users className="h-4 w-4 text-[#6B7280]" />
                        <span>
                          {p.contributors.length} contributor{p.contributors.length !== 1 ? "s" : ""}
                        </span>
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
                                {c[0]?.toUpperCase()}
                              </span>
                            );
                          })}
                        </div>
                        {p.externalLink ? (
                          <span
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5ECAD4] group-hover:text-[#14B8A6] transition"
                          >
                            View
                            <ExternalLink className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <ArrowRight className="h-5 w-5 text-[#6B7280] group-hover:text-[#5ECAD4] group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
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
