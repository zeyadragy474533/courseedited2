"use client";

import { useState } from "react";
import { CourseModule, ModuleLesson } from "@/lib/course-data";
import { ChevronDown, PlayCircle, Code, Clock, FileCode, Sparkles, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CurriculumAccordionProps {
  syllabus: CourseModule[];
}

export function CurriculumAccordion({ syllabus }: CurriculumAccordionProps) {
  const [openModuleId, setOpenModuleId] = useState<string>(syllabus[0]?.id || "");
  const [activeLessonModal, setActiveLessonModal] = useState<ModuleLesson | null>(null);

  const toggleModule = (id: string) => {
    setOpenModuleId(openModuleId === id ? "" : id);
  };

  const getLessonIcon = (type: ModuleLesson["type"]) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-4 w-4 text-sky-400" />;
      case "lab":
        return <Code className="h-4 w-4 text-emerald-400" />;
      case "project":
        return <FileCode className="h-4 w-4 text-purple-400" />;
      default:
        return <BookOpen className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {syllabus.map((mod) => {
        const isOpen = openModuleId === mod.id;
        return (
          <div
            key={mod.id}
            className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
              isOpen
                ? "border-sky-500/50 bg-slate-900/90 shadow-xl shadow-sky-950/30"
                : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
            }`}
          >
            {/* Module Accordion Header */}
            <button
              onClick={() => toggleModule(mod.id)}
              className="flex w-full items-center justify-between p-5 sm:p-6 text-right transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-black text-sm transition-transform ${
                    isOpen
                      ? "bg-sky-500 text-slate-950 scale-110 shadow-lg shadow-sky-500/40"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {mod.moduleNumber}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-sky-400">{mod.duration}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{mod.lessonsCount} دروس وتطبيقات</span>
                  </div>
                  <h3 className="mt-1 text-base sm:text-lg font-bold text-white">
                    {mod.titleAr}
                  </h3>
                  <p className="hidden sm:block text-xs font-mono text-slate-400">{mod.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300">
                  {isOpen ? "إخفاء التفاصيل" : "عرض المحتوى"}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-sky-500 text-slate-950 border-sky-400" : ""
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </button>

            {/* Collapsible Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="border-t border-slate-800/80 bg-slate-950/40 p-5 sm:p-6"
                >
                  <p className="mb-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {mod.description}
                  </p>

                  <div className="space-y-2.5">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => lesson.codeSnippet && setActiveLessonModal(lesson)}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3.5 transition-all ${
                          lesson.codeSnippet
                            ? "cursor-pointer hover:border-sky-500/40 hover:bg-slate-900"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-xl bg-slate-800 p-2">
                            {getLessonIcon(lesson.type)}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                              <span>{lesson.titleAr}</span>
                              {lesson.codeSnippet && (
                                <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-sky-300">
                                  كود تفاعلي ⚡
                                </span>
                              )}
                            </h4>
                            <p className="mt-0.5 text-xs text-slate-400">{lesson.summary}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </span>
                          <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] uppercase font-bold text-slate-300">
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Interactive Code Snippet modal if clicked */}
      <AnimatePresence>
        {activeLessonModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
            onClick={() => setActiveLessonModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl border border-sky-500/40 bg-slate-900 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-400" />
                  {activeLessonModal.titleAr}
                </h4>
                <button
                  onClick={() => setActiveLessonModal(null)}
                  className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                >
                  إغلاق
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-300">{activeLessonModal.summary}</p>

              {activeLessonModal.codeSnippet && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-sky-300">
                  <pre className="overflow-x-auto">{activeLessonModal.codeSnippet}</pre>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
