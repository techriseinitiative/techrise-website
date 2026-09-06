import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogService } from "@/lib/services/blogService";
import { EditPostForm } from "./form";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await blogService.getById(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Edit Post</h1>
        <p className="text-sm text-ink-500 mt-1">Update blog post</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-8">
        <EditPostForm post={post} />
      </div>
    </div>
  );
}
