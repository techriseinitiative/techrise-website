import { z } from "zod";

export const submitInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  reason: z
    .enum(["learner", "mentor", "sponsor", "press", "other"])
    .optional(),
});

export const updateInquiryStatusSchema = z.object({
  id: z.string().cuid("Invalid inquiry ID"),
  status: z.enum(["NEW", "READ", "RESOLVED"]),
});

export type SubmitInquiryInput = z.infer<typeof submitInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
