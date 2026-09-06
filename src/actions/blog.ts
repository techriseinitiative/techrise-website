"use server";

import { auth } from "@/lib/auth";
import { blogService } from "@/lib/services/blogService";
import { withResult } from "@/lib/utils";
import {
  createPostSchema,
  updatePostSchema,
} from "@/validations/blog";

/** Create blog post (ADMIN only) */
export async function createPostAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id || session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const userId = session.user.id;

  const parsed = createPostSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    coverImageUrl: formData.get("coverImageUrl") || undefined,
    status: formData.get("status") || "DRAFT",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() =>
    blogService.create(parsed.data, userId)
  );
}

/** Update blog post (ADMIN only) */
export async function updatePostAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = updatePostSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    coverImageUrl: formData.get("coverImageUrl") || undefined,
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() => blogService.update(parsed.data));
}

/** Publish a blog post (ADMIN only) */
export async function publishPostAction(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  return withResult(() => blogService.publish(id));
}

/** Delete blog post (ADMIN only) */
export async function deletePostAction(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  return withResult(() => blogService.delete(id));
}
