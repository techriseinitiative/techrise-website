"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Save } from "lucide-react";
import { createEventAction } from "@/actions/events";

export function CreateEventForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await createEventAction(fd);
      if (result?.success) {
        router.push("/admin/events");
      } else {
        alert(result?.error || "Failed to create event");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Title</label>
        <input name="title" required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Type</label>
          <select name="type" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none">
            <option value="EVENT">Event</option>
            <option value="COMPETITION">Competition</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Location</label>
          <input name="location" placeholder="Online · Global" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-ink-700 mb-2">Description</label>
        <textarea name="description" rows={5} required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition resize-none" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Start date</label>
          <input type="datetime-local" name="startDate" required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">End date</label>
          <input type="datetime-local" name="endDate" required className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Registration deadline</label>
          <input type="datetime-local" name="registrationDeadline" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Capacity (optional)</label>
          <input type="number" name="capacity" min="1" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Prize pool (USD, optional)</label>
          <input type="number" name="prizePool" min="0" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-700 mb-2">Format</label>
          <select name="isOnline" className="w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm focus:border-primary-500 outline-none">
            <option value="true">Online</option>
            <option value="false">In-person</option>
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
          Save as draft
        </button>
        <Link href="/admin/events" className="text-sm font-semibold text-ink-600 hover:text-ink-900">Cancel</Link>
      </div>
    </form>
  );
}
