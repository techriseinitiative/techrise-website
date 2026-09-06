import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { CreatePostInput, UpdatePostInput } from "@/validations/blog";

export const blogService = {
  async listPublished(opts: { take?: number; skip?: number } = {}) {
    const { take = 12, skip = 0 } = opts;
    return prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take,
      skip,
      include: {
        author: { select: { id: true, name: true, image: true } },
      },
    });
  },

  async listAll() {
    return prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, name: true, image: true } },
      },
    });
  },

  async getBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true, image: true, bio: true } },
      },
    });
  },

  async getById(id: string) {
    return prisma.blogPost.findUnique({ where: { id } });
  },

  /** ADMIN */
  async create(input: CreatePostInput, authorId: string) {
    const slug = `${slugify(input.title)}-${Date.now().toString(36)}`;
    return prisma.blogPost.create({
      data: {
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        coverImageUrl: input.coverImageUrl || null,
        status: input.status,
        authorId,
        publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      },
    });
  },

  /** ADMIN */
  async update(input: UpdatePostInput) {
    const { id, ...data } = input;
    return prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        coverImageUrl: data.coverImageUrl === "" ? null : data.coverImageUrl,
      },
    });
  },

  /** ADMIN */
  async publish(id: string) {
    return prisma.blogPost.update({
      where: { id },
      data: { status: "PUBLISHED", publishedAt: new Date() },
    });
  },

  /** ADMIN */
  async unpublish(id: string) {
    return prisma.blogPost.update({
      where: { id },
      data: { status: "DRAFT", publishedAt: null },
    });
  },

  /** ADMIN */
  async delete(id: string) {
    return prisma.blogPost.delete({ where: { id } });
  },
};
