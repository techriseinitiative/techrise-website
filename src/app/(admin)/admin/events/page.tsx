import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Plus, Edit, Calendar, MapPin, Users } from "lucide-react";
import { DeleteEventButton } from "./delete-button";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ink-900">Events & Competitions</h1>
          <p className="text-sm text-ink-500 mt-1">Manage your programs and events</p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ink-800 transition"
        >
          <Plus className="h-4 w-4" /> New event
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {events.length === 0 ? (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-ink-200 p-12 text-center text-ink-500">
            No events yet. Create your first one!
          </div>
        ) : (
          (events as any[]).map((event: any) => (
            <div key={event.id} className="bg-white rounded-2xl border border-ink-200 p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold tracking-widest uppercase text-primary-700">
                    {event.type}
                  </p>
                  <h3 className="font-display font-bold text-lg text-ink-900 mt-0.5 truncate">
                    {event.title}
                  </h3>
                </div>
                <StatusBadge status={event.status} />
              </div>
              <p className="text-sm text-ink-600 line-clamp-2 mb-4">{event.description}</p>
              <div className="space-y-1.5 text-xs text-ink-500 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(event.startDate)}
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  {event._count.registrations} registered
                  {event.capacity ? ` / ${event.capacity}` : ""}
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-ink-100">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-ink-200 transition"
                >
                  <Edit className="h-3.5 w-3.5" /> Edit
                </Link>
                <DeleteEventButton id={event.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
