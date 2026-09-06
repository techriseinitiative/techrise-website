/**
 * Lightweight in-memory Prisma mock for development/demo.
 * Replace with real Prisma client once database is connected:
 *   import { PrismaClient } from "@prisma/client";
 *   export const prisma = new PrismaClient();
 */

type AnyRecord = Record<string, unknown>;

interface MockQueryOpts {
  where?: AnyRecord;
  orderBy?: AnyRecord;
  skip?: number;
  take?: number;
  include?: AnyRecord;
}

class InMemoryStore {
  private stores: Record<string, AnyRecord[]> = {};
  private idCounter = 0;
  private uid() { return `mock_${++this.idCounter}`; }

  query(model: string, opts?: MockQueryOpts): AnyRecord[] {
    let items = [...(this.stores[model] ?? [])];
    if (opts?.where) {
      items = items.filter(item =>
        Object.entries(opts.where!).every(([k, v]) => item[k] === v)
      );
    }
    if (opts?.orderBy) {
      const key = Object.keys(opts.orderBy)[0];
      const dir = opts.orderBy[key] === "asc" ? 1 : -1;
      items.sort((a, b) => {
        const av = (a as AnyRecord)[key] as string | number;
        const bv = (b as AnyRecord)[key] as string | number;
        return av < bv ? -dir : dir;
      });
    }
    if (opts?.skip) items = items.slice(opts.skip);
    if (opts?.take !== undefined) items = items.slice(0, opts.take);
    return items;
  }

  findUnique(model: string, where: AnyRecord): AnyRecord | null {
    return this.stores[model]?.find(item =>
      Object.entries(where).every(([k, v]) => item[k] === v)
    ) ?? null;
  }

  create(model: string, data: AnyRecord): AnyRecord {
    const item = { ...data, id: data.id ?? this.uid() };
    if (!this.stores[model]) this.stores[model] = [];
    this.stores[model].push(item);
    return item;
  }

  update(model: string, where: AnyRecord, data: AnyRecord): AnyRecord {
    const idx = this.stores[model]?.findIndex(item =>
      Object.entries(where).every(([k, v]) => item[k] === v)
    ) ?? -1;
    if (idx === -1) throw new Error(`Not found: ${model}`);
    Object.assign(this.stores[model][idx], data);
    return this.stores[model][idx];
  }

  delete(model: string, where: AnyRecord): void {
    const idx = this.stores[model]?.findIndex(item =>
      Object.entries(where).every(([k, v]) => item[k] === v)
    ) ?? -1;
    if (idx !== -1) this.stores[model].splice(idx, 1);
  }

  count(model: string, where?: AnyRecord): number {
    if (!where) return this.stores[model]?.length ?? 0;
    return this.stores[model]?.filter(item =>
      Object.entries(where).every(([k, v]) => item[k] === v)
    ).length ?? 0;
  }

  aggregate(model: string, where: AnyRecord, agg: AnyRecord): AnyRecord {
    const items = where
      ? (this.stores[model]?.filter(item =>
          Object.entries(where).every(([k, v]) => item[k] === v)
        ) ?? [])
      : (this.stores[model] ?? []);

    const result: AnyRecord = {};
    if (agg._sum) {
      for (const key of Object.keys(agg._sum)) {
        result[`_${key}`] = items.reduce((sum, item) => {
          const val = item[key];
          return sum + (typeof val === "number" ? val : 0);
        }, 0);
      }
    }
    if (agg._count) result._count = items.length;
    return result;
  }
}

// Model wrapper with chainable query builder (returns typed as 'any')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeModel(store: InMemoryStore, name: string): any {
  return {
    findMany: (opts?: MockQueryOpts) => store.query(name, opts),
    findUnique: (where: AnyRecord) => store.findUnique(name, where),
    create: (data: AnyRecord) => store.create(name, data),
    update: (where: AnyRecord, data: AnyRecord) => store.update(name, where, data),
    delete: (where: AnyRecord) => store.delete(name, where),
    count: (where?: AnyRecord) => store.count(name, where),
    aggregate: (where: AnyRecord, agg: AnyRecord) => store.aggregate(name, where, agg),
  };
}

function createPrismaClient() {
  const store = new InMemoryStore();

  // Seed demo data
  store.create("user", {
    id: "admin1",
    name: "Admin User",
    email: "admin@techrise.example",
    passwordHash: "$2a$12$dummy_hash_for_demo",
    role: "ADMIN",
    image: null,
    bio: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  store.create("event", {
    id: "evt1",
    title: "Spring Buildathon 2026",
    slug: "spring-buildathon-2026",
    description: "48 hours. 12 tracks. Build something that matters.",
    type: "EVENT",
    startDate: new Date("2026-03-15"),
    endDate: new Date("2026-03-17"),
    registrationDeadline: new Date("2026-03-14"),
    capacity: 1000,
    bannerImageUrl: null,
    status: "PUBLISHED",
    prizePool: 2500000,
    location: "Online · Global",
    isOnline: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { registrations: 847 },
  });

  store.create("event", {
    id: "evt2",
    title: "AI for Good Challenge",
    slug: "ai-for-good-challenge",
    description: "8-week competition to ship AI products that address social problems.",
    type: "COMPETITION",
    startDate: new Date("2026-04-05"),
    endDate: new Date("2026-06-01"),
    registrationDeadline: null,
    capacity: 500,
    bannerImageUrl: null,
    status: "PUBLISHED",
    prizePool: 5000000,
    location: "Hybrid · 12 cities",
    isOnline: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { registrations: 312 },
  });

  store.create("blogPost", {
    id: "post1",
    title: "TechRise 2025 Year in Review",
    slug: "techrise-2025-year-in-review",
    excerpt: "A look back at everything we shipped together last year.",
    content: "<p>Full content here...</p>",
    coverImageUrl: null,
    authorId: "admin1",
    status: "PUBLISHED",
    publishedAt: new Date("2026-01-01"),
    createdAt: new Date(),
    updatedAt: new Date(),
    author: { id: "admin1", name: "Admin User", image: null, bio: null },
  });

  store.create("donation", {
    id: "don1",
    userId: null,
    amount: 5000,
    currency: "usd",
    stripeSessionId: "cs_demo1",
    stripePaymentIntentId: null,
    status: "SUCCEEDED",
    donorName: "Aarav Mehta",
    donorEmail: "aarav@example.com",
    isRecurring: false,
    message: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Expose models directly (mirrors Prisma client API)
  return {
    user: makeModel(store, "user"),
    event: makeModel(store, "event"),
    eventRegistration: makeModel(store, "eventRegistration"),
    project: makeModel(store, "project"),
    blogPost: makeModel(store, "blogPost"),
    inquiry: makeModel(store, "inquiry"),
    donation: makeModel(store, "donation"),
    account: makeModel(store, "account"),
    session: makeModel(store, "session"),
    verificationToken: makeModel(store, "verificationToken"),
  };
}

// Singleton via global (mirrors real Prisma pattern)
const globalKey = "__techrise_prisma_mock__" as string;
const g = globalThis as AnyRecord;
if (!g[globalKey]) {
  (g as AnyRecord)[globalKey] = createPrismaClient();
}

export const prisma = (g as AnyRecord)[globalKey] as ReturnType<typeof createPrismaClient>;
