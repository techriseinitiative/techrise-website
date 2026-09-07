import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Trophy, Filter, Sparkles } from "lucide-react";

export const metadata = {
  title: "Events & Competitions",
  description: "Browse upcoming events, buildathons, and competitions from TechRise Initiative.",
};

const EVENTS = [
  {
    title: "Spring Buildathon 2026",
    type: "Buildathon",
    description: "48 hours. 12 tracks. Build something that matters. $25K in prizes across categories like AI for Good, Climate Tech, and Developer Tools.",
    date: "Mar 15 — 17, 2026",
    location: "Online · Global",
    registered: 847,
    capacity: 1000,
    status: "Registration Open",
    color: "from-[#0F766E] to-[#14B8A6]",
    tag: "EVENT",
  },
  {
    title: "AI for Good Challenge",
    type: "Competition",
    description: "An 8-week long-form competition challenging teams to ship AI products that address real social or environmental problems.",
    date: "Apr 5 — Jun 1, 2026",
    location: "Hybrid · 12 cities",
    registered: 312,
    capacity: 500,
    status: "Coming Soon",
    color: "from-[#F57342] to-[#FB923C]",
    tag: "COMPETITION",
  },
  {
    title: "Full-Stack in 6 Weeks",
    type: "Program",
    description: "From zero to deployed app. Live cohorts with 1-on-1 mentorship, code reviews, and a final capstone project shipped to production.",
    date: "Rolling Admissions",
    location: "Online · Self-paced",
    registered: 1204,
    capacity: null,
    status: "Enrolling Now",
    color: "from-[#14B8A6] to-[#5ECAD4]",
    tag: "PROGRAM",
  },
  {
    title: "Open Source Sprints",
    type: "Workshop",
    description: "Weekend sprints contributing to real OSS projects. Get familiar with GitHub workflows, code reviews, and shipping to a global community.",
    date: "Every Saturday",
    location: "Online · Discord",
    registered: 567,
    capacity: null,
    status: "Always Open",
    color: "from-[#EAB308] to-[#F59E0B]",
    tag: "WORKSHOP",
  },
  {
    title: "Summer Founder Track",
    type: "Competition",
    description: "12-week intensive for aspiring founders. Get matched with mentors, build your MVP, and pitch to a panel of VCs at demo day.",
    date: "Jun 1 — Aug 25, 2026",
    location: "Hybrid · SF + Online",
    registered: 89,
    capacity: 50,
    status: "Waitlist",
    color: "from-[#F57342] to-[#E11D48]",
    tag: "COMPETITION",
  },
  {
    title: "Mobile App Jam",
    type: "Buildathon",
    description: "Ship a mobile app in a weekend using React Native or Flutter. Cross-platform, beautiful UX, and a real launch on the App Store.",
    date: "May 10 — 12, 2026",
    location: "Online · Global",
    registered: 423,
    capacity: 600,
    status: "Registration Open",
    color: "from-[#3B82F6] to-[#0F766E]",
    tag: "EVENT",
  },
];

export default function EventsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E]/15 border border-[#0F766E]/25 px-4 py-2 text-sm font-semibold text-[#5ECAD4] animate-fade-up">
              <Calendar className="h-4 w-4" />
              Events & Competitions
            </div>
            <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl tracking-tight text-[#F9FAFB] animate-fade-up delay-100">
              Learn by doing. <br />
              <span className="gradient-text">Build with the best.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] leading-relaxed max-w-2xl animate-fade-up delay-200">
              From weekend buildathons to 8-week competitions — find your next challenge and grow alongside a global community.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="border-y border-[#1F2937] bg-[#111827]/90 sticky top-16 z-30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-4 flex items-center gap-3 overflow-x-auto">
          <Filter className="h-5 w-5 text-[#6B7280] shrink-0" />
          {["All", "Buildathons", "Competitions", "Programs", "Workshops"].map((f, i) => (
            <button
              key={f}
              className={`shrink-0 rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                i === 0
                  ? "bg-[#0F766E] text-white"
                  : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151] hover:text-[#F9FAFB]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="py-16 sm:py-20 bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVENTS.map((e, idx) => (
              <article
                key={e.title}
                className="card-interactive group overflow-hidden"
              >
                <div className={`relative h-40 bg-gradient-to-br ${e.color} p-5 overflow-hidden`}>
                  <div className="absolute inset-0 bg-pattern-dots opacity-20" />

                  <div className="relative h-full flex flex-col justify-between">
                    <span className="self-start text-[10px] font-bold tracking-widest text-white bg-white/20 px-2.5 py-1 rounded">
                      {e.tag}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white/90">{e.type}</p>
                      <p className="font-display font-bold text-2xl text-white mt-1 leading-tight">
                        {e.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {e.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-[#9CA3AF]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#6B7280]" />
                      <span>{e.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#6B7280]" />
                      <span>{e.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#6B7280]" />
                      <span>
                        {e.registered.toLocaleString()} registered{e.capacity ? ` / ${e.capacity.toLocaleString()}` : ''}
                      </span>
                    </div>
                  </div>

                  {e.capacity && (
                    <div className="mt-4">
                      <div className="h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${e.color} rounded-full transition-all`}
                          style={{ width: `${Math.min(100, (e.registered / e.capacity) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      e.status === "Registration Open" || e.status === "Enrolling Now" || e.status === "Always Open"
                        ? "text-[#22C55E]"
                        : e.status === "Waitlist"
                        ? "text-[#EAB308]"
                        : "text-[#9CA3AF]"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                        e.status === "Registration Open" || e.status === "Enrolling Now" || e.status === "Always Open"
                          ? "bg-[#22C55E]"
                          : e.status === "Waitlist"
                          ? "bg-[#EAB308]"
                          : "bg-[#6B7280]"
                      }`} />
                      {e.status}
                    </span>
                    <Link href="/signup" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5ECAD4] group/btn hover:text-[#14B8A6] transition">
                      Register
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#111827]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center">
          <Trophy className="h-12 w-12 text-[#F57342] mx-auto" />
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#F9FAFB]">
            Have an idea for a program?
          </h2>
          <p className="mt-3 text-[#9CA3AF] max-w-xl mx-auto">
            We partner with organizations and individuals to run new programs. Let&apos;s chat.
          </p>
          <Link href="/contact" className="mt-7 btn-primary inline-flex">
            Get in touch
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}