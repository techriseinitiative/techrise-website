import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { eventService } from "@/lib/services/eventService";
import { EditEventForm } from "./form";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await eventService.getById(id);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Edit Event</h1>
        <p className="text-sm text-ink-500 mt-1">Update event details</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-8">
        <EditEventForm event={event} />
      </div>
    </div>
  );
}
