import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type {
  CreateEventInput,
  RegisterForEventInput,
  UpdateEventInput,
} from "@/validations/events";

/**
 * Event service — business logic for events/competitions.
 */
export const eventService = {
  async listPublished(opts: { type?: "EVENT" | "COMPETITION"; take?: number } = {}) {
    const { type, take = 50 } = opts;
    return prisma.event.findMany({
      where: {
        status: "PUBLISHED",
        ...(type ? { type } : {}),
      },
      orderBy: { startDate: "asc" },
      take,
      include: {
        _count: { select: { registrations: true } },
      },
    });
  },

  async getBySlug(slug: string) {
    return prisma.event.findUnique({
      where: { slug },
      include: {
        _count: { select: { registrations: true } },
      },
    });
  },

  async getById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        _count: { select: { registrations: true } },
      },
    });
  },

  /** ADMIN only */
  async create(input: CreateEventInput) {
    const slug = `${slugify(input.title)}-${Date.now().toString(36)}`;
    return prisma.event.create({
      data: {
        title: input.title,
        slug,
        description: input.description,
        type: input.type,
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
        registrationDeadline: input.registrationDeadline
          ? new Date(input.registrationDeadline)
          : null,
        capacity: input.capacity ?? null,
        prizePool: input.prizePool ?? null,
        location: input.location,
        isOnline: input.isOnline,
        status: "DRAFT",
      },
    });
  },

  /** ADMIN only */
  async update(input: UpdateEventInput) {
    const { id, ...data } = input;
    return prisma.event.update({
      where: { id },
      data: {
        ...data,
        ...(data.startDate ? { startDate: new Date(data.startDate) } : {}),
        ...(data.endDate ? { endDate: new Date(data.endDate) } : {}),
        ...(data.registrationDeadline !== undefined
          ? { registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : null }
          : {}),
      },
    });
  },

  /** ADMIN only */
  async delete(id: string) {
    return prisma.event.delete({ where: { id } });
  },

  async register(input: RegisterForEventInput, userId: string) {
    const event = await prisma.event.findUnique({
      where: { id: input.eventId },
      include: { _count: { select: { registrations: { where: { status: "CONFIRMED" } } } } },
    });
    if (!event) throw new Error("Event not found");
    if (event.status !== "PUBLISHED") throw new Error("Event is not open for registration");

    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      throw new Error("Registration deadline has passed");
    }

    const existing = await prisma.eventRegistration.findUnique({
      where: { userId_eventId: { userId, eventId: event.id } },
    });
    if (existing && existing.status !== "CANCELLED") {
      throw new Error("You are already registered for this event");
    }

    const isFull =
      event.capacity !== null && event._count.registrations >= event.capacity;

    if (existing) {
      return prisma.eventRegistration.update({
        where: { id: existing.id },
        data: { status: isFull ? "WAITLISTED" : "CONFIRMED" },
      });
    }

    return prisma.eventRegistration.create({
      data: {
        userId,
        eventId: event.id,
        status: isFull ? "WAITLISTED" : "CONFIRMED",
      },
    });
  },

  async cancelRegistration(input: RegisterForEventInput, userId: string) {
    const reg = await prisma.eventRegistration.findUnique({
      where: { userId_eventId: { userId, eventId: input.eventId } },
    });
    if (!reg) throw new Error("Registration not found");

    return prisma.eventRegistration.update({
      where: { id: reg.id },
      data: { status: "CANCELLED" },
    });
  },

  async getUserRegistrations(userId: string) {
    return prisma.eventRegistration.findMany({
      where: { userId },
      include: { event: true },
      orderBy: { registeredAt: "desc" },
    });
  },
};
