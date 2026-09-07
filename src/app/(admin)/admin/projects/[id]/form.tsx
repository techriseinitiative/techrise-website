"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save, ExternalLink } from "lucide-react";
import { updateProjectAction } from "@/actions/projects";
import type { Project } from "@prisma/client";

export function ProjectForm({ project }: { project?: Project }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    if (project) fd.set("id", project.id);

    startTransition(async () => {
      const { updateProjectAction, createProjectAction } = await import("@/actions/projects");
      const action = project ? updateProjectAction : createProjectAction;
      const result = await action(fd);
      if (result?.success) {
        router.push("/admin/projects");
      } else {
        setError(result?.error ?? "Failed to save project");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
      )}
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Title</label>
        <input
          name="title"
          defaultValue={project?.title ?? ""}
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Description</label>
        <textarea
          name="description"
          rows={5}
          defaultValue={project?.description ?? ""}
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">
          Cover images <span className="text-ink-400 font-normal">(comma-separated URLs)</span>
        </label>
        <input
          name="imageUrls"
          type="text"
          defaultValue={project?.imageUrls?.join(", ") ?? ""}
          placeholder="https://..., https://..."
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">External link <span className="text-ink-400 font-normal">(GitHub, demo)</span></label>
        <input
          name="externalLink"
          type="url"
          defaultValue={project?.externalLink ?? ""}
          placeholder="https://github.com/..."
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">
          Contributors <span className="text-ink-400 font-normal">(comma-separated)</span>
        </label>
        <input
          name="contributors"
          type="text"
          defaultValue={project?.contributors?.join(", ") ?? ""}
          placeholder="Aarav M., Priya S., Daniel O."
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none"
        />
      </div>
      {project && (
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Status</label>
          <select
            name="status"
            defaultValue={project.status}
            className="rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none"
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      )}
      <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ink-800 transition disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {project ? "Save changes" : "Add project"}
        </button>
        <Link href="/admin/projects" className="text-sm font-semibold text-ink-600 hover:text-ink-900">Cancel</Link>
      </div>
    </form>
  );
}
