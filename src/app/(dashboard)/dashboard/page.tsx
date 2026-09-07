import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, FolderOpen, ArrowRight, Heart, LogOut, User } from "lucide-react";
import { logoutAction } from "@/actions/auth";

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name?.split(" ")[0] ?? "there";

  const [registrations, donations] = await Promise.all([
    session?.user?.id
      ? prisma.eventRegistration.findMany({
          where: {
            userId: session.user.id,
            status: { in: ["CONFIRMED", "WAITLISTED"] },
          },
          include: { event: { select: { id: true, title: true, slug: true, startDate: true, type: true } } },
          orderBy: { registeredAt: "desc" },
        })
      : [],
    session?.user?.id
      ? prisma.donation.aggregate({
          where: { userId: session.user.id, status: "SUCCEEDED" },
          _sum: { amount: true },
          _count: true,
        })
      : { _sum: { amount: null }, _count: 0 },
  ]);

  const totalDonated = (donations._sum.amount ?? 0) / 100;

  return (
    <div className="min-h-[80vh] bg-[#0A0E14]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-14">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Welcome back,</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#F5F5F7]">
              Hey {name} 👋
            </h1>
            <p className="mt-2 text-[#9CA3AF]">
              Here&apos;s what&apos;s happening with your TechRise account.
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[#111827] border border-[#374151] px-4 py-2 text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#4B5563] transition"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="card-glow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-[#F5F5F7]">{registrations.length}</p>
                <p className="text-xs text-[#6B7280]">Registered events</p>
              </div>
            </div>
            <Link href="/events" className="text-sm font-semibold text-[#818CF8] hover:text-[#6366F1] flex items-center gap-1 transition">
              Browse events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card-glow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] flex items-center justify-center">
                <FolderOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-[#F5F5F7]">
                  {registrations.filter((r) => r.status === "CONFIRMED").length}
                </p>
                <p className="text-xs text-[#6B7280]">Confirmed registrations</p>
              </div>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-[#818CF8] hover:text-[#6366F1] flex items-center gap-1 transition">
              View showcase <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card-glow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#34D399] to-[#059669] flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-[#F5F5F7]">${totalDonated.toLocaleString()}</p>
                <p className="text-xs text-[#6B7280]">Total donated ({donations._count} donations)</p>
              </div>
            </div>
            <Link href="/donate" className="text-sm font-semibold text-[#818CF8] hover:text-[#6366F1] flex items-center gap-1 transition">
              Donate now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Registered events */}
        {registrations.length > 0 && (
          <div className="card-glow p-7 mb-6">
            <h2 className="font-display font-bold text-xl text-[#F5F5F7] mb-5">Your upcoming events</h2>
            <div className="space-y-3">
              {registrations.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0A0E14] border border-[#1F2937]">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#0F766E]/15 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-[#5ECAD4]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#F9FAFB] text-sm">{reg.event.title}</p>
                      <p className="text-xs text-[#6B7280]">
                        {new Date(reg.event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      reg.status === "CONFIRMED"
                        ? "bg-[#22C55E]/10 text-[#22C55E]"
                        : "bg-[#EAB308]/10 text-[#EAB308]"
                    }`}>
                      {reg.status.toLowerCase()}
                    </span>
                    <Link href={`/events/${reg.event.slug}`} className="text-[#818CF8] hover:text-[#6366F1] transition">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="card-glow p-7">
          <h2 className="font-display font-bold text-xl text-[#F5F5F7] mb-5">Quick links</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/events", label: "Browse Events", icon: Calendar },
              { href: "/projects", label: "View Projects", icon: FolderOpen },
              { href: "/blog", label: "Read Blog", icon: FolderOpen },
              { href: "/donate", label: "Donate", icon: Heart },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-[#232330] hover:border-[#6366F1]/40 hover:bg-[#6366F1]/5 transition"
              >
                <link.icon className="h-4 w-4 text-[#818CF8]" />
                <span className="text-sm font-semibold text-[#F5F5F7]">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
