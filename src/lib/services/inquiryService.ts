import { prisma } from "@/lib/prisma";
import type {
  SubmitInquiryInput,
  UpdateInquiryStatusInput,
} from "@/validations/inquiry";

export const inquiryService = {
  async submit(input: SubmitInquiryInput, userId?: string) {
    return prisma.inquiry.create({
      data: {
        name: input.name,
        email: input.email,
        message: input.message,
        reason: input.reason,
        userId: userId ?? null,
        status: "NEW",
      },
    });
  },

  async list(opts: { status?: "NEW" | "READ" | "RESOLVED" } = {}) {
    return prisma.inquiry.findMany({
      where: opts.status ? { status: opts.status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  },

  async countNew() {
    return prisma.inquiry.count({ where: { status: "NEW" } });
  },

  /** ADMIN */
  async updateStatus(input: UpdateInquiryStatusInput) {
    return prisma.inquiry.update({
      where: { id: input.id },
      data: { status: input.status },
    });
  },

  /** ADMIN */
  async delete(id: string) {
    return prisma.inquiry.delete({ where: { id } });
  },
};
