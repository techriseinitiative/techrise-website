/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

type RecordValue = Record<string, any>;

/**
 * Prisma client singleton — prevents multiple instances in development
 * due to Next.js hot reloading.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const hasPlaceholderDatabase =
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.includes("user:password@host");

function matchesWhere(item: RecordValue, where?: RecordValue) {
  if (!where) return true;
  return Object.entries(where).every(([key, value]) => {
    if (value && typeof value === "object" && "in" in value) {
      return value.in.includes(item[key]);
    }
    if (value && typeof value === "object" && "contains" in value) {
      return String(item[key] ?? "").includes(String(value.contains));
    }
    return item[key] === value;
  });
}

function createMockPrisma() {
  const stores: Record<string, RecordValue[]> = {
    user: [],
    event: [],
    eventRegistration: [],
    project: [],
    blogPost: [],
    inquiry: [],
    donation: [],
    passwordResetToken: [],
    account: [],
    session: [],
    verificationToken: [],
  };
  let id = 0;
  const now = () => new Date();
  const nextId = () => `mock_${++id}`;

  stores.user.push({
    id: "admin1",
    name: "Admin User",
    email: "admin@techrise.example",
    passwordHash: hashSync("password123", 10),
    role: "ADMIN",
    image: null,
    bio: "TechRise Initiative administrator",
    createdAt: now(),
    updatedAt: now(),
  });

  stores.event.push(
    {
      id: "evt1",
      title: "Spring Buildathon 2026",
      slug: "spring-buildathon-2026",
      description: "48 hours. 12 tracks. Build something that matters.",
      type: "EVENT",
      startDate: new Date("2026-03-15"),
      endDate: new Date("2026-03-17"),
      registrationDeadline: new Date("2026-03-14"),
      capacity: 1000,
      status: "PUBLISHED",
      prizePool: 2500000,
      location: "Online - Global",
      isOnline: true,
      createdAt: now(),
      updatedAt: now(),
      _count: { registrations: 847 },
    },
    {
      id: "evt2",
      title: "AI for Good Challenge",
      slug: "ai-for-good-challenge",
      description: "Ship AI products that address real social problems.",
      type: "COMPETITION",
      startDate: new Date("2026-04-05"),
      endDate: new Date("2026-06-01"),
      registrationDeadline: null,
      capacity: 500,
      status: "PUBLISHED",
      prizePool: 5000000,
      location: "Hybrid - 12 cities",
      isOnline: false,
      createdAt: now(),
      updatedAt: now(),
      _count: { registrations: 312 },
    }
  );

  stores.blogPost.push({
    id: "post1",
    title: "TechRise 2025 Year in Review",
    slug: "techrise-2025-year-in-review",
    excerpt: "A look back at everything we shipped together last year.",
    content: "<p>Full content here...</p>",
    coverImageUrl: null,
    authorId: "admin1",
    status: "PUBLISHED",
    publishedAt: new Date("2026-01-01"),
    createdAt: now(),
    updatedAt: now(),
    author: { id: "admin1", name: "Admin User", image: null, bio: null },
  });

  stores.donation.push({
    id: "don1",
    userId: null,
    amount: 5000,
    currency: "usd",
    status: "SUCCEEDED",
    donorName: "Aarav Mehta",
    donorEmail: "aarav@example.com",
    isRecurring: false,
    createdAt: now(),
    updatedAt: now(),
  });

  const model = (name: string) => ({
    findMany: async (options?: RecordValue) => {
      let result = stores[name].filter((item) => matchesWhere(item, options?.where));
      const order = options?.orderBy && Object.entries(options.orderBy)[0];
      if (order) {
        const [key, direction] = order;
        result = [...result].sort((a, b) => {
          const comparison = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
          return direction === "asc" ? comparison : -comparison;
        });
      }
      if (options?.skip) result = result.slice(options.skip);
      if (options?.take !== undefined) result = result.slice(0, options.take);
      return result;
    },
    findUnique: async (options: RecordValue) =>
      stores[name].find((item) => matchesWhere(item, options?.where)) ?? null,
    create: async (options: RecordValue) => {
      const item = { ...options.data, id: options.data.id ?? nextId(), createdAt: now(), updatedAt: now() };
      stores[name].push(item);
      return item;
    },
    update: async (options: RecordValue) => {
      const item = stores[name].find((entry) => matchesWhere(entry, options.where));
      if (!item) throw new Error(`Record not found in ${name}`);
      Object.assign(item, options.data, { updatedAt: now() });
      return item;
    },
    delete: async (options: RecordValue) => {
      const index = stores[name].findIndex((item) => matchesWhere(item, options.where));
      if (index >= 0) return stores[name].splice(index, 1)[0];
      return null;
    },
    deleteMany: async (options?: RecordValue) => {
      const before = stores[name].length;
      stores[name] = stores[name].filter((item) => !matchesWhere(item, options?.where));
      return { count: before - stores[name].length };
    },
    count: async (options?: RecordValue) => stores[name].filter((item) => matchesWhere(item, options?.where)).length,
    aggregate: async (options: RecordValue) => {
      const items = stores[name].filter((item) => matchesWhere(item, options?.where));
      const sum: RecordValue = {};
      for (const key of Object.keys(options?._sum ?? {})) {
        sum[key] = items.reduce((total, item) => total + (typeof item[key] === "number" ? item[key] : 0), 0);
      }
      return { _sum: sum, _count: items.length };
    },
  });

  return {
    user: model("user"),
    event: model("event"),
    eventRegistration: model("eventRegistration"),
    project: model("project"),
    blogPost: model("blogPost"),
    inquiry: model("inquiry"),
    donation: model("donation"),
    passwordResetToken: model("passwordResetToken"),
    account: model("account"),
    session: model("session"),
    verificationToken: model("verificationToken"),
  };
}

const realPrisma =
  globalForPrisma.prisma ??
  (hasPlaceholderDatabase
    ? createMockPrisma()
    : new PrismaClient({ log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"] }));

globalForPrisma.prisma = realPrisma as PrismaClient;
export const prisma = realPrisma as PrismaClient;
