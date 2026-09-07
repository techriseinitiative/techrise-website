import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Trophy, Filter, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Events & Competitions",
  description: "Browse upcoming events, buildathons, and competitions from TechRise Initiative.",
};

const gradients = [
  "from-[#0F766E] to-[#14B8A6]",
  "from-[#F57342] to-[#FB923C]",
  "from-[#14B8A6] to-[#5ECAD4]",
  "from-[#EAB308] to-[#F59E0B]",
  "from-[#F57342] to-[#E11D48]",
  "from-[#3B82F6] to-[#0F766E]",
];

function gradientFor(idx: number) {
  return gradients[idx % gradients.length];
}

function formatDateRange(start: Date, end: Date) {
  const startD = new Date(start);
  const endD = new Date(end);
  const sameMonth = startD.getMonth() === endD.getMonth() && startD.getFullYear() === endD.getFullYear();
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (sameMonth) {
    return `${startD.toLocaleDateString("en-US", opts)} — ${endD.getDate()}, ${endD.getFullYear()}`;
  }
  return `${startD.toLocaleDateString("en-US", opts)} — ${endD.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { startDate: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

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

      {/* EVENTS GRID */}
      <section className="py-16 sm:py-20 bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {events.length === 0 ? (
            <div className="rounded-2xl bg-[#111827] border border-[#374151] p-12 text-center">
              <Sparkles className="h-10 w-10 text-[#5ECAD4] mx-auto mb-3" />
              <p className="font-display font-bold text-xl text-[#F9FAFB]">No events yet</p>
              <p className="text-sm text-[#9CA3AF] mt-2">Check back soon — new programs are added regularly.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event, idx) => {
                const registered = event._count.registrations;
                const isFull = event.capacity !== null && registered >= event.capacity;
                const isPast = new Date() > new Date(event.endDate);
                const color = gradientFor(idx);
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="card-interactive group overflow-hidden"
                  >
                    <div className={`relative h-40 bg-gradient-to-br ${color} p-5 overflow-hidden`}>
                      <div className="absolute inset-0 bg-pattern-dots opacity-20" />

                      <div className="relative h-full flex flex-col justify-between">
                        <span className="self-start text-[10px] font-bold tracking-widest text-white bg-white/20 px-2.5 py-1 rounded">
                          {event.type}
                        </span>
                        <div>
                          <p className="font-display font-bold text-2xl text-white mt-1 leading-tight">
                            {event.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-[#9CA3AF] leading-relaxed line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mt-5 space-y-2 text-sm text-[#9CA3AF]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#6B7280]" />
                          <span>{formatDateRange(event.startDate, event.endDate)}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#6B7280]" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#6B7280]" />
                          <span>
                            {registered.toLocaleString()} registered{event.capacity ? ` / ${event.capacity.toLocaleString()}` : ""}
                          </span>
                        </div>
                      </div>

                      {event.capacity && (
                        <div className="mt-4">
                          <div className="h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${color} rounded-full transition-all`}
                              style={{ width: `${Math.min(100, (registered / event.capacity) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          isPast
                            ? "text-[#6B7280]"
                            : isFull
                            ? "text-[#EAB308]"
                            : "text-[#22C55E]"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            isPast ? "bg-[#6B7280]" :
                            isFull ? "bg-[#EAB308] animate-pulse" : "bg-[#22C55E] animate-pulse"
                          }`} />
                          {isPast ? "Closed" : isFull ? "Waitlist" : "Registration Open"}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5ECAD4] group-hover:text-[#14B8A6] transition">
                          {isPast ? "View" : "Register"}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
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
