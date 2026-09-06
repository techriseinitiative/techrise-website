import { CreateEventForm } from "./form";

export default function NewEventPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Create New Event</h1>
        <p className="text-sm text-ink-500 mt-1">Add an event or competition to the platform</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-8">
        <CreateEventForm />
      </div>
    </div>
  );
}
