"use server";

import { auth } from "@/lib/auth";
import { eventService } from "@/lib/services/eventService";
import { withResult } from "@/lib/utils";
import {
  createEventSchema,
  updateEventSchema,
  registerForEventSchema,
} from "@/validations/events";

/** Register for an event (requires auth) */
export async function registerForEventAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "You must be signed in to register" };
  }

  const userId = session.user.id;

  const parsed = registerForEventSchema.safeParse({
    eventId: formData.get("eventId"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() =>
    eventService.register(parsed.data, userId)
  );
}

/** Create event (ADMIN only) */
export async function createEventAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = createEventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    registrationDeadline: formData.get("registrationDeadline") || undefined,
    capacity: formData.get("capacity") ? Number(formData.get("capacity")) : undefined,
    prizePool: formData.get("prizePool") ? Number(formData.get("prizePool")) : undefined,
    location: formData.get("location") || undefined,
    isOnline: formData.get("isOnline") === "true",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() => eventService.create(parsed.data));
}

/** Update event (ADMIN only) */
export async function updateEventAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const data: Record<string, unknown> = {};
  formData.forEach((val, key) => {
    if (val !== "") data[key] = val;
  });

  const parsed = updateEventSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  return withResult(() => eventService.update(parsed.data));
}

/** Delete event (ADMIN only) */
export async function deleteEventAction(id: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  return withResult(() => eventService.delete(id));
}
