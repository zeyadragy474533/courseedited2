"use client";

import { useState, useRef } from "react";
import { Gamepad2, Cpu, Sparkles, Play, RotateCcw, Award, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState<"game" | "memory" | "algo">("game");

  // Game Simulator State
  const [score, setScore] = useState(0);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; hp: number }[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Memory Allocator Simulator State
  const [memoryBlocks, setMemoryBlocks] = useState([
    { address: "0x7FFE00", label: "Stack: main()", type: "stack", size: "64B", used: true },
    { address: "0x7FFE40", label: "Pointer *playerPtr", type: "pointer", size: "8B", used: true },
    { address: "0x00A1F0", label: "Heap: PlayerEntity", type: "heap", size: "128B", used: true },
    { address: "0x00A270", label: "Heap: DynamicArray", type: "heap", size: "256B", used: false },
    { address: "0x00A370", label: "Heap: TextureCache", type: "heap", size: "512B", used: false },
    { address: "0x00A570", label: "Free Memory Block", type: "free", size: "1024B", used: false },
  ]);
  const [activeMemoryAction, setActiveMemoryAction] = useState<string>("Normal state");

  // Pathfinding simulator
  const [gridState, setGridState] = useState<number[]>([
    1, 0, 0, 0, 0, 0,
    0, 2, 2, 0, 2, 0,
    0, 0, 2, 0, 2, 0,
    2, 0, 0, 0, 0, 3,
  ]);
  const [isSolving, setIsSolving] = useState(false);

  // Start mini game
  const startGame = () => {
    setIsPlayingGame(true);
    setScore(0);
    spawnTargets();
  };

  const spawnTargets = () => {
    const newTargets = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 70) + 15,
      hp: 100,
    }));
    setTargets(newTargets);
  };

  const shootTarget = (id: number) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore((s) => s + 100);
  };

  // Memory Allocation demo
  const allocateMemory = () => {
    setMemoryBlocks((prev) =>
      prev.map((b, i) => (i === 3 ? { ...b, used: true, label: "Heap: new EnemyInstance()" } : b))
    );
    setActiveMemoryAction("malloc(sizeof(EnemyInstance)) => تم حجز الذاكرة في Heap بنجاح!");
  };

  const freeMemory = () => {
    setMemoryBlocks((prev) =>
      prev.map((b, i) => (i === 3 ? { ...b, used: false, label: "Heap: DynamicArray" } : b))
    );
    setActiveMemoryAction("free(playerPtr) => تم تفريغ الذاكرة ومنع Memory Leak!");
  };

  // Pathfinding demo
  const solvePath = () => {
    setIsSolving(true);
    const steps = [1, 2, 8, 14, 20, 21, 22, 23];
    steps.forEach((index, i) => {
      setTimeout(() => {
        setGridState((prev) => {
          const next = [...prev];
          if (next[index] === 0) next[index] = 4; // Path visited
          return next;
        });
        if (i === steps.length - 1) {
          setIsSolving(false);
        }
      }, (i + 1) * 200);
    });
  };

  const resetPath = () => {
    setGridState([
      1, 0, 0, 0, 0, 0,
      0, 2, 2, 0, 2, 0,
      0, 0, 2, 0, 2, 0,
      2, 0, 0, 0, 0, 3,
    ]);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Background neon aura */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sky-500/10 blur-[100px]" />

      <div className="relative rounded-[2.5rem] border border-sky-500/30 bg-slate-900/80 p-6 sm:p-10 shadow-2xl shadow-sky-950/40 backdrop-blur-2xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 mb-3 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              مشاريع عملية تفاعلية Interactive Lab
            </div>
            <h2 className="text-2xl font-black text-white sm:text-4xl">
              ماذا ستبني وتبرمج بنفسك في <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Nova Technology</span>؟
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              اختر المشروع وشاهد المحاكي التفاعلي المباشر لطريقة عمله من الداخل:
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-950/80 p-1.5 border border-slate-800">
            <button
              onClick={() => setActiveTab("game")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "game"
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              <span>1. محرك ألعاب 2D/3D</span>
            </button>

            <button
              onClick={() => setActiveTab("memory")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "memory"
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Cpu className="h-4 w-4" />
              <span>2. محاكي الذاكرة C++ RAM</span>
            </button>

            <button
              onClick={() => setActiveTab("algo")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "algo"
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>3. خوارزميات ICPC الذكية</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === "game" && (
              <motion.div
                key="game-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 lg:grid-cols-12 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-400 border border-sky-500/20">
                    <Gamepad2 className="h-4 w-4" />
                    <span>مشروع برمجة محرك ألعاب C++</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    صناعة ألعاب من الصفر مع فيزياء الـ Collision والـ Particle Systems
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    ستتعلم كيفية برمجة حركة اللاعبين، اكتشاف التصادمات (Bounding Box Collisions)، ونظام إطلاق النار والمؤثرات البصرية، وحفظ النتيجة High Scores برمجياً!
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-sky-300">RigidBody2D</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-sky-300">DeltaTime Physics</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-sky-300">Game Loop (60 FPS)</span>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative overflow-hidden rounded-2xl border border-sky-500/40 bg-slate-950 p-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs">
                      <span className="font-mono text-sky-400">Nova Mini-Game Simulator</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-amber-400">النقاط: {score}</span>
                        <button
                          onClick={startGame}
                          className="flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-sky-400"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>{isPlayingGame ? "إعادة اللعب" : "ابدأ التجربة"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Canvas Stage */}
                    <div
                      ref={canvasRef}
                      className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center select-none"
                    >
                      {/* Cyber Grid pattern inside game */}
                      <div className="cyber-dots absolute inset-0 opacity-40" />

                      {isPlayingGame ? (
                        <>
                          <div className="absolute top-2 left-3 text-[11px] font-mono text-emerald-400">
                            FPS: 60 | Active Entities: {targets.length}
                          </div>
                          {targets.length === 0 ? (
                            <div className="text-center z-10">
                              <Award className="h-12 w-12 text-amber-400 mx-auto mb-2 animate-bounce" />
                              <div className="text-lg font-black text-white">فوز أسطوري! 🎉</div>
                              <div className="text-xs text-sky-300 mt-1">حققت {score} نقطة</div>
                              <button
                                onClick={spawnTargets}
                                className="mt-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg"
                              >
                                موجة جديدة من الوحوش 👾
                              </button>
                            </div>
                          ) : (
                            targets.map((t) => (
                              <button
                                key={t.id}
                                onClick={() => shootTarget(t.id)}
                                style={{ top: `${t.y}%`, left: `${t.x}%` }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 cursor-crosshair items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-lg shadow-rose-500/50 hover:scale-125 transition-transform active:scale-95 animate-pulse"
                              >
                                👾
                              </button>
                            ))
                          )}
                        </>
                      ) : (
                        <div className="text-center p-4 z-10">
                          <Gamepad2 className="h-10 w-10 text-sky-400 mx-auto mb-2 opacity-80" />
                          <p className="text-xs text-slate-300 mb-3">اضغط على زر البدء لتجربة محاكي التفاعل وإطلاق النار!</p>
                          <button
                            onClick={startGame}
                            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-sky-400 shadow-md"
                          >
                            <Play className="h-3.5 w-3.5 fill-current" />
                            <span>تشغيل المحاكي Live</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "memory" && (
              <motion.div
                key="memory-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 lg:grid-cols-12 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                    <Cpu className="h-4 w-4" />
                    <span>فهم إدارة الذاكرة والمؤشرات</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    محاكي حجز الذاكرة المباشر (Stack vs. Heap Memory)
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    في C++ ستكتسب مهارة لا يملكها مبرمجو اللغات الأخرى: فهم كيف يتم تخزين كل متغير، استخدام المؤشرات الذكية `std::unique_ptr`، ومنع الـ Memory Leaks نهائياً.
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={allocateMemory}
                      className="rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-sky-400 transition-all shadow-md"
                    >
                      + حجز كائن جديد (new / malloc)
                    </button>
                    <button
                      onClick={freeMemory}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-all"
                    >
                      - تفريغ الذاكرة (delete / free)
                    </button>
                  </div>
                  <div className="text-xs font-mono text-sky-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    حالة النظام: {activeMemoryAction}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs text-slate-400 font-mono">
                      <span>Address (RAM Hex)</span>
                      <span>Allocation State</span>
                    </div>

                    <div className="space-y-2">
                      {memoryBlocks.map((block, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between rounded-xl p-3 text-xs font-mono transition-all ${
                            block.used
                              ? "border border-sky-500/40 bg-sky-950/40 text-white"
                              : "border border-slate-800/80 bg-slate-900/30 text-slate-500"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sky-400 font-bold">{block.address}</span>
                            <span className="text-slate-300 font-sans">{block.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                              {block.size}
                            </span>
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                block.used ? "bg-emerald-400 shadow-sm shadow-emerald-400" : "bg-slate-700"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "algo" && (
              <motion.div
                key="algo-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 lg:grid-cols-12 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
                    <Zap className="h-4 w-4" />
                    <span>خوارزميات المسابقات البرمجية ICPC</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    محاكي خوارزميات البحث وتحديد المسار (A* & BFS)
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    حل المشكلات بذكاء وكفاءة! الكورس يعلمك كيفية تصميم خوارزميات لاكتشاف أقصر طريق وتجاوز العقبات في أجزاء من الميلي ثانية.
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={solvePath}
                      disabled={isSolving}
                      className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:scale-105 disabled:opacity-50 transition-all"
                    >
                      {isSolving ? "جاري الحساب خوارزمياً..." : "تشغيل خوارزمية البحث ⚡"}
                    </button>
                    <button
                      onClick={resetPath}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700"
                    >
                      إعادة ضبط
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-xs text-slate-400">
                      <span>خريطة الـ Grid التفاعلية (6x4)</span>
                      <span className="text-sky-300 font-mono">Algorithm: BFS Shortest Path</span>
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                      {gridState.map((cell, idx) => (
                        <div
                          key={idx}
                          className={`flex h-12 items-center justify-center rounded-xl font-bold text-xs transition-all ${
                            cell === 1
                              ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/40"
                              : cell === 2
                              ? "bg-rose-950/80 border border-rose-600/50 text-rose-300"
                              : cell === 3
                              ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40 animate-bounce"
                              : cell === 4
                              ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/40"
                              : "bg-slate-900 border border-slate-800 text-slate-600"
                          }`}
                        >
                          {cell === 1 ? "🚀" : cell === 2 ? "🧱" : cell === 3 ? "🎯" : cell === 4 ? "⭐" : ""}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                      <span>🚀 نقطة البداية</span>
                      <span>🧱 جدار عائق</span>
                      <span>⭐ المسار الذكي المكتشف</span>
                      <span>🎯 الهدف النهائي</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
