import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Users, Clock, Trophy, ArrowRight, Globe, AlertCircle, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { RegisterButton } from "./register-button";

const gradients = [
  "from-[#0F766E] to-[#14B8A6]",
  "from-[#F57342] to-[#FB923C]",
  "from-[#14B8A6] to-[#5ECAD4]",
  "from-[#EAB308] to-[#F59E0B]",
];

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [event, session] = await Promise.all([
    prisma.event.findUnique({
      where: { slug },
      include: { _count: { select: { registrations: { where: { status: { in: ["CONFIRMED", "WAITLISTED"] } } } } } },
    }),
    auth(),
  ]);

  if (!event || event.status !== "PUBLISHED") {
    notFound();
  }

  const userRegistration = session?.user?.id
    ? await prisma.eventRegistration.findUnique({
        where: { userId_eventId: { userId: session.user.id, eventId: event.id } },
      })
    : null;

  const registered = event._count.registrations;
  const isFull = event.capacity !== null && registered >= event.capacity;
  const isPast = new Date() > new Date(event.endDate);
  const deadlinePassed = event.registrationDeadline && new Date() > new Date(event.registrationDeadline);
  const isOpen = !isPast && !deadlinePassed;

  const gradientIdx = parseInt(event.id.slice(-1), 16) % gradients.length;
  const color = gradients[gradientIdx];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 sm:pt-28 pb-12 bg-[#0A0E14] overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition mb-6"
          >
            ← Back to events
          </Link>

          <div className={`relative overflow-hidden rounded-2xl border border-[#374151] bg-gradient-to-br ${color} p-8 sm:p-12`}>
            <div className="absolute inset-0 bg-pattern-dots opacity-20" />
            <div className="relative">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur text-white px-3 py-1 rounded mb-4">
                {event.type}
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
                {event.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} —{" "}
                    {new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    {event.isOnline ? <Globe className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="py-12 sm:py-16 bg-[#0A0E14]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-7">
                <h2 className="font-display font-bold text-xl text-[#F9FAFB] mb-4">About this {event.type.toLowerCase()}</h2>
                <div className="prose prose-invert max-w-none text-[#9CA3AF] leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              {/* Registration card */}
              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-[#5ECAD4]" />
                  <h3 className="font-display font-bold text-lg text-[#F9FAFB]">Registration</h3>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#9CA3AF]">Registered</span>
                    <span className="font-bold text-[#F9FAFB]">
                      {registered.toLocaleString()}
                      {event.capacity ? ` / ${event.capacity.toLocaleString()}` : ""}
                    </span>
                  </div>
                  {event.capacity && (
                    <div className="h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${color} rounded-full`}
                        style={{ width: `${Math.min(100, (registered / event.capacity) * 100)}%` }}
                      />
                    </div>
                  )}
                  {event.registrationDeadline && (
                    <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        Deadline
                      </span>
                      <span className="font-semibold text-[#F9FAFB]">
                        {new Date(event.registrationDeadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  )}
                  {event.prizePool && (
                    <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                      <span className="flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5" />
                        Prize pool
                      </span>
                      <span className="font-bold text-[#F9FAFB]">
                        ${(event.prizePool / 100).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action */}
                {isPast ? (
                  <div className="rounded-lg bg-[#1F2937] border border-[#374151] p-3 text-sm text-[#9CA3AF] flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-[#6B7280]" />
                    This event has ended.
                  </div>
                ) : deadlinePassed ? (
                  <div className="rounded-lg bg-[#EAB308]/10 border border-[#EAB308]/25 p-3 text-sm text-[#EAB308] flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Registration deadline has passed.
                  </div>
                ) : userRegistration ? (
                  <div className="space-y-3">
                    <div className={`rounded-lg p-3 text-sm flex items-center gap-2 ${
                      userRegistration.status === "CONFIRMED"
                        ? "bg-[#22C55E]/10 border border-[#22C55E]/25 text-[#22C55E]"
                        : userRegistration.status === "WAITLISTED"
                        ? "bg-[#EAB308]/10 border border-[#EAB308]/25 text-[#EAB308]"
                        : "bg-[#1F2937] border border-[#374151] text-[#9CA3AF]"
                    }`}>
                      <CheckCircle className="h-4 w-4" />
                      You&apos;re {userRegistration.status.toLowerCase()}.
                    </div>
                    {userRegistration.status !== "CANCELLED" && (
                      <RegisterButton eventId={event.id} mode="cancel" />
                    )}
                  </div>
                ) : (
                  <RegisterButton eventId={event.id} mode={isFull ? "register-waitlist" : "register"} isFull={isFull} />
                )}
              </div>

              {/* Format */}
              <div className="rounded-2xl bg-[#111827] border border-[#374151] p-6">
                <h3 className="font-display font-bold text-base text-[#F9FAFB] mb-3">Format</h3>
                <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                  {event.isOnline ? <Globe className="h-4 w-4 text-[#5ECAD4]" /> : <MapPin className="h-4 w-4 text-[#5ECAD4]" />}
                  <span>{event.isOnline ? "Online" : "In-person"}{event.location && ` · ${event.location}`}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
