"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ProjectStatusChart({
  completed,
  inProgress,
}: {
  completed: number;
  inProgress: number;
}) {
  const data = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
  ];
  const colors = ["#10b981", "#0ea5e9"];

  return (
    <div className="rounded-2xl border-white/10 bg-white/[0.05] backdrop-blur-xl p-6">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">Status Project</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}