import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { CreateProjectInput, UpdateProjectInput } from "@/validations/projects";

export const projectService = {
  async listApproved(opts: { take?: number; category?: string } = {}) {
    const { take = 50 } = opts;
    return prisma.project.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take,
    });
  },

  async getBySlug(slug: string) {
    return prisma.project.findUnique({ where: { slug } });
  },

  async getById(id: string) {
    return prisma.project.findUnique({ where: { id } });
  },

  /** ADMIN */
  async create(input: CreateProjectInput) {
    const slug = `${slugify(input.title)}-${Date.now().toString(36)}`;
    return prisma.project.create({
      data: {
        title: input.title,
        slug,
        description: input.description,
        imageUrls: input.imageUrls,
        externalLink: input.externalLink || null,
        contributors: input.contributors,
        status: "APPROVED",
      },
    });
  },

  /** ADMIN */
  async update(input: UpdateProjectInput) {
    const { id, ...data } = input;
    return prisma.project.update({
      where: { id },
      data: {
        ...data,
        externalLink: data.externalLink === "" ? null : data.externalLink,
      },
    });
  },

  /** ADMIN */
  async delete(id: string) {
    return prisma.project.delete({ where: { id } });
  },
};
