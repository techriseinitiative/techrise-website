import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(300),
  excerpt: z.string().max(500, "Excerpt must be under 500 characters").optional(),
  content: z.string().min(20, "Content must be at least 20 characters"),
  coverImageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().cuid("Invalid post ID"),
});

export const deletePostSchema = z.object({
  id: z.string().cuid("Invalid post ID"),
});

export const publishPostSchema = z.object({
  id: z.string().cuid("Invalid post ID"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type PublishPostInput = z.infer<typeof publishPostSchema>;
