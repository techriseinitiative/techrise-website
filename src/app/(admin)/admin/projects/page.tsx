import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { DeleteProjectButton } from "./delete-button";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ink-900">Project Showcase</h1>
          <p className="text-sm text-ink-500 mt-1">Manage community projects featured on the site</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ink-800 transition"
        >
          <Plus className="h-4 w-4" /> New project
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Title</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Contributors</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Status</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Created</th>
              <th className="text-right px-5 py-3 font-semibold text-ink-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-ink-500">
                  No projects yet. Add your first one!
                </td>
              </tr>
            ) : (
              (projects as any[]).map((p: any) => (
                <tr key={p.id} className="border-b border-ink-100 hover:bg-ink-50 transition">
                  <td className="px-5 py-3 font-medium text-ink-900">
                    <div className="flex items-center gap-2">
                      {p.title}
                      {p.externalLink && (
                        <a href={p.externalLink} target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-ink-700">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink-600">{p.contributors.length}</td>
                  <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-3 text-ink-500 text-xs">{formatDate(p.createdAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${p.id}`} className="p-1.5 rounded hover:bg-ink-100 text-ink-600 hover:text-ink-900">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <DeleteProjectButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
