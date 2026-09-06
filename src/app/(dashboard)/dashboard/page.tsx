import { auth } from "@/lib/auth";
import Link from "next/link";
import { Calendar, FolderOpen, ArrowRight, Heart } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-[80vh] bg-ink-50">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-14">
        <div className="mb-10">
          <p className="text-sm font-medium text-ink-500">Welcome back,</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink-900">
            Hey {name} 👋
          </h1>
          <p className="mt-2 text-ink-600">
            Here's what's happening with your TechRise account.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-white rounded-2xl border border-ink-200 p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-ink-900">0</p>
                <p className="text-xs text-ink-500">Registered events</p>
              </div>
            </div>
            <Link href="/events" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Browse events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-ink-200 p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
                <FolderOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-ink-900">0</p>
                <p className="text-xs text-ink-500">My projects</p>
              </div>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View showcase <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-ink-200 p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <div>
                <p className="font-display font-bold text-2xl text-ink-900">$0</p>
                <p className="text-xs text-ink-500">Total donated</p>
              </div>
            </div>
            <Link href="/donate" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Donate now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ink-200 p-7">
          <h2 className="font-display font-bold text-xl text-ink-900 mb-4">Quick links</h2>
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
                className="flex items-center gap-2.5 p-3 rounded-xl border border-ink-200 hover:border-primary-300 hover:bg-primary-50 transition"
              >
                <link.icon className="h-4 w-4 text-primary-600" />
                <span className="text-sm font-semibold text-ink-900">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
