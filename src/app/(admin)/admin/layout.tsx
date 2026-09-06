import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, FileText, Calendar, FolderOpen, MessageSquare, Heart, Users, ChevronRight } from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog Posts", icon: FileText },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Sidebar */}
      <aside className="w-56 lg:w-64 shrink-0 bg-white border-r border-ink-200 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-ink-200">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-ink-900">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </span>
            Admin
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-100 hover:text-ink-900 transition"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-ink-200">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs font-medium text-ink-500 hover:text-ink-900 transition">
            <ChevronRight className="h-3.5 w-3.5" />
            Back to dashboard
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-5 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
