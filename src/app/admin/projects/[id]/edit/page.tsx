import { notFound } from "next/navigation";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProjectForm from "@/components/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, Number(id)));

  if (!item) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Edit Project</h1>
      <ProjectForm
        projectId={item.id}
        initial={{
          title: item.title,
          description: item.description,
          techStack: item.techStack,
          status: item.status,
          demoUrl: item.demoUrl ?? "",
          repoUrl: item.repoUrl ?? "",
          imageUrl: item.imageUrl ?? "",
        }}
      />
    </div>
  );
}