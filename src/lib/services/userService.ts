import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { SignUpInput } from "@/validations/auth";

/**
 * User service — only place that talks to User model directly.
 * Auth/role checks enforced here, not in UI.
 */
export const userService = {
  async createUser(input: SignUpInput) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existing) throw new Error("An account with this email already exists");

    const passwordHash = await hash(input.password, 12);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: "USER",
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return user;
  },

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        bio: true,
        createdAt: true,
      },
    });
  },

  async updateUserPassword(userId: string, newPassword: string) {
    const passwordHash = await hash(newPassword, 12);
    return prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
      select: { id: true },
    });
  },

  async listUsers(opts: { skip?: number; take?: number; search?: string } = {}) {
    const { skip = 0, take = 20, search } = opts;
    return prisma.user.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  async countUsers() {
    return prisma.user.count();
  },

  /**
   * Reset a user's password using a valid token.
   * The token is invalidated after use.
   */
  async resetPassword(token: string, newPassword: string) {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      throw new Error("Invalid or expired reset link");
    }

    if (resetToken.expires < new Date()) {
      // Clean up expired token
      await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
      throw new Error("This reset link has expired");
    }

    await this.updateUserPassword(resetToken.userId, newPassword);

    // Invalidate the used token
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return { success: true };
  },
};
