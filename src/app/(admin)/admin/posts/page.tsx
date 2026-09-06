import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Plus, Edit, Trash2 } from "lucide-react";
import { DeletePostButton } from "./delete-button";

export default async function AdminPostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ink-900">Blog Posts</h1>
          <p className="text-sm text-ink-500 mt-1">Manage blog posts and articles</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ink-800 transition"
        >
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Title</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Author</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Status</th>
              <th className="text-left px-5 py-3 font-semibold text-ink-700">Published</th>
              <th className="text-right px-5 py-3 font-semibold text-ink-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-ink-500">
                  No blog posts yet. Create your first one!
                </td>
              </tr>
            ) : (
              (posts as any[]).map((post: any) => (
                <tr key={post.id} className="border-b border-ink-100 hover:bg-ink-50 transition">
                  <td className="px-5 py-3 font-medium text-ink-900">{post.title}</td>
                  <td className="px-5 py-3 text-ink-600">{post.author.name}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-5 py-3 text-ink-500 text-xs">
                    {post.publishedAt ? formatDate(post.publishedAt) : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="p-1.5 rounded hover:bg-ink-100 text-ink-600 hover:text-ink-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <DeletePostButton id={post.id} />
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
