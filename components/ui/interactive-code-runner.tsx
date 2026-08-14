"use client";

import { useState } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, Code2, Activity, Cpu, Zap, Flame } from "lucide-react";
import { motion } from "motion/react";

interface CodePreset {
  id: string;
  name: string;
  lang: string;
  code: string;
  executionSteps: {
    line: number;
    delay: number;
    memoryState?: { address: string; varName: string; value: string; type: string }[];
    outputChunk: string;
    logMessage: string;
  }[];
  explanation: string;
  memoryDiagram: { address: string; name: string; val: string }[];
}

const PRESETS: CodePreset[] = [
  {
    id: "hello",
    name: "1. مرحباً بـ C++ (STL & Speed)",
    lang: "C++23",
    code: `#include <iostream>
#include <vector>
#include <string>

int main() {
    std::cout << "⚡ مرحباً بك في أكاديمية Nova! ⚡" << std::endl;
    
    std::vector<std::string> skills = {"C++", "Pointers", "OOP", "GameDev"};
    
    for (const auto& skill : skills) {
        std::cout << "  [✓] جاري تفعيل: " << skill << std::endl;
    }
    
    std::cout << "🚀 جاهز للانطلاق نحو الاحتراف!" << std::endl;
    return 0;
}`,
    executionSteps: [
      {
        line: 5,
        delay: 450,
        outputChunk: "===============================\n⚡ مرحباً بك في أكاديمية Nova! ⚡\n===============================\n\n",
        logMessage: "Executing main() entry point..."
      },
      {
        line: 8,
        delay: 500,
        memoryState: [
          { address: "0x7FFE_A100", varName: "skills[0]", value: "\"C++\"", type: "std::string" },
          { address: "0x7FFE_A120", varName: "skills[1]", value: "\"Pointers\"", type: "std::string" },
          { address: "0x7FFE_A140", varName: "skills[2]", value: "\"OOP\"", type: "std::string" },
          { address: "0x7FFE_A160", varName: "skills[3]", value: "\"GameDev\"", type: "std::string" }
        ],
        outputChunk: "🎯 تفعيل المهارات في الـ Heap:\n",
        logMessage: "Allocated std::vector with capacity 4 on heap"
      },
      {
        line: 11,
        delay: 400,
        outputChunk: "  [✓] جاري تفعيل: C++\n  [✓] جاري تفعيل: Pointers\n  [✓] جاري تفعيل: OOP\n  [✓] جاري تفعيل: GameDev\n\n",
        logMessage: "Iterating through vector elements via const-reference"
      },
      {
        line: 14,
        delay: 400,
        outputChunk: "🚀 جاهز للانطلاق نحو الاحتراف!\n\n[Process completed with exit code 0 in 0.0019ms]",
        logMessage: "Program terminated successfully with code 0."
      }
    ],
    explanation: "برنامج C++ حديث يوضح الإخراج السريع، واستخدام الـ Dynamic Vectors مع التحسين التلقائي للذاكرة.",
    memoryDiagram: [
      { address: "0x7FFF00", name: "skills.data()", val: "Heap [4 Elements]" },
      { address: "0x7FFF08", name: "skills.size()", val: "4" },
      { address: "0x7FFF10", name: "skills.capacity()", val: "4" }
    ]
  },
  {
    id: "pointers",
    name: "2. المؤشرات والذاكرة (Pointers & RAM)",
    lang: "C++23",
    code: `#include <iostream>

void doublePower(int* valuePtr) {
    // التعديل المباشر على عنوان الذاكرة في الـ RAM
    *valuePtr = (*valuePtr) * 2;
}

int main() {
    int heroPower = 500;
    std::cout << "🔹 طاقة البطل الأولية: " << heroPower << std::endl;
    std::cout << "📍 عنوان الذاكرة: " << &heroPower << std::endl;
    
    doublePower(&heroPower);
    
    std::cout << "💥 بعد مضاعفة الطاقة عبر Pointer: " << heroPower << std::endl;
    return 0;
}`,
    executionSteps: [
      {
        line: 9,
        delay: 500,
        memoryState: [
          { address: "0x7FFD_E1C4", varName: "heroPower", value: "500", type: "int (4 bytes)" }
        ],
        outputChunk: "🔹 طاقة البطل الأولية: 500\n",
        logMessage: "Allocated int heroPower at stack address 0x7ffd_e1c4"
      },
      {
        line: 10,
        delay: 450,
        outputChunk: "📍 عنوان الذاكرة في الـ RAM: 0x7ffd_e1c4\n",
        logMessage: "Read memory address pointer reference &heroPower"
      },
      {
        line: 12,
        delay: 600,
        memoryState: [
          { address: "0x7FFD_E1C4", varName: "heroPower", value: "1000", type: "int (DEREFERENCED)" },
          { address: "0x7FFD_E008", varName: "valuePtr", value: "0x7FFD_E1C4", type: "int*" }
        ],
        outputChunk: "⚡ جاري التعديل المباشر في الـ RAM via Pointer...\n",
        logMessage: "Dereferencing *valuePtr and assigning 500 * 2 = 1000"
      },
      {
        line: 14,
        delay: 450,
        outputChunk: "💥 بعد مضاعفة الطاقة عبر Pointer: 1000\n\n[Process completed with exit code 0 in 0.0012ms]",
        logMessage: "Memory modified in-place with zero overhead!"
      }
    ],
    explanation: "تطبيق حقيقي يوضح كيف يتم تعديل المتغيرات مباشرة في عناوين الـ RAM دون الحاجة لنسخ البيانات في الذاكرة.",
    memoryDiagram: [
      { address: "0x7FFD_E1C4", name: "heroPower", val: "1000 (int)" },
      { address: "0x7FFD_E008", name: "valuePtr", val: "-> 0x7FFD_E1C4" }
    ]
  },
  {
    id: "oop",
    name: "3. كائنات الروبوت (OOP & Robot Class)",
    lang: "C++23",
    code: `#include <iostream>
#include <string>

class NovaRobot {
private:
    std::string name;
    int battery = 100;

public:
    NovaRobot(std::string n) : name(n) {}

    void executeTask(std::string task) {
        battery -= 20;
        std::cout << "🤖 " << name << " يُنفذ: [" << task << "] | البطارية: " << battery << "%" << std::endl;
    }
};

int main() {
    NovaRobot bot("Nova-Prime");
    bot.executeTask("فحص أمان النظام");
    bot.executeTask("تجميع كود C++ الحصري");
    bot.executeTask("إطلاق مشروع التخرج");
    return 0;
}`,
    executionSteps: [
      {
        line: 17,
        delay: 500,
        memoryState: [
          { address: "0x8F00_0010", varName: "bot.name", value: "\"Nova-Prime\"", type: "std::string" },
          { address: "0x8F00_0038", varName: "bot.battery", value: "100", type: "int" }
        ],
        outputChunk: "🛡️ تم تهيئة كائن NovaRobot في الذاكرة بنجاح...\n",
        logMessage: "Constructor NovaRobot::NovaRobot(\"Nova-Prime\") executed"
      },
      {
        line: 18,
        delay: 450,
        memoryState: [
          { address: "0x8F00_0038", varName: "bot.battery", value: "80", type: "int" }
        ],
        outputChunk: "🤖 Nova-Prime يُنفذ: [فحص أمان النظام] | البطارية: 80%\n",
        logMessage: "Method executeTask(\"فحص أمان النظام\") executed"
      },
      {
        line: 19,
        delay: 450,
        memoryState: [
          { address: "0x8F00_0038", varName: "bot.battery", value: "60", type: "int" }
        ],
        outputChunk: "🤖 Nova-Prime يُنفذ: [تجميع كود C++ الحصري] | البطارية: 60%\n",
        logMessage: "Method executeTask(\"تجميع كود C++\") executed"
      },
      {
        line: 20,
        delay: 450,
        memoryState: [
          { address: "0x8F00_0038", varName: "bot.battery", value: "40", type: "int" }
        ],
        outputChunk: "🤖 Nova-Prime يُنفذ: [إطلاق مشروع التخرج] | البطارية: 40%\n\n[Process completed with exit code 0 in 0.0028ms]",
        logMessage: "Object lifecycle managed safely without memory leaks"
      }
    ],
    explanation: "تطبيق لمفاهيم البرمجة كائنية التوجه (OOP)، Encapsulation، وحماية البيانات داخل الـ Class.",
    memoryDiagram: [
      { address: "0x8F00_0010", name: "bot.name", val: "\"Nova-Prime\"" },
      { address: "0x8F00_0038", name: "bot.battery", val: "40%" }
    ]
  }
];

export function InteractiveCodeRunner() {
  const [selectedPreset, setSelectedPreset] = useState<CodePreset>(PRESETS[0]);
  const [code, setCode] = useState(PRESETS[0].code);
  const [isRunning, setIsRunning] = useState(false);
  const [activeExecutingLine, setActiveExecutingLine] = useState<number | null>(null);
  const [displayedOutput, setDisplayedOutput] = useState<string>(() => {
    return PRESETS[0].executionSteps.map((s) => s.outputChunk).join("");
  });
  const [liveMemory, setLiveMemory] = useState<{ address: string; varName: string; value: string; type: string }[]>(() => {
    return PRESETS[0].executionSteps[1]?.memoryState || [];
  });
  const [copied, setCopied] = useState(false);
  const [terminalTab, setTerminalTab] = useState<"terminal" | "memory" | "explanation">("terminal");
  const [executionLog, setExecutionLog] = useState<string>("Ready to execute");

  const handleSelectPreset = (preset: CodePreset) => {
    if (isRunning) return;
    setSelectedPreset(preset);
    setCode(preset.code);
    setActiveExecutingLine(null);
    setDisplayedOutput(preset.executionSteps.map((s) => s.outputChunk).join(""));
    setLiveMemory(preset.executionSteps[1]?.memoryState || []);
    setExecutionLog("Preset loaded. Click Run to execute.");
  };

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setDisplayedOutput("");
    setLiveMemory([]);
    setExecutionLog("Compiling with g++ -O3 -std=c++23...");

    const steps = selectedPreset.executionSteps;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setActiveExecutingLine(step.line);
      setExecutionLog(step.logMessage);

      if (step.memoryState) {
        setLiveMemory(step.memoryState);
      }

      // Typewriter append effect for realistic stream
      const chunk = step.outputChunk;
      for (let c = 0; c < chunk.length; c++) {
        setDisplayedOutput((prev) => prev + chunk[c]);
        if (c % 4 === 0) {
          await new Promise((r) => setTimeout(r, 12));
        }
      }

      await new Promise((r) => setTimeout(r, step.delay));
    }

    setActiveExecutingLine(null);
    setIsRunning(false);
    setExecutionLog("Execution finished successfully (0 errors).");
  };

  const handleReset = () => {
    if (isRunning) return;
    setCode(selectedPreset.code);
    setActiveExecutingLine(null);
    let initialText = "";
    selectedPreset.executionSteps.forEach((s) => {
      initialText += s.outputChunk;
    });
    setDisplayedOutput(initialText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = code.split("\n");

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-500/40 bg-slate-950/95 p-1.5 sm:p-2.5 shadow-2xl shadow-sky-950/60 backdrop-blur-2xl">
      {/* Decorative ambient gradient glowing effects */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/90 px-4 py-3 sm:px-6 rounded-t-[2.2rem]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/50" />
            <div className="h-3 w-3 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/50" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/50" />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Code2 className="h-4 w-4 text-sky-400 animate-pulse" />
            <span className="hidden sm:inline">Nova Live C++ Execution Engine</span>
            <span className="rounded-full bg-sky-500/20 border border-sky-500/40 px-2.5 py-0.5 text-[10px] font-black text-sky-300 uppercase tracking-wider">
              {selectedPreset.lang}
            </span>
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={isRunning}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedPreset.id === preset.id
                  ? "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-sky-500/30 scale-105"
                  : "border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-white"
              } disabled:opacity-50`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Visual Step Editor on Left, Live Terminal & RAM on Right */}
      <div className="grid lg:grid-cols-12 gap-0">
        {/* Left Col: Code Editor with Line Highlight */}
        <div className="border-b border-slate-800 lg:col-span-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-slate-800/70 bg-slate-950/80 px-4 py-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sky-300">main.cpp</span>
              <span className="text-[10px] text-slate-500 font-mono">GCC 14.2 • 64-bit • -O3 Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-slate-800 hover:text-white"
                title="Copy code"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "تم النسخ" : "نسخ"}</span>
              </button>
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-slate-800 hover:text-white disabled:opacity-50"
                title="Reset code"
              >
                <RotateCcw className="h-3 w-3" />
                <span>إعادة ضبط</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Container with line highlights */}
          <div className="relative h-[310px] sm:h-[350px] overflow-y-auto bg-slate-950/90 p-3.5 font-mono text-xs sm:text-sm leading-relaxed">
            {codeLines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const isCurrentExecuting = activeExecutingLine === lineNum;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-2 py-0.5 rounded-md transition-all duration-300 ${
                    isCurrentExecuting
                      ? "bg-sky-500/25 border-l-4 border-sky-400 shadow-lg shadow-sky-500/20 text-white font-bold"
                      : "text-slate-300 hover:bg-slate-900/50"
                  }`}
                >
                  <span className={`w-6 text-right select-none text-[11px] font-mono ${
                    isCurrentExecuting ? "text-sky-300 font-black" : "text-slate-600"
                  }`}>
                    {lineNum}
                  </span>
                  <span className="flex-1 whitespace-pre">
                    {lineText}
                  </span>
                  {isCurrentExecuting && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-sky-300 animate-pulse bg-sky-950/90 px-2 py-0.5 rounded border border-sky-500/40">
                      <Flame className="h-2.5 w-2.5 text-amber-400 animate-bounce" />
                      EXEC
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Execution Action Bar */}
          <div className="flex flex-wrap items-center justify-between border-t border-slate-800/80 bg-slate-900/70 px-4 py-3 gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] text-slate-400">{executionLog}</span>
            </div>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 px-6 py-2.5 text-xs font-black text-white shadow-xl shadow-sky-500/30 hover:scale-105 hover:shadow-sky-500/50 active:scale-95 transition-all disabled:opacity-50"
            >
              <Play className={`h-4 w-4 fill-current ${isRunning ? "animate-spin" : "group-hover:translate-x-0.5 transition-transform"}`} />
              <span>{isRunning ? "جاري تنفيذ السطور لحظياً..." : "تشغيل الكود الآن (Run) ⚡"}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Terminal & Memory Visualizer */}
        <div className="flex flex-col bg-slate-950/90 lg:col-span-5">
          {/* Tabs for Terminal vs Memory RAM vs Explanation */}
          <div className="flex items-center justify-between border-b border-slate-800/70 bg-slate-900/80 px-4 py-2 text-xs">
            <div className="flex gap-1.5">
              <button
                onClick={() => setTerminalTab("terminal")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-bold transition-all ${
                  terminalTab === "terminal"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>الطرفية (Terminal)</span>
              </button>
              <button
                onClick={() => setTerminalTab("memory")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-bold transition-all ${
                  terminalTab === "memory"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>الذاكرة (RAM)</span>
              </button>
              <button
                onClick={() => setTerminalTab("explanation")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-bold transition-all ${
                  terminalTab === "explanation"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>الشرح</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${isRunning ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
              <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">
                {isRunning ? "STREAMING" : "LIVE"}
              </span>
            </div>
          </div>

          {/* Tab Views */}
          <div className="flex-1 p-3 font-mono text-xs">
            {terminalTab === "terminal" && (
              <div className="relative h-[290px] sm:h-[330px] overflow-y-auto rounded-2xl bg-slate-950 p-4 border border-slate-800 shadow-inner flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-900 text-[10px] text-slate-500">
                    <span>bash /nova_runtime/cplusplus</span>
                    <span>stdout / UTF-8</span>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed text-emerald-400 font-mono text-xs sm:text-sm selection:bg-emerald-500/30">
                    {displayedOutput || (
                      <span className="text-slate-600">
                        {"// اضغط على زر \"تشغيل الكود الآن\" لرؤية التنفيذ اللحظي سطر بسطر..."}
                      </span>
                    )}
                  </pre>
                  {isRunning && (
                    <span className="inline-block h-3.5 w-2 bg-emerald-400 animate-pulse ml-1 align-middle" />
                  )}
                </div>

                <div className="pt-2 border-t border-slate-900/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-amber-400" />
                    Speed: 0.0019ms
                  </span>
                  <span className="text-sky-400">Nova Code Engine v4.2</span>
                </div>
              </div>
            )}

            {terminalTab === "memory" && (
              <div className="h-[290px] sm:h-[330px] overflow-y-auto rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-sky-400" />
                    خريطة الذاكرة الحية (RAM Memory Layout)
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    STACK & HEAP
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  تتبع مباشر لكيفية حجز المتغيرات والعناوين بالذاكرة في لغة C++:
                </p>

                <div className="space-y-2">
                  {liveMemory.length > 0 ? (
                    liveMemory.map((mem, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-xl border border-sky-500/30 bg-slate-950 p-2.5 flex items-center justify-between text-[11px]"
                      >
                        <div>
                          <span className="font-mono text-sky-400 font-bold">{mem.address}</span>
                          <span className="mx-2 text-slate-600">|</span>
                          <span className="text-white font-bold">{mem.varName}</span>
                          <span className="ml-2 text-[10px] text-slate-400">({mem.type})</span>
                        </div>
                        <div className="rounded bg-sky-500/20 px-2 py-0.5 font-bold text-emerald-400 border border-sky-500/30">
                          {mem.value}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center text-slate-500 text-xs">
                      اضغط على &quot;تشغيل الكود&quot; لمشاهدة حركة وتخصيص الذاكرة الحية!
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-slate-950/70 p-2.5 border border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Stack Pointer: 0x7FFF_E000</span>
                  <span>Heap Allocations: 0 Leaks ✓</span>
                </div>
              </div>
            )}

            {terminalTab === "explanation" && (
              <div className="h-[290px] sm:h-[330px] overflow-y-auto rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  {selectedPreset.name}
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  {selectedPreset.explanation}
                </p>

                <div className="rounded-xl bg-sky-950/70 p-3.5 border border-sky-800/60 text-sky-200 text-xs leading-relaxed space-y-1.5">
                  <div className="font-bold text-sky-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    لماذا نركز على C++ في Nova Technology؟
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    لأنها لغة محركات الألعاب (Unreal Engine)، والأنظمة فائقة السرعة، والذكاء الاصطناعي. من يفهم C++ يصبح قادراً على تعلم أي لغة برمجة أخرى خلال أيام قليلة!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
