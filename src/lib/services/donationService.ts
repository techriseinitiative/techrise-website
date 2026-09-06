import { prisma } from "@/lib/prisma";
import type { CreateDonationCheckoutInput } from "@/validations/donation";

export const donationService = {
  /**
   * Create a pending donation record.
   * Stripe session creation happens in the action layer.
   */
  async createPending(input: {
    userId?: string;
    amount: number;
    donorName?: string;
    donorEmail?: string;
    isRecurring?: boolean;
    message?: string;
    stripeSessionId: string;
  }) {
    return prisma.donation.create({
      data: {
        userId: input.userId ?? null,
        amount: input.amount,
        currency: "usd",
        status: "PENDING",
        donorName: input.donorName,
        donorEmail: input.donorEmail,
        isRecurring: input.isRecurring ?? false,
        message: input.message,
        stripeSessionId: input.stripeSessionId,
      },
    });
  },

  /** Called by Stripe webhook on success */
  async markSucceeded(stripeSessionId: string, stripePaymentIntentId: string) {
    return prisma.donation.update({
      where: { stripeSessionId },
      data: {
        status: "SUCCEEDED",
        stripePaymentIntentId,
      },
    });
  },

  /** Called by Stripe webhook on failure */
  async markFailed(stripeSessionId: string) {
    return prisma.donation.update({
      where: { stripeSessionId },
      data: { status: "FAILED" },
    });
  },

  async list(opts: { take?: number } = {}) {
    const { take = 50 } = opts;
    return prisma.donation.findMany({
      where: { status: "SUCCEEDED" },
      orderBy: { createdAt: "desc" },
      take,
      include: {
        user: { select: { id: true, name: true } },
      },
    });
  },

  async getStats() {
    const [total, count, monthAgg] = await Promise.all([
      prisma.donation.aggregate({
        where: { status: "SUCCEEDED" },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.donation.count({ where: { status: "SUCCEEDED" } }),
      prisma.donation.aggregate({
        where: {
          status: "SUCCEEDED",
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalCents: total._sum.amount ?? 0,
      count,
      monthlyCents: monthAgg._sum.amount ?? 0,
    };
  },
};
