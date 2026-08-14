"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { novaLogo, novaCourse } from "@/lib/course-data";
import { Sparkles, Terminal, Menu, X, BookOpen, Layers } from "lucide-react";
import { EnrollmentModal } from "@/components/ui/enrollment-modal";
import { motion, AnimatePresence } from "motion/react";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl transition-all">
        {/* Top notice bar */}
        <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 px-4 py-1.5 text-center text-xs font-semibold text-white shadow-inner">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
            <span className="animate-pulse">🔥</span>
            <span>خصم 20% لفترة محدودة على كورس C++ مع كود: <strong>NOVA20</strong></span>
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="underline decoration-white/60 hover:text-sky-200 ml-2"
            >
              احجز الآن ←
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Nova Technology home page">
            <div className="relative overflow-hidden rounded-2xl border border-sky-500/40 bg-slate-900/80 p-0.5 shadow-lg shadow-sky-950/40 transition-transform group-hover:scale-105 group-hover:border-sky-400">
              <Image
                src={novaLogo}
                alt="Nova Technology logo"
                width={42}
                height={42}
                className="h-10 w-10 rounded-[0.9rem] object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  Nova Technology
                </span>
                <span className="rounded-full bg-sky-500/20 px-1.5 py-0.2 text-[10px] font-bold text-sky-400">
                  ACADEMY
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">صناعة أبطال البرمجة</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-sky-400"
            >
              الرئيسية
            </Link>
            <Link
              href="/courses"
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-sky-400 flex items-center gap-1.5"
            >
              <BookOpen className="h-4 w-4 text-sky-400" />
              الكورسات
            </Link>
            <Link
              href="/#interactive-terminal"
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-sky-400 flex items-center gap-1.5"
            >
              <Terminal className="h-4 w-4 text-emerald-400" />
              محرر الكود Live
            </Link>
            <Link
              href="/gallery"
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-sky-400 flex items-center gap-1.5"
            >
              <Layers className="h-4 w-4 text-purple-400" />
              معرض الصور
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="hidden rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-xs font-bold text-slate-200 transition-all hover:border-slate-500 hover:text-white sm:inline-flex"
            >
              تصفح البرامج
            </Link>
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="relative group flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-105 hover:shadow-sky-500/40 active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              <span>تسجيل دخول</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-slate-800 bg-slate-950/95 px-6 py-6 backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl p-2 text-base font-bold text-white hover:bg-slate-900"
                >
                  الرئيسية
                </Link>
                <Link
                  href="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl p-2 text-base font-bold text-white hover:bg-slate-900"
                >
                  <BookOpen className="h-4 w-4 text-sky-400" />
                  الكورسات التعليمية
                </Link>
                <Link
                  href="/#interactive-terminal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl p-2 text-base font-bold text-white hover:bg-slate-900"
                >
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  محرر كود C++ التفاعلي
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl p-2 text-base font-bold text-white hover:bg-slate-900"
                >
                  <Layers className="h-4 w-4 text-purple-400" />
                  معرض صور التدريبات
                </Link>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsEnrollModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3.5 text-sm font-bold text-slate-950"
                  >
                    <Sparkles className="h-4 w-4" />
                    احجز مقعدك الآن
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Quick Global Enrollment Modal */}
      <EnrollmentModal
        course={novaCourse}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </>
  );
}
