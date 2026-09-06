import { auth } from "@/lib/auth";
import Link from "next/link";
import { Calendar, FolderOpen, ArrowRight, Heart } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-[80vh] bg-[#0A0A0F]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-14">
        <div className="mb-10">
          <p className="text-sm font-medium text-[#6B7280]">Welcome back,</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#F5F5F7]">
            Hey {name} 👋
          </h1>
          <p className="mt-2 text-[#9CA3AF]">
            Here&apos;s what&apos;s happening with your TechRise account.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="card-glow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-[#F5F5F7]">0</p>
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
                <p className="font-display font-bold text-2xl text-[#F5F5F7]">0</p>
                <p className="text-xs text-[#6B7280]">My projects</p>
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
                <p className="font-display font-bold text-2xl text-[#F5F5F7]">$0</p>
                <p className="text-xs text-[#6B7280]">Total donated</p>
              </div>
            </div>
            <Link href="/donate" className="text-sm font-semibold text-[#818CF8] hover:text-[#6366F1] flex items-center gap-1 transition">
              Donate now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="card-glow p-7">
          <h2 className="font-display font-bold text-xl text-[#F5F5F7] mb-4">Quick links</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/events", label: "Browse Events", icon: Calendar },
              { href: "/projects", label: "View Projects", icon: FolderOpen },
              { href: "/blog", label: "Read Blog", icon: Calendar },
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
