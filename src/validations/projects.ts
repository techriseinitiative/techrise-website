import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrls: z.array(z.string().url("Invalid image URL")).default([]),
  externalLink: z.string().url("Invalid link URL").optional().or(z.literal("")),
  contributors: z.array(z.string().min(1)).min(1, "At least one contributor required"),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string().cuid("Invalid project ID"),
});

export const deleteProjectSchema = z.object({
  id: z.string().cuid("Invalid project ID"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
