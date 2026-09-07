import { CreatePostForm } from "./form";

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Write a New Post</h1>
        <p className="text-sm text-ink-500 mt-1">Create and publish a new blog post</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-8">
        <CreatePostForm />
      </div>
    </div>
  );
}
