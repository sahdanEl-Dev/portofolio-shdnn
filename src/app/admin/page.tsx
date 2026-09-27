import { db } from "@/db";
import { projects, blogPosts, galleryPosts, messages } from "@/db/schema";
import VisitorChart from "@/components/admin/VisitorChart";
import ProjectStatusChart from "@/components/admin/ProjectStatusChart";
import RecentMessagesTable from "@/components/admin/RecentMessagesTable";

export default async function AdminDashboard() {
  const allProjects = await db.select().from(projects);
  const allBlog = await db.select().from(blogPosts);
  const allGallery = await db.select().from(galleryPosts);
  const allMessages = await db.select().from(messages);

  const completed = allProjects.filter((p) => p.status === "completed").length;
  const inProgress = allProjects.filter((p) => p.status === "in_progress").length;

  const stats = [
    { label: "Total Project", value: allProjects.length, sub: `${completed} selesai · ${inProgress} progress` },
    { label: "Total Blog Posts", value: allBlog.length },
    { label: "Total Gallery Media", value: allGallery.length },
    { label: "Pesan Masuk", value: allMessages.length },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-5">
            <p className="text-xs text-zinc-400 mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-white">{s.value}</p>
            {s.sub && <p className="text-xs text-zinc-500 mt-1">{s.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorChart />
        <ProjectStatusChart completed={completed} inProgress={inProgress} />
      </div>

      <RecentMessagesTable />
    </div>
  );
}