import Link from "next/link";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import DeleteProjectButton from "@/components/delete-project-button";

export default async function AdminProjectsPage() {
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white"
        >
          <Plus size={16} />
          Tambah
        </Link>
      </div>

      <div className="space-y-3">
        {allProjects.length === 0 && (
          <p className="text-white/50">Belum ada project.</p>
        )}
        {allProjects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div>
              <p className="font-medium text-white">{p.title}</p>
              <p className="text-sm text-white/50">
                {p.status === "completed" ? "Completed" : "In Progress"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/projects/${p.id}/edit`}
                className="text-sm text-emerald-400 hover:underline"
              >
                Edit
              </Link>
              <DeleteProjectButton id={p.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}