"use client";

import { useState } from "react";
import { Cpu, Terminal, Gamepad2, Globe } from "lucide-react";

interface CourseCyberVisualProps {
  courseId: string;
  category?: string;
  title?: string;
}

export function CourseCyberVisual({ courseId }: CourseCyberVisualProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Define unique cyber theme for each course
  const getTheme = () => {
    switch (courseId) {
      case "cpp-programming-course":
        return {
          badge: "C++23 • HIGH PERFORMANCE",
          icon: Terminal,
          accentColor: "from-sky-500 via-blue-600 to-indigo-700",
          glowColor: "rgba(56, 189, 248, 0.25)",
          borderColor: "border-sky-500/40",
          textColor: "text-sky-300",
          terminalPrompt: "g++ -O3 -std=c++23 main.cpp",
          codeLines: [
            "#include <iostream>",
            "auto mem = std::make_unique<RAM>();",
            "mem->allocate(0x7FFF); // Fast",
            "std::cout << \"🚀 Speed: 0.002ms\";"
          ],
          tags: ["Pointers", "OOP", "STL"]
        };
      case "scratch-kids-logic":
        return {
          badge: "GAME LOGIC • KIDS & TEENS",
          icon: Gamepad2,
          accentColor: "from-amber-400 via-orange-500 to-rose-600",
          glowColor: "rgba(251, 146, 60, 0.25)",
          borderColor: "border-amber-500/40",
          textColor: "text-amber-300",
          terminalPrompt: "when green_flag clicked",
          codeLines: [
            "forever {",
            "  move (10) steps;",
            "  if <touching [obstacle]?>",
            "  play sound (victory_fanfare);"
          ],
          tags: ["Arcade", "Stories", "Game Logic"]
        };
      case "csharp-unity-game-dev":
        return {
          badge: "C# GAME DEV",
          icon: Cpu,
          accentColor: "from-emerald-400 via-teal-500 to-cyan-600",
          glowColor: "rgba(45, 212, 191, 0.25)",
          borderColor: "border-teal-500/40",
          textColor: "text-teal-300",
          terminalPrompt: "GameObject.FindObjectOfType<PlayerScript>()",
          codeLines: [
            "public class PlayerController : MonoBehaviour {",
            "  [SerializeField] float speed = 12f;",
            "  void Update() { MovePlayer(); }",
            "}"
          ],
          tags: ["Game Development", "Scripting", "Interactive"]
        };
      case "web-development-frontend":
      default:
        return {
          badge: "FULL-STACK • MODERN WEB",
          icon: Globe,
          accentColor: "from-violet-400 via-purple-500 to-pink-600",
          glowColor: "rgba(168, 85, 247, 0.25)",
          borderColor: "border-purple-500/40",
          textColor: "text-purple-300",
          terminalPrompt: "npm run dev --port 3000",
          codeLines: [
            "import { useState } from 'react';",
            "export default function App() {",
            "  return <NovaTech isAwesome={true} />;",
            "}"
          ],
          tags: ["Next.js", "Tailwind", "REST API"]
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-52 w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 border border-slate-800/80 transition-all duration-500 group-hover:border-sky-500/50 flex flex-col justify-between select-none"
    >
      {/* Background Cyber Grid & Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }}
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125"
        style={{ backgroundColor: theme.glowColor }}
      />
      <div
        className="pointer-events-none absolute -left-10 -bottom-10 h-36 w-36 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125"
        style={{ backgroundColor: theme.glowColor }}
      />

      {/* Top Header Badge & Live Terminal Status */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900/90 border border-slate-700/80 shadow-md">
            <IconComponent className={`h-4 w-4 ${theme.textColor}`} />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-slate-300">
            {theme.badge}
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-slate-950/80 px-2.5 py-1 border border-slate-800 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">READY</span>
        </div>
      </div>

      {/* Cyber Code Viewport */}
      <div className="relative z-10 my-auto rounded-xl bg-slate-950/80 border border-slate-800/90 p-2.5 backdrop-blur-md font-mono text-[11px] leading-relaxed shadow-inner">
        <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-800/60 text-[9px] text-slate-500">
          <span className="flex items-center gap-1">
            <Terminal className="h-2.5 w-2.5 text-sky-400" />
            {theme.terminalPrompt}
          </span>
          <span className="text-slate-400">interactive_lab</span>
        </div>
        <div className="space-y-0.5 text-slate-300">
          {theme.codeLines.map((line, idx) => (
            <div
              key={idx}
              className={`transition-colors duration-200 ${
                isHovered && idx === 3 ? "text-emerald-400 font-bold" : ""
              }`}
            >
              <span className="text-slate-600 select-none mr-2">{idx + 1}</span>
              <span className={idx === 0 ? theme.textColor : ""}>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tech Micro Pills */}
      <div className="relative z-10 flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          {theme.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-900/90 border border-slate-800 px-2 py-0.5 text-[9px] font-mono text-slate-400 font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>

        <span className={`text-[10px] font-bold ${theme.textColor} transition-transform duration-300 group-hover:translate-x-0.5`}>
          فتح المعمل ⚡
        </span>
      </div>
    </div>
  );
}
