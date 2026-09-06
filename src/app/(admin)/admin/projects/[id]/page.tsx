import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projectService } from "@/lib/services/projectService";
import { ProjectForm } from "./form";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await projectService.getById(id);

  if (!project) {
    notFound();
  }

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
        <h1 className="font-display font-bold text-3xl text-ink-900">Edit Project</h1>
        <p className="text-sm text-ink-500 mt-1">Update project details</p>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 p-8">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
