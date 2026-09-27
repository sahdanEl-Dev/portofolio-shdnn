import ProjectForm from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Tambah Project</h1>
      <ProjectForm />
    </div>
  );
}