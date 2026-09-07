"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save } from "lucide-react";
import { updateEventAction } from "@/actions/events";
import type { Event } from "@prisma/client";

function toLocal(date: Date | string | null): string {
  if (!date) return "";
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}

export function EditEventForm({ event }: { event: Event }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("id", event.id);

    startTransition(async () => {
      const result = await updateEventAction(fd);
      if (result?.success) {
        router.push("/admin/events");
      } else {
        setError(result?.error ?? "Failed to update event");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
      )}
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Title</label>
        <input name="title" defaultValue={event.title} required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Type</label>
          <select name="type" defaultValue={event.type} className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none">
            <option value="EVENT">Event</option>
            <option value="COMPETITION">Competition</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Location</label>
          <input name="location" defaultValue={event.location ?? ""} placeholder="Online · Global" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Description</label>
        <textarea name="description" rows={5} defaultValue={event.description} required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none resize-none" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Start date</label>
          <input type="datetime-local" name="startDate" defaultValue={toLocal(event.startDate)} required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">End date</label>
          <input type="datetime-local" name="endDate" defaultValue={toLocal(event.endDate)} required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Registration deadline</label>
          <input type="datetime-local" name="registrationDeadline" defaultValue={toLocal(event.registrationDeadline)} className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Capacity</label>
          <input type="number" name="capacity" defaultValue={event.capacity ?? ""} min="1" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Prize pool (USD)</label>
          <input type="number" name="prizePool" defaultValue={event.prizePool ?? ""} min="0" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Format</label>
          <select name="isOnline" defaultValue={event.isOnline ? "true" : "false"} className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none">
            <option value="true">Online</option>
            <option value="false">In-person</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Status</label>
          <select name="status" defaultValue={event.status} className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-ink-100">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ink-800 transition disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save changes
        </button>
        <Link href="/admin/events" className="text-sm font-semibold text-ink-600 hover:text-ink-900">Cancel</Link>
      </div>
    </form>
  );
}
