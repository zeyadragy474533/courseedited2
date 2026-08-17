"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Compass, Home, BookOpen, ArrowRight, Sparkles, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background glow & cosmic circles */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-sky-600/20 via-indigo-600/15 to-purple-600/20 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-xl w-full text-center rounded-[2.5rem] border border-sky-500/30 bg-slate-900/90 p-8 sm:p-12 shadow-2xl shadow-sky-950/60 backdrop-blur-2xl"
      >
        {/* Animated 404 Badge */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/40 text-sky-400 shadow-xl shadow-sky-500/20"
        >
          <Compass className="h-12 w-12 text-sky-400 animate-spin" style={{ animationDuration: "12s" }} />
        </motion.div>

        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300 mb-4">
          <Sparkles className="h-3.5 w-3.5 text-sky-400" />
          <span>خطأ 404 — الصفحة غير موجودة</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3">
          ضيعت المسار البرمجي؟ 🚀
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
          يبدو أن الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها. لا تقلق، يمكنك استكمال رحلتك البرمجية من خلال الروابط السريعة أدناه:
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>العودة للرئيسية</span>
          </Link>

          <Link
            href="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-slate-200 hover:border-sky-500/60 hover:text-white hover:bg-slate-800 transition-all"
          >
            <BookOpen className="h-4 w-4 text-sky-400" />
            <span>استعراض الكورسات</span>
          </Link>

          <Link
            href="/#interactive-terminal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 px-5 py-3.5 text-sm font-bold text-emerald-300 hover:bg-emerald-900/50 transition-all"
          >
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>المحرر Live</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
