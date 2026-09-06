import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Heart, TrendingUp, Users, DollarSign } from "lucide-react";

export default async function AdminDonationsPage() {
  const [donations, stats] = await Promise.all([
    prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.donation.aggregate({
      where: { status: "SUCCEEDED" },
      _sum: { amount: true },
      _count: true,
    }),
  ]);

  const totalCents = stats._sum.amount ?? 0;
  const last30Days = await prisma.donation.aggregate({
    where: {
      status: "SUCCEEDED",
      createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    },
    _sum: { amount: true },
    _count: true,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Donations</h1>
        <p className="text-sm text-ink-500 mt-1">Track donations and fundraising performance</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-ink-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink-500">Total raised</span>
            <DollarSign className="h-4 w-4 text-success" />
          </div>
          <p className="font-display font-bold text-2xl text-ink-900">{formatCurrency(totalCents)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-ink-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink-500">Last 30 days</span>
            <TrendingUp className="h-4 w-4 text-primary-600" />
          </div>
          <p className="font-display font-bold text-2xl text-ink-900">{formatCurrency(last30Days._sum.amount ?? 0)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-ink-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink-500">Donations</span>
            <Users className="h-4 w-4 text-accent-500" />
          </div>
          <p className="font-display font-bold text-2xl text-ink-900">{stats._count.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Donor</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Amount</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Status</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Type</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-ink-500">
                  No donations yet.
                </td>
              </tr>
            ) : (
              (donations as any[]).map((d: any) => (
                <tr key={d.id} className="border-b border-ink-100 hover:bg-ink-50 transition">
                  <td className="px-5 py-3">
                    <p className="font-medium text-ink-900">
                      {d.user?.name ?? d.donorName ?? "Anonymous"}
                    </p>
                    <p className="text-xs text-ink-500">{d.user?.email ?? d.donorEmail ?? "—"}</p>
                  </td>
                  <td className="px-5 py-3 font-bold text-ink-900">{formatCurrency(d.amount, d.currency)}</td>
                  <td className="px-5 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-5 py-3 text-ink-600 text-xs">{d.isRecurring ? "Monthly" : "One-time"}</td>
                  <td className="px-5 py-3 text-ink-500 text-xs">{formatDate(d.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
