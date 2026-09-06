import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "./form";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900">Add Project</h1>
        <p className="text-sm text-ink-500 mt-1">Feature a community project in the showcase</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
