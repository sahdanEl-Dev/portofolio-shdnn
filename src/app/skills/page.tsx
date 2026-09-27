"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SkillItem {
  name: string;
  subtitle?: string;
  iconUrl?: string;
}

interface SkillCategory {
  title: string;
  description: string;
  accentColor: string;
  gridCols: string;
  skills: SkillItem[];
}

export default function SkillsPage() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Software Engineer",
      description:
        "Bahasa pemrograman, framework, dan tools yang saya kuasai untuk pengembangan aplikasi modern.",
      accentColor: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
      skills: [
        { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "PHP", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Laravel", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
        { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", iconUrl: "expressjs.png" },
        { name: "Tailwind CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Bootstrap", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        { name: "HTML", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "MySQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "VS Code", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Visual Studio", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" },
      ],
    },
    {
      title: "Photography, Visuals & Videographer",
      description:
        "Peralatan, teknik sinematografi, serta perangkat lunak editing foto dan video.",
      accentColor: "from-sky-500/20 via-sky-500/5 to-transparent",
      gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
      skills: [
        { name: "Camera Handling & Framing", subtitle: "Composition, Exposure & Lighting", iconUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4f7.png" },
        { name: "Videography & Movement", subtitle: "Cinematography, Panning & Cuts", iconUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4f9.png" },
        { name: "Adobe Lightroom", subtitle: "Color Grading & Presets", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
        { name: "Alight Motion", subtitle: "Keyframe Animation & Visual Effects", iconUrl: "alightmotion.png" },
        { name: "CapCut", subtitle: "Short Form & Fast Paced Content", iconUrl: "capcut.png" },
        { name: "Canva", subtitle: "Graphic Design & Social Media Assets", iconUrl: "canva.png" },
      ],
    },
    {
      title: "Gamer & Strategy",
      description:
        "Keahlian pemikiran taktis, komunikasi, dan adaptasi strategi di dunia virtual.",
      accentColor: "from-emerald-400/20 via-sky-500/10 to-transparent",
      gridCols: "grid-cols-1 sm:grid-cols-3",
      skills: [
        { name: "Tactical Analysis", subtitle: "Map Control, Resource & Decision Making", iconUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3af.png" },
        { name: "Team Communication", subtitle: "Shotcalling & Execution Under Pressure", iconUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3a9.png" },
        { name: "Adaptability & Reflexes", subtitle: "Fast Problem Solving & Meta Adaptability", iconUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26a1.png" },
      ],
    },
  ];

  return (
    <main className="min-h-screen px-6 md:px-16 py-20 max-w-7xl mx-auto flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 text-left max-w-3xl mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Skills &amp; <span className="text-emerald-500">Capabilities</span>
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
          Kumpulan tools, bahasa pemrograman, peralatan visual, dan keahlian taktis yang saya kuasai secara mendalam.
        </p>
      </motion.div>

      <div className="space-y-12">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 * catIndex, ease: "easeOut" }}
            className="relative rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md p-8 sm:p-10 overflow-hidden hover:border-zinc-700/80 transition-colors duration-300"
          >
            <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${category.accentColor} pointer-events-none`} />

            <div className="relative z-10 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">{category.title}</h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">{category.description}</p>
            </div>

            <div className={`grid ${category.gridCols} gap-4 sm:gap-6 relative z-10`}>
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border border-zinc-800/60 bg-zinc-950/40 hover:bg-zinc-800/40 hover:border-zinc-700 transition-all duration-300 group text-center cursor-pointer"
                >
                  {skill.iconUrl && (
                    <div className="relative w-12 h-12 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={skill.iconUrl}
                        alt={skill.name}
                        width={48}
                        height={48}
                        sizes="48px"
                        className={`object-contain max-h-12 max-w-12 filter drop-shadow-md ${
                          skill.name === "GitHub" || skill.name === "Express.js" ? "invert" : ""
                        }`}
                        unoptimized
                      />
                    </div>
                  )}
                  <span className="font-semibold text-zinc-200 text-sm sm:text-base group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  {skill.subtitle && (
                    <span className="text-xs text-zinc-500 mt-1.5 leading-tight">{skill.subtitle}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}