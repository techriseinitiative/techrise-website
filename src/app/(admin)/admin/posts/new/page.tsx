import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";

export default async function NewPostPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Write a New Post</h1>
        <p className="text-sm text-ink-500 mt-1">Create and publish a new blog post</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-8">
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">Title</label>
            <input type="text" name="title" required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">Excerpt</label>
            <input type="text" name="excerpt" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">Cover image URL</label>
            <input type="url" name="coverImageUrl" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">Content (HTML/Markdown)</label>
            <textarea name="content" rows={14} required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm font-mono focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">Status</label>
            <select name="status" className="rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ink-800 transition">
              Save post
            </button>
            <Link href="/admin/posts" className="text-sm font-semibold text-ink-600 hover:text-ink-900">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
