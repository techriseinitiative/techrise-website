"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save } from "lucide-react";
import { createPostAction } from "@/actions/blog";

export function CreatePostForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createPostAction(fd);
      if (result?.success) {
        router.push("/admin/posts");
      } else {
        setError(result?.error ?? "Failed to create post");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Title</label>
        <input
          type="text"
          name="title"
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Excerpt <span className="text-ink-400 font-normal">(optional)</span></label>
        <input
          type="text"
          name="excerpt"
          maxLength={500}
          placeholder="Brief summary shown in listings..."
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Cover image URL <span className="text-ink-400 font-normal">(optional)</span></label>
        <input
          type="url"
          name="coverImageUrl"
          placeholder="https://..."
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">
          Content <span className="text-ink-400 font-normal">(HTML)</span> <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          rows={14}
          required
          placeholder="<h2>Your heading</h2><p>Your content here...</p>"
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Status</label>
        <select
          name="status"
          defaultValue="DRAFT"
          className="rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ink-800 transition disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save post
        </button>
        <Link href="/admin/posts" className="text-sm font-semibold text-ink-600 hover:text-ink-900">Cancel</Link>
      </div>
    </form>
  );
}
