"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save, Eye } from "lucide-react";
import { updatePostAction, publishPostAction } from "@/actions/blog";
import type { BlogPost } from "@prisma/client";

export function EditPostForm({ post }: { post: BlogPost }) {
  const [pending, startTransition] = useTransition();
  const [publishing, startPublish] = useTransition();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("id", post.id);
    startTransition(async () => {
      const result = await updatePostAction(fd);
      if (result?.success) {
        router.push("/admin/posts");
      } else {
        alert(result?.error || "Failed to update post");
      }
    });
  };

  const onPublish = () => {
    startPublish(async () => {
      const result = await publishPostAction(post.id);
      if (result?.success) {
        router.refresh();
      } else {
        alert(result?.error || "Failed to publish post");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={post.title}
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Excerpt</label>
        <input
          type="text"
          name="excerpt"
          defaultValue={post.excerpt ?? ""}
          maxLength={500}
          placeholder="Brief summary shown in listings..."
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Cover image URL</label>
        <input
          type="url"
          name="coverImageUrl"
          defaultValue={post.coverImageUrl ?? ""}
          placeholder="https://..."
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Content (HTML/Markdown)</label>
        <textarea
          name="content"
          defaultValue={post.content}
          rows={14}
          required
          className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Status</label>
        <select
          name="status"
          defaultValue={post.status}
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
          Save changes
        </button>
        {post.status !== "PUBLISHED" && (
          <button
            type="button"
            onClick={onPublish}
            disabled={publishing}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition disabled:opacity-50"
          >
            {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            Publish now
          </button>
        )}
        <Link href="/admin/posts" className="text-sm font-semibold text-ink-600 hover:text-ink-900 ml-2">Cancel</Link>
      </div>
    </form>
  );
}
