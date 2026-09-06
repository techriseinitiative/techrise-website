import { z } from "zod";

export const createDonationCheckoutSchema = z.object({
  amount: z.number().int().min(100, "Minimum donation is $1.00").max(1_000_000, "Maximum donation is $10,000"),
  donorName: z.string().min(2).max(100).optional(),
  donorEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  isRecurring: z.boolean().default(false),
  message: z.string().max(1000).optional(),
});

export type CreateDonationCheckoutInput = z.infer<typeof createDonationCheckoutSchema>;
