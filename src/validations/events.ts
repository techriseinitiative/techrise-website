import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["EVENT", "COMPETITION"]),
  startDate: z.string().datetime("Invalid start date"),
  endDate: z.string().datetime("Invalid end date"),
  registrationDeadline: z.string().datetime("Invalid deadline").optional(),
  capacity: z.number().int().positive("Capacity must be a positive number").optional(),
  prizePool: z.number().int().positive().optional(),
  location: z.string().max(200).optional(),
  isOnline: z.boolean().default(true),
});

export const updateEventSchema = createEventSchema.partial().extend({
  id: z.string().cuid("Invalid event ID"),
});

export const deleteEventSchema = z.object({
  id: z.string().cuid("Invalid event ID"),
});

export const registerForEventSchema = z.object({
  eventId: z.string().cuid("Invalid event ID"),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type RegisterForEventInput = z.infer<typeof registerForEventSchema>;
