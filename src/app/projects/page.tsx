import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import ProjectsGrid from "@/components/projects-grid";

export default async function ProjectsPage() {
  const allProjects = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-10 text-3xl font-bold sm:text-4xl">Projects</h1>

      {allProjects.length === 0 ? (
        <p className="text-white/50">Belum ada project ditampilkan.</p>
      ) : (
        <ProjectsGrid projects={allProjects} />
      )}
    </div>
  );
}