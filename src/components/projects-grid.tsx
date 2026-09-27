"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string;
  status: string;
  demoUrl: string | null;
  repoUrl: string | null;
  imageUrl: string | null;
};

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          {p.imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
              <Image
                src={p.imageUrl}
                alt={p.title}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 33vw, 90vw"
                className="object-contain"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  p.status === "completed"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {p.status === "completed" ? "Completed" : "In Progress"}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
              {p.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.techStack?.split(",").map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/70"
                >
                  {t.trim()}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              {p.demoUrl && (
                <Link
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-emerald-400 hover:underline"
                >
                  <ExternalLink size={14} />
                  Demo
                </Link>
              )}
              {p.repoUrl && (
                <Link
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/60 hover:underline"
                >
                  <Code2 size={14} />
                  Repo
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}