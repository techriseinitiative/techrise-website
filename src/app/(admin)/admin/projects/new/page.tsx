import { ProjectForm } from "../[id]/form";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl text-ink-900">Add Project</h1>
        <p className="text-sm text-ink-500 mt-1">Feature a community project in the showcase</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
