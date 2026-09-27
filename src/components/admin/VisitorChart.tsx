"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function VisitorChart() {
  const [data, setData] = useState<{ month: string; count: number }[]>([]);

  useEffect(() => {
    fetch("/api/admin/page-views")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="rounded-2xl border-white/10 bg-white/[0.05] backdrop-blur-xl p-6">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">
        Pengunjung per Bulan
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
          <YAxis stroke="#71717a" fontSize={12} />
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }}
          />
          <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}