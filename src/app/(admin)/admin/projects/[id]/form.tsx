"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { createProjectAction, updateProjectAction } from "@/actions/projects";
import { useState } from "react";
import type { Project } from "@prisma/client";

export function ProjectForm({ project }: { project?: Project }) {
  const [pending, startTransition] = useTransition();
  const [contributors, setContributors] = useState<string[]>(
    project?.contributors ?? [""]
  );
  const [imageUrls, setImageUrls] = useState<string[]>(
    project?.imageUrls ?? [""]
  );
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Join arrays back to comma-separated strings for the action
    fd.set("contributors", contributors.filter(Boolean).join(","));
    fd.set("imageUrls", imageUrls.filter(Boolean).join(","));
    if (project) fd.set("id", project.id);

    const action = project ? updateProjectAction : createProjectAction;
    startTransition(async () => {
      const result = await action(fd);
      if (result?.success) {
        router.push("/admin/projects");
      } else {
        alert(result?.error || "Failed to save project");
      }
    });
  };

  const addContributor = () => setContributors((c) => [...c, ""]);
  const removeContributor = (i: number) =>
    setContributors((c) => c.filter((_, idx) => idx !== i));
  const updateContributor = (i: number, val: string) =>
    setContributors((c) => c.map((x, idx) => (idx === i ? val : x)));

  const addImage = () => setImageUrls((urls) => [...urls, ""]);
  const removeImage = (i: number) =>
    setImageUrls((urls) => urls.filter((_, idx) => idx !== i));
  const updateImage = (i: number, val: string) =>
    setImageUrls((urls) => urls.map((x, idx) => (idx === i ? val : x)));

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Title</label>
        <input
          name="title"
          defaultValue={project?.title ?? ""}
          required
          placeholder="e.g. AquaSense"
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Description</label>
        <textarea
          name="description"
          defaultValue={project?.description ?? ""}
          rows={4}
          required
          placeholder="What does this project do?"
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition resize-none"
        />
      </div>

      {/* Contributors */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-ink-700">Contributors</label>
          <button
            type="button"
            onClick={addContributor}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {contributors.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={c}
                onChange={(e) => updateContributor(i, e.target.value)}
                placeholder="Full name"
                className="flex-1 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-sm focus:border-primary-500 outline-none transition"
              />
              {contributors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContributor(i)}
                  className="p-1.5 rounded hover:bg-[#F87171]/10 text-ink-400 hover:text-[#F87171] transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-400 mt-1.5">Add each contributor&apos;s full name</p>
      </div>

      {/* Image URLs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-ink-700">Image URLs</label>
          <button
            type="button"
            onClick={addImage}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition"
          >
            <Plus className="h-3.5 w-3.5" /> Add image
          </button>
        </div>
        <div className="space-y-2">
          {imageUrls.map((url, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateImage(i, e.target.value)}
                placeholder="https://..."
                className="flex-1 rounded-lg border border-ink-200 bg-white px-3.5 py-2 text-sm focus:border-primary-500 outline-none transition"
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 rounded hover:bg-[#F87171]/10 text-ink-400 hover:text-[#F87171] transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-400 mt-1.5">Enter image URLs for the project showcase</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">External link (GitHub / demo)</label>
        <input
          type="url"
          name="externalLink"
          defaultValue={project?.externalLink ?? ""}
          placeholder="https://github.com/..."
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ink-800 transition disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {project ? "Save changes" : "Create project"}
        </button>
        <Link href="/admin/projects" className="text-sm font-semibold text-ink-600 hover:text-ink-900">Cancel</Link>
      </div>
    </form>
  );
}
