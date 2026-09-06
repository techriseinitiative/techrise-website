"use server";

import { auth } from "@/lib/auth";
import { projectService } from "@/lib/services/projectService";
import { withResult } from "@/lib/utils";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/validations/projects";

/** Create project (ADMIN only) */
export async function createProjectAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = createProjectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    imageUrls: formData.get("imageUrls")
      ? String(formData.get("imageUrls")).split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    externalLink: formData.get("externalLink") || undefined,
    contributors: String(formData.get("contributors") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() => projectService.create(parsed.data));
}

/** Update project (ADMIN only) */
export async function updateProjectAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = updateProjectSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    externalLink: formData.get("externalLink") || undefined,
    contributors: String(formData.get("contributors") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() => projectService.update(parsed.data));
}

/** Delete project (ADMIN only) */
export async function deleteProjectAction(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  return withResult(() => projectService.delete(id));
}
