import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const FROM_EMAIL = "TechRise <techriseinitiative53@gmail.com>";

/**
 * Email service — handles transactional emails via Resend.
 * In dev (no RESEND_API_KEY), logs the reset link to console.
 */
export const emailService = {
  /**
   * Send a password reset email. Silently no-ops for unknown emails
   * to prevent account enumeration.
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Silently succeed to prevent email enumeration
      return;
    }

    // Delete any existing tokens for this user (one active token at a time)
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate a cryptographically secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        identifier: email,
        token,
        expires,
        userId: user.id,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    await this.sendEmail({
      to: email,
      subject: "Reset your TechRise password",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1F2937;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #0F766E; margin: 0;">TechRise</h1>
          </div>
          <h2 style="color: #111827;">Reset your password</h2>
          <p>Hi ${user.name},</p>
          <p>We received a request to reset your TechRise account password. Click the button below to set a new password:</p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: #0F766E; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reset Password</a>
          </div>
          <p>Or copy this link into your browser:</p>
          <p style="word-break: break-all; color: #0F766E; background: #F3F4F6; padding: 12px; border-radius: 6px;">${resetUrl}</p>
          <p style="color: #6B7280; font-size: 13px; margin-top: 24px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password will remain unchanged.</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
          <p style="color: #9CA3AF; font-size: 12px; text-align: center;">TechRise Initiative — Empowering through technology</p>
        </div>
      `,
      text: `TechRise Password Reset\n\nHi ${user.name}, visit this link to reset your password: ${resetUrl}\n\nThis link expires in 1 hour.`,
    });
  },

  async sendEmail(opts: { to: string; subject: string; html: string; text: string }): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "re_...") {
      // Development fallback — log reset link to console
      const tokenMatch = opts.html.match(/token=([a-f0-9]+)/);
      if (tokenMatch) {
        console.log(`\n🔑 Password reset link (dev mode):`);
        console.log(`   http://localhost:3000/reset-password?token=${tokenMatch[1]}\n`);
      }
      return;
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: opts.to,
          subject: opts.subject,
          html: opts.html,
          text: opts.text,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Resend API error:", error);
      }
    } catch (err) {
      console.error("Failed to send email:", err);
    }
  },
};
