import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Trophy, Sparkles, Filter } from "lucide-react";

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
    color: "from-primary-500 to-primary-700",
    tag: "EVENT",
  },
  {
    title: "AI for Good Challenge",
    type: "Competition",
    description: "A 8-week long-form competition challenging teams to ship AI products that address real social or environmental problems.",
    date: "Apr 5 — Jun 1, 2026",
    location: "Hybrid · 12 cities",
    registered: 312,
    capacity: 500,
    status: "Coming Soon",
    color: "from-accent-500 to-accent-700",
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
    color: "from-emerald-500 to-emerald-700",
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
    color: "from-violet-500 to-violet-700",
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
    color: "from-rose-500 to-pink-600",
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
    color: "from-cyan-500 to-blue-600",
    tag: "EVENT",
  },
];

export default function EventsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 bg-ink-50 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 shadow-sm animate-fade-up">
              <Calendar className="h-3.5 w-3.5 text-primary-600" />
              Events & Competitions
            </div>
            <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl tracking-tight animate-fade-up delay-100">
              Learn by doing. <br /><span className="text-gradient">Build with the best.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-600 leading-relaxed max-w-2xl animate-fade-up delay-200">
              From weekend buildathons to 8-week competitions — find your next challenge and grow alongside a global community.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="border-y border-ink-200 bg-white sticky top-16 sm:top-20 z-30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-4 flex items-center gap-3 overflow-x-auto">
          <Filter className="h-4 w-4 text-ink-500 shrink-0" />
          {["All", "Buildathons", "Competitions", "Programs", "Workshops"].map((f, i) => (
            <button
              key={f}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                i === 0
                  ? "bg-ink-900 text-white"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="py-16 sm:py-20 bg-ink-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVENTS.map((e) => (
              <article
                key={e.title}
                className="group relative overflow-hidden rounded-2xl bg-white border border-ink-200 hover:border-ink-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`relative h-44 bg-gradient-to-br ${e.color} p-5 overflow-hidden`}>
                  <div className="absolute inset-0 bg-hero-grid opacity-20" />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                  <div className="relative h-full flex flex-col justify-between">
                    <span className="self-start text-[10px] font-bold tracking-widest text-white bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">
                      {e.tag}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white/80">{e.type}</p>
                      <p className="font-display font-bold text-2xl text-white mt-0.5 leading-tight">
                        {e.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-ink-600 leading-relaxed">
                    {e.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-ink-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-ink-400" />
                      <span>{e.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-ink-400" />
                      <span>{e.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-ink-400" />
                      <span>
                        {e.registered.toLocaleString()} registered{e.capacity ? ` / ${e.capacity.toLocaleString()}` : ''}
                      </span>
                    </div>
                  </div>

                  {e.capacity && (
                    <div className="mt-4">
                      <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
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
                        ? "text-success"
                        : e.status === "Waitlist"
                        ? "text-accent-600"
                        : "text-ink-500"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                        e.status === "Registration Open" || e.status === "Enrolling Now" || e.status === "Always Open"
                          ? "bg-success"
                          : e.status === "Waitlist"
                          ? "bg-accent-500"
                          : "bg-ink-400"
                      }`} />
                      {e.status}
                    </span>
                    <Link href="/signup" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-900 group/btn">
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
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <Trophy className="h-10 w-10 text-accent-500 mx-auto" />
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl tracking-tight">
            Have an idea for a program?
          </h2>
          <p className="mt-3 text-ink-600 max-w-xl mx-auto">
            We partner with organizations and individuals to run new programs. Let's chat.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-ink-800 transition hover:scale-[1.02]">
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
