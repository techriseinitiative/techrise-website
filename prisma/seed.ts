/**
 * TechRise Initiative — Database Seed Script
 * Run with: npx prisma db seed
 *
 * Creates sample data so the site looks populated.
 * Passwords for all test accounts: "password123"
 *
 * To re-generate password hashes:
 *   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('password123', 10).then(h => console.log(h))"
 */

import { PrismaClient, Role, EventType, EventStatus, ProjectStatus, PostStatus, InquiryStatus, DonationStatus } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

// Pre-computed bcrypt hashes for "password123"
const HASH = hashSync("password123", 10);

async function main() {
  console.log("🌱 Seeding TechRise database...\n");

  // ==============================================================
  // USERS
  // ==============================================================
  console.log("Creating users...");

  const admin = await prisma.user.upsert({
    where: { email: "admin@techrise.org" },
    update: {},
    create: {
      name: "Aarav Mehta",
      email: "admin@techrise.org",
      passwordHash: HASH,
      role: Role.ADMIN,
      bio: "Founder & CEO of TechRise Initiative. Building the next generation of problem-solvers.",
    },
  });

  const priya = await prisma.user.upsert({
    where: { email: "priya@techrise.org" },
    update: {},
    create: {
      name: "Priya Sharma",
      email: "priya@techrise.org",
      passwordHash: HASH,
      role: Role.ADMIN,
      bio: "Head of Programs at TechRise. Passionate about accessible tech education.",
    },
  });

  const daniel = await prisma.user.upsert({
    where: { email: "daniel@techrise.org" },
    update: {},
    create: {
      name: "Daniel Okafor",
      email: "daniel@techrise.org",
      passwordHash: HASH,
      role: Role.USER,
      bio: "Community Lead and mentor at TechRise.",
    },
  });

  const sofia = await prisma.user.upsert({
    where: { email: "sofia@techrise.org" },
    update: {},
    create: {
      name: "Sofia Garcia",
      email: "sofia@techrise.org",
      passwordHash: HASH,
      role: Role.USER,
      bio: "Operations at TechRise. Loves building in public.",
    },
  });

  const learner1 = await prisma.user.upsert({
    where: { email: "marcus@example.com" },
    update: {},
    create: {
      name: "Marcus Lee",
      email: "marcus@example.com",
      passwordHash: HASH,
      role: Role.USER,
    },
  });

  const learner2 = await prisma.user.upsert({
    where: { email: "lina@example.com" },
    update: {},
    create: {
      name: "Lina Kowalski",
      email: "lina@example.com",
      passwordHash: HASH,
      role: Role.USER,
    },
  });

  console.log(`  ✅ Created ${5} users (admin + regular)`);
  console.log(`     Login: admin@techrise.org / password123\n`);

  // ==============================================================
  // EVENTS
  // ==============================================================
  console.log("Creating events...");

  const springBuildathon = await prisma.event.upsert({
    where: { slug: "spring-buildathon-2026" },
    update: {},
    create: {
      title: "Spring Buildathon 2026",
      slug: "spring-buildathon-2026",
      description: "48 hours. 12 tracks. Build something that matters. $25K in prizes across categories like AI for Good, Climate Tech, Developer Tools, and Social Impact. Join 1,000+ builders from 48 countries in our biggest event yet.",
      type: EventType.EVENT,
      startDate: new Date("2026-03-15T00:00:00Z"),
      endDate: new Date("2026-03-17T23:59:59Z"),
      registrationDeadline: new Date("2026-03-14T23:59:59Z"),
      capacity: 1000,
      prizePool: 2500000, // $25,000 in cents
      location: "Online · Global",
      isOnline: true,
      status: EventStatus.PUBLISHED,
      bannerImageUrl: null,
    },
  });

  const aiChallenge = await prisma.event.upsert({
    where: { slug: "ai-for-good-challenge-2026" },
    update: {},
    create: {
      title: "AI for Good Challenge",
      slug: "ai-for-good-challenge-2026",
      description: "An 8-week long-form competition challenging teams of 2-5 to ship AI products that address real social or environmental problems. Prizes for top 3 teams. Expert mentorship throughout.",
      type: EventType.COMPETITION,
      startDate: new Date("2026-04-05T00:00:00Z"),
      endDate: new Date("2026-06-01T23:59:59Z"),
      registrationDeadline: new Date("2026-04-01T23:59:59Z"),
      capacity: 500,
      prizePool: 1500000, // $15,000
      location: "Hybrid · 12 cities",
      isOnline: false,
      status: EventStatus.PUBLISHED,
    },
  });

  const fullstackTrack = await prisma.event.upsert({
    where: { slug: "full-stack-in-6-weeks" },
    update: {},
    create: {
      title: "Full-Stack in 6 Weeks",
      slug: "full-stack-in-6-weeks",
      description: "From zero to deployed app. Live cohorts with 1-on-1 mentorship, code reviews, and a final capstone project shipped to production. Rolling admissions — join the next cohort.",
      type: EventType.EVENT,
      startDate: new Date("2026-04-01T00:00:00Z"),
      endDate: new Date("2026-05-13T23:59:59Z"),
      capacity: null,
      location: "Online · Self-paced",
      isOnline: true,
      status: EventStatus.PUBLISHED,
    },
  });

  const ossSprints = await prisma.event.upsert({
    where: { slug: "open-source-sprints" },
    update: {},
    create: {
      title: "Open Source Sprints",
      slug: "open-source-sprints",
      description: "Weekend sprints contributing to real OSS projects used by thousands. Get familiar with GitHub workflows, code reviews, and shipping to a global community. Every Saturday on Discord.",
      type: EventType.EVENT,
      startDate: new Date("2026-01-01T00:00:00Z"),
      endDate: new Date("2026-12-31T23:59:59Z"),
      capacity: null,
      location: "Online · Discord",
      isOnline: true,
      status: EventStatus.PUBLISHED,
    },
  });

  const founderTrack = await prisma.event.upsert({
    where: { slug: "summer-founder-track-2026" },
    update: {},
    create: {
      title: "Summer Founder Track",
      slug: "summer-founder-track-2026",
      description: "12-week intensive for aspiring founders. Get matched with mentors, build your MVP, and pitch to a panel of VCs at demo day. Limited to 50 participants.",
      type: EventType.COMPETITION,
      startDate: new Date("2026-06-01T00:00:00Z"),
      endDate: new Date("2026-08-25T23:59:59Z"),
      registrationDeadline: new Date("2026-05-15T23:59:59Z"),
      capacity: 50,
      prizePool: 5000000, // $50,000
      location: "Hybrid · SF + Online",
      isOnline: false,
      status: EventStatus.PUBLISHED,
    },
  });

  const mobileJam = await prisma.event.upsert({
    where: { slug: "mobile-app-jam-may-2026" },
    update: {},
    create: {
      title: "Mobile App Jam",
      slug: "mobile-app-jam-may-2026",
      description: "Ship a mobile app in a weekend using React Native or Flutter. Cross-platform, beautiful UX, and a real launch on the App Store. $10K in prizes across iOS and Android tracks.",
      type: EventType.EVENT,
      startDate: new Date("2026-05-10T00:00:00Z"),
      endDate: new Date("2026-05-12T23:59:59Z"),
      registrationDeadline: new Date("2026-05-09T23:59:59Z"),
      capacity: 600,
      prizePool: 1000000, // $10,000
      location: "Online · Global",
      isOnline: true,
      status: EventStatus.PUBLISHED,
    },
  });

  // Draft event
  await prisma.event.upsert({
    where: { slug: "winter-code-camp-2026" },
    update: {},
    create: {
      title: "Winter Code Camp 2026",
      slug: "winter-code-camp-2026",
      description: "A month-long intensive coding bootcamp for beginners. Covers HTML, CSS, JavaScript, and React. Full scholarship available for students from low-income backgrounds.",
      type: EventType.EVENT,
      startDate: new Date("2026-12-01T00:00:00Z"),
      endDate: new Date("2026-12-31T23:59:59Z"),
      capacity: 200,
      location: "Online",
      isOnline: true,
      status: EventStatus.DRAFT,
    },
  });

  console.log(`  ✅ Created ${6} events + 1 draft\n`);

  // ==============================================================
  // EVENT REGISTRATIONS
  // ==============================================================
  console.log("Creating event registrations...");

  await prisma.eventRegistration.upsert({
    where: { userId_eventId: { userId: daniel.id, eventId: springBuildathon.id } },
    update: {},
    create: { userId: daniel.id, eventId: springBuildathon.id, status: "CONFIRMED" },
  });
  await prisma.eventRegistration.upsert({
    where: { userId_eventId: { userId: sofia.id, eventId: springBuildathon.id } },
    update: {},
    create: { userId: sofia.id, eventId: springBuildathon.id, status: "CONFIRMED" },
  });
  await prisma.eventRegistration.upsert({
    where: { userId_eventId: { userId: learner1.id, eventId: springBuildathon.id } },
    update: {},
    create: { userId: learner1.id, eventId: springBuildathon.id, status: "CONFIRMED" },
  });
  await prisma.eventRegistration.upsert({
    where: { userId_eventId: { userId: learner2.id, eventId: fullstackTrack.id } },
    update: {},
    create: { userId: learner2.id, eventId: fullstackTrack.id, status: "CONFIRMED" },
  });
  await prisma.eventRegistration.upsert({
    where: { userId_eventId: { userId: learner1.id, eventId: aiChallenge.id } },
    update: {},
    create: { userId: learner1.id, eventId: aiChallenge.id, status: "CONFIRMED" },
  });

  console.log("  ✅ Created event registrations\n");

  // ==============================================================
  // PROJECTS
  // ==============================================================
  console.log("Creating projects...");

  await prisma.project.upsert({
    where: { slug: "aquasense" },
    update: {},
    create: {
      title: "AquaSense",
      slug: "aquasense",
      description: "Low-cost water quality monitoring system using edge ML on a $5 microcontroller. Deployed in 14 villages across South Asia, providing real-time alerts for contaminated water sources. Built during TechRise Buildathon 2025.",
      imageUrls: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
      ],
      externalLink: "https://github.com/techrise/aquasense",
      contributors: ["Aarav M.", "Priya S.", "Daniel O."],
      submittedById: admin.id,
      status: ProjectStatus.APPROVED,
    },
  });

  await prisma.project.upsert({
    where: { slug: "verbalearn" },
    update: {},
    create: {
      title: "VerbaLearn",
      slug: "verbalearn",
      description: "Voice-first literacy app for first-graders in low-bandwidth regions. Works completely offline. Currently used in 200+ schools across 8 countries, helping 50,000+ children learn to read.",
      imageUrls: [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      ],
      externalLink: "https://github.com/techrise/verbalearn",
      contributors: ["Sofia G.", "Marcus L."],
      submittedById: sofia.id,
      status: ProjectStatus.APPROVED,
    },
  });

  await prisma.project.upsert({
    where: { slug: "gridshare" },
    update: {},
    create: {
      title: "GridShare",
      slug: "gridshare",
      description: "Peer-to-peer solar energy trading platform enabling households with rooftop solar to sell excess energy to neighbors. Deployed in 3 villages in rural India, reducing energy costs by 40% for participating families.",
      imageUrls: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      ],
      externalLink: "https://github.com/techrise/gridshare",
      contributors: ["Aarav M.", "Lina K.", "Yusuf A.", "Sara P."],
      submittedById: daniel.id,
      status: ProjectStatus.APPROVED,
    },
  });

  await prisma.project.upsert({
    where: { slug: "medtranslate" },
    update: {},
    create: {
      title: "MedTranslate",
      slug: "medtranslate",
      description: "Real-time medical translation app for non-English speaking patients in emergency rooms. HIPAA-compliant, supports 40+ languages, integrated with major hospital EHR systems.",
      imageUrls: [],
      externalLink: "https://github.com/techrise/medtranslate",
      contributors: ["Daniel O.", "Emma T."],
      submittedById: daniel.id,
      status: ProjectStatus.APPROVED,
    },
  });

  await prisma.project.upsert({
    where: { slug: "codementor-match" },
    update: {},
    create: {
      title: "CodeMentor Match",
      slug: "codementor-match",
      description: "AI-powered matching system that pairs early-career developers with mentors based on learning style, goals, and timezone. 1,200+ successful mentor-mentee pairs formed through the platform.",
      imageUrls: [],
      externalLink: "https://github.com/techrise/mentor-match",
      contributors: ["Priya S.", "Wei C."],
      submittedById: priya.id,
      status: ProjectStatus.APPROVED,
    },
  });

  await prisma.project.upsert({
    where: { slug: "farmos" },
    update: {},
    create: {
      title: "FarmOS",
      slug: "farmos",
      description: "Open-source farm management system for smallholder farmers. Tracks crops, weather, and yields across mobile and SMS. Currently used by 5,000+ farmers across Kenya and Tanzania.",
      imageUrls: [],
      externalLink: "https://github.com/techrise/farmos",
      contributors: ["Lina K.", "Marcus L.", "Aarav M."],
      submittedById: learner2.id,
      status: ProjectStatus.APPROVED,
    },
  });

  // Pending project (public submission awaiting review)
  await prisma.project.upsert({
    where: { slug: "skillbridge" },
    update: {},
    create: {
      title: "SkillBridge",
      slug: "skillbridge",
      description: "A platform connecting refugees with remote work opportunities in tech. Built by a team of 4 during the Spring Buildathon 2025.",
      imageUrls: [],
      contributors: ["Kenji R.", "Fatima A.", "Omar B."],
      submittedById: null,
      status: ProjectStatus.PENDING,
    },
  });

  console.log("  ✅ Created 7 projects\n");

  // ==============================================================
  // BLOG POSTS
  // ==============================================================
  console.log("Creating blog posts...");

  await prisma.blogPost.upsert({
    where: { slug: "techrise-2025-year-in-review" },
    update: {},
    create: {
      title: "TechRise 2025 Year in Review: 2,400 students, 48 countries, 120 projects",
      slug: "techrise-2025-year-in-review",
      excerpt: "A look back at everything we shipped together last year — the programs that launched, the projects that shipped, and the milestones we hit as a community.",
      content: `<h2>A Year of Growth</h2><p>2025 was the year TechRise truly went global. What started as a small Discord community of 50 students has grown into a movement spanning 48 countries...</p>`,
      coverImageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      authorId: admin.id,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date("2026-01-01T00:00:00Z"),
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "how-we-taught-500-students-to-ship" },
    update: {},
    create: {
      title: "How we taught 500 students to ship their first app in 6 weeks",
      slug: "how-we-taught-500-students-to-ship",
      excerpt: "Behind the scenes of our most ambitious cohort yet — the curriculum, the challenges, and what we'd do differently next time.",
      content: `<h2>The Challenge</h2><p>When we set out to onboard 500 students into our Full-Stack Track, we knew traditional approaches wouldn't scale...</p>`,
      coverImageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200",
      authorId: priya.id,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date("2026-02-28T00:00:00Z"),
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "building-aquasense-dorm-room-to-14-villages" },
    update: {},
    create: {
      title: "Building AquaSense: From dorm room idea to 14 villages",
      slug: "building-aquasense-dorm-room-to-14-villages",
      excerpt: "Aarav Mehta's journey from a weekend hackathon project to a product deployed across South Asia, helping thousands access clean water.",
      content: `<h2>It Started with a Weekend</h2><p>I submitted AquaSense as a weekend hackathon project, expecting it to live and die in a GitHub repo...</p>`,
      coverImageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
      authorId: admin.id,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date("2026-02-14T00:00:00Z"),
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "the-case-for-learning-in-public" },
    update: {},
    create: {
      title: "The case for learning in public",
      slug: "the-case-for-learning-in-public",
      excerpt: "Why sharing your learning process — failures included — is the best thing you can do for your career.",
      content: `<h2>The Fear of Looking Stupid</h2><p>Every developer remembers the fear of sharing their first code publicly. Here's why you should do it anyway...</p>`,
      coverImageUrl: null,
      authorId: daniel.id,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date("2026-01-30T00:00:00Z"),
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "top-5-tools-every-beginner-needs-2026" },
    update: {},
    create: {
      title: "Top 5 tools every beginner developer needs in 2026",
      slug: "top-5-tools-every-beginner-needs-2026",
      excerpt: "We surveyed 1,200 students and compiled the definitive list of tools that actually matter when you're starting out.",
      content: `<h2>Beyond the Basics</h2><p>Every "best tools for beginners" list recommends VS Code and Git. But what comes next?...</p>`,
      coverImageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200",
      authorId: sofia.id,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date("2026-01-15T00:00:00Z"),
    },
  });

  // Draft post
  await prisma.blogPost.upsert({
    where: { slug: "oss-contribution-guide" },
    update: {},
    create: {
      title: "Your First Open Source Contribution: A Step-by-Step Guide",
      slug: "oss-contribution-guide",
      excerpt: "Everything you need to make your first meaningful open source contribution, from finding a project to getting your PR merged.",
      content: `<h2>Why Open Source?</h2><p>Open source isn't just about code — it's about community, collaboration, and building in public...</p>`,
      authorId: priya.id,
      status: PostStatus.DRAFT,
      publishedAt: null,
    },
  });

  console.log("  ✅ Created 5 published posts + 1 draft\n");

  // ==============================================================
  // INQUIRIES
  // ==============================================================
  console.log("Creating inquiries...");

  await prisma.inquiry.createMany({
    data: [
      {
        name: "Rajesh Patel",
        email: "rajesh.patel@university.edu",
        message: "Hi, I'm a computer science professor at IIT Delhi. We're looking to partner with organizations for our students' capstone projects. Would TechRise be open to collaborating?",
        reason: "sponsor",
        userId: null,
        status: InquiryStatus.NEW,
        createdAt: new Date("2026-03-01T10:30:00Z"),
      },
      {
        name: "Amara Johnson",
        email: "amara.j@gmail.com",
        message: "I want to volunteer as a mentor for the upcoming Buildathon. I have 8 years of experience in full-stack development and I'd love to give back to the community.",
        reason: "mentor",
        userId: null,
        status: InquiryStatus.READ,
        createdAt: new Date("2026-02-25T14:15:00Z"),
      },
      {
        name: "Tomás Herrera",
        email: "tomas.h@techcorp.io",
        message: "We're a mid-sized SaaS company interested in sponsoring the Summer Founder Track. Can we discuss sponsorship tiers and what's included?",
        reason: "sponsor",
        userId: null,
        status: InquiryStatus.RESOLVED,
        createdAt: new Date("2026-02-20T09:00:00Z"),
      },
      {
        name: "Yuki Tanaka",
        email: "yuki.t@student.osaka-u.ac.jp",
        message: "Hello! I'm a student in Japan interested in joining the Full-Stack in 6 Weeks program. Is there a payment plan option available? Also, are there any scholarships for international students?",
        reason: "learner",
        userId: null,
        status: InquiryStatus.NEW,
        createdAt: new Date("2026-03-02T08:45:00Z"),
      },
      {
        name: "Sarah Mitchell",
        email: "press@techcrunch.com",
        message: "Hi, I'm a journalist at TechCrunch working on a piece about grassroots tech education initiatives. Would love to interview the TechRise team and potentially feature your work.",
        reason: "press",
        userId: null,
        status: InquiryStatus.READ,
        createdAt: new Date("2026-03-01T16:00:00Z"),
      },
    ],
    skipDuplicates: true,
  });

  console.log("  ✅ Created 5 inquiries\n");

  // ==============================================================
  // DONATIONS
  // ==============================================================
  console.log("Creating donations...");

  await prisma.donation.createMany({
    data: [
      {
        userId: learner1.id,
        amount: 5000, // $50
        currency: "usd",
        stripeSessionId: "cs_test_seed_001",
        stripePaymentIntentId: "pi_seed_001",
        status: DonationStatus.SUCCEEDED,
        donorName: null,
        donorEmail: "marcus@example.com",
        isRecurring: false,
        message: "Keep up the amazing work!",
        createdAt: new Date("2026-01-15T12:00:00Z"),
      },
      {
        userId: null,
        amount: 10000, // $100
        currency: "usd",
        stripeSessionId: "cs_test_seed_002",
        stripePaymentIntentId: "pi_seed_002",
        status: DonationStatus.SUCCEEDED,
        donorName: "Anonymous Donor",
        donorEmail: "donor@example.com",
        isRecurring: false,
        message: null,
        createdAt: new Date("2026-02-01T09:30:00Z"),
      },
      {
        userId: learner2.id,
        amount: 2500, // $25
        currency: "usd",
        stripeSessionId: "cs_test_seed_003",
        stripePaymentIntentId: "pi_seed_003",
        status: DonationStatus.SUCCEEDED,
        donorName: null,
        donorEmail: "lina@example.com",
        isRecurring: true,
        message: "Happy to support this mission!",
        createdAt: new Date("2026-02-15T18:00:00Z"),
      },
      {
        userId: null,
        amount: 50000, // $500
        currency: "usd",
        stripeSessionId: "cs_test_seed_004",
        stripePaymentIntentId: "pi_seed_004",
        status: DonationStatus.SUCCEEDED,
        donorName: "GreenTech Foundation",
        donorEmail: "grants@greentech.org",
        isRecurring: false,
        message: "Supporting innovation in emerging markets",
        createdAt: new Date("2026-02-20T11:00:00Z"),
      },
      {
        userId: daniel.id,
        amount: 1000, // $10
        currency: "usd",
        stripeSessionId: "cs_test_seed_005",
        status: DonationStatus.PENDING,
        donorName: null,
        donorEmail: "daniel@techrise.org",
        isRecurring: false,
        createdAt: new Date("2026-03-03T20:00:00Z"),
      },
    ],
    skipDuplicates: true,
  });

  console.log("  ✅ Created 5 donations\n");

  // ==============================================================
  // SUMMARY
  // ==============================================================
  console.log("========================================");
  console.log("✅ Seed complete!");
  console.log("========================================");
  console.log("");
  console.log("Test accounts:");
  console.log("  Admin:  admin@techrise.org / password123");
  console.log("  User:   priya@techrise.org / password123");
  console.log("  User:   daniel@techrise.org / password123");
  console.log("  User:   sofia@techrise.org / password123");
  console.log("  User:   marcus@example.com / password123");
  console.log("");
  console.log("Database summary:");
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.inquiry.count(),
    prisma.donation.count(),
  ]);
  console.log(`  ${counts[0]} users`);
  console.log(`  ${counts[1]} events`);
  console.log(`  ${counts[2]} projects`);
  console.log(`  ${counts[3]} blog posts`);
  console.log(`  ${counts[4]} inquiries`);
  console.log(`  ${counts[5]} donations`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
