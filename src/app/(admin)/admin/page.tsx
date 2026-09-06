import { auth } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Users, Calendar, FolderOpen, FileText, MessageSquare, Heart, TrendingUp } from "lucide-react";

export default async function AdminOverviewPage() {
  const session = await auth();

  const [userCount, eventCount, projectCount, postCount, newInquiryCount, donationStats] =
    await Promise.all([
      prisma.user.count(),
      prisma.event.count({ where: { status: "PUBLISHED" } }),
      prisma.project.count({ where: { status: "APPROVED" } }),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.donation.aggregate({
        where: { status: "SUCCEEDED" },
        _sum: { amount: true },
      }),
    ]);

  const totalDonated = (donationStats._sum.amount ?? 0) / 100;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-ink-500">Welcome back,</p>
        <h1 className="font-display font-bold text-3xl text-ink-900">
          {session?.user?.name ?? "Admin"}
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Users", value: userCount.toLocaleString(), icon: Users, color: "from-primary-500 to-primary-700" },
          { label: "Published Events", value: eventCount, icon: Calendar, color: "from-accent-500 to-accent-700" },
          { label: "Approved Projects", value: projectCount, icon: FolderOpen, color: "from-emerald-500 to-emerald-700" },
          { label: "Blog Posts", value: postCount, icon: FileText, color: "from-violet-500 to-violet-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-ink-200 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-ink-500">{s.label}</span>
              <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="font-display font-bold text-3xl text-ink-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-ink-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-ink-900">Donations</h2>
            <Link href="/admin/donations" className="text-xs font-semibold text-primary-600 hover:underline">View all</Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-ink-900">${totalDonated.toLocaleString()}</p>
              <p className="text-xs text-ink-500">Total raised</p>
            </div>
          </div>
          <Link href="/admin/donations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
            <TrendingUp className="h-4 w-4" /> View donation history
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-ink-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-ink-900">Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs font-semibold text-primary-600 hover:underline">View all</Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-ink-900">{newInquiryCount}</p>
              <p className="text-xs text-ink-500">New inquiries</p>
            </div>
          </div>
          <Link href="/admin/inquiries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
            Manage inquiries
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-6">
        <h2 className="font-display font-bold text-lg text-ink-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/admin/posts", label: "Write a post", icon: FileText },
            { href: "/admin/events", label: "Create event", icon: Calendar },
            { href: "/admin/projects", label: "Add project", icon: FolderOpen },
            { href: "/admin/users", label: "Manage users", icon: Users },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center gap-3 p-3 rounded-xl border border-ink-200 hover:border-primary-300 hover:bg-primary-50 transition"
            >
              <a.icon className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-semibold text-ink-900">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
