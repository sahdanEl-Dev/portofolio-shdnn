"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Period = "day" | "month" | "year";

export default function VisitorChart() {
  const [data, setData] = useState<{ label: string; count: number }[]>([]);
  const [period, setPeriod] = useState<Period>("month");

  useEffect(() => {
    fetch(`/api/admin/page-views?period=${period}`)
      .then((res) => res.json())
      .then(setData);
  }, [period]);

  const periodLabel = { day: "Harian", month: "Bulanan", year: "Tahunan" };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-300">
          Pengunjung {periodLabel[period]}
        </h3>
        <div className="flex gap-1">
          {(["day", "month", "year"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-3 py-1.5 rounded-lg transition ${
                period === p
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {periodLabel[p]}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke="#71717a" fontSize={12} />
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