import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { UserCircle2, Mail } from "lucide-react";

export default async function AdminUsersPage() {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, name: true, email: true, role: true, createdAt: true, image: true },
    }),
    prisma.user.count(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Users</h1>
        <p className="text-sm text-ink-500 mt-1">{total.toLocaleString()} registered users</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">User</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Email</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Role</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-ink-500">No users yet.</td>
              </tr>
            ) : (
              (users as any[]).map((u: any) => (
                <tr key={u.id} className="border-b border-ink-100 hover:bg-ink-50 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {u.image ? (
                        <img src={u.image} alt={u.name} className="h-8 w-8 rounded-full" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                          {u.name[0]?.toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium text-ink-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink-600">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      u.role === "ADMIN" ? "bg-primary-50 text-primary-700 border border-primary-200" : "bg-ink-100 text-ink-700 border border-ink-200"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-500 text-xs">{formatDate(u.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
