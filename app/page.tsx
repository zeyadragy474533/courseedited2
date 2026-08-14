"use client";

import { useState } from "react";
import Link from "next/link";
import { allCourses, novaCourse } from "@/lib/course-data";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { LiveTicker } from "@/components/ui/live-ticker";
import { InteractiveCodeRunner } from "@/components/ui/interactive-code-runner";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { CourseCard } from "@/components/ui/course-card";
import { CourseGalleryLightbox } from "@/components/ui/course-gallery-lightbox";
import { ReviewsCarousel } from "@/components/ui/reviews-carousel";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { EnrollmentModal } from "@/components/ui/enrollment-modal";
import { Sparkles, Terminal, Code2, Cpu, Rocket, ShieldCheck, Check, ArrowRight, Flame } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState(novaCourse);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState<string>("All");

  const categories = ["All", "Systems & Core", "Game Dev", "Kids & Logic", "Web & Cloud"];

  const filteredCourses =
    activeCourseCategory === "All"
      ? allCourses
      : allCourses.filter((c) => c.category === activeCourseCategory);

  const handleEnrollClick = (course: typeof novaCourse) => {
    setSelectedCourseForEnroll(course);
    setIsEnrollModalOpen(true);
  };

  return (
    <main className="cyber-grid min-h-screen text-slate-100 selection:bg-sky-500/30 selection:text-white">
      {/* 1. High-Octane Hero Section */}
      <AnimatedHero />

      {/* 2. Live Tech & Announcement Marquee Ticker */}
      <LiveTicker />

      {/* 3. Interactive Live Code Sandbox / Terminal Section */}
      <section id="interactive-terminal" className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-300 mb-2.5">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span>محاكي كود C++ التفاعلي Live Sandbox</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            جرب كتابة وتشغيل الكود <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">الآن مباشرة!</span>
          </h2>
          <p className="mt-2.5 max-w-2xl mx-auto text-xs sm:text-base text-slate-300">
            في دورات Nova لا نكتفي بالمشاهدة — كل سطر كود تكتبه يتم تشغيله واختباره لمعرفة أدائه وسرعته.
          </p>
        </div>

        <InteractiveCodeRunner />
      </section>

      {/* 4. Interactive Project Lab: What You Will Build (Games, RAM Allocator, AI Algorithms) */}
      <ProjectShowcase />

      {/* 5. Explore All Courses & Specialized Bootcamps */}
      <section id="courses" className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300 mb-2.5">
              <Code2 className="h-3.5 w-3.5 text-sky-400" />
              المسارات والبرامج التدريبية
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
              اختر مسارك البرمجي <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">وابدأ رحلتك</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-300">
              دورات متخصصة ومصممة بعناية لتناسب جميع الأعمار والمستويات من المبتدئين حتى المتقدمين.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCourseCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCourseCategory === cat
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-105"
                    : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat === "All" ? "جميع الدورات" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnrollClick}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-slate-900/90 px-8 py-3.5 text-xs sm:text-sm font-bold text-sky-300 shadow-xl transition-all hover:bg-sky-500 hover:text-slate-950 hover:scale-105"
          >
            <span>استعراض جميع الكورسات بالتفصيل والمقارنة</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 6. Why Nova Technology - Animated Grid */}
      <section className="relative overflow-hidden py-8 sm:py-10 bg-slate-950/80 border-y border-slate-800/80">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              لماذا نحن مختلفون؟
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              منهجية تدريب بنيت على <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">الاحتراف الفعلي</span>
            </h2>
            <p className="mt-1.5 max-w-2xl mx-auto text-xs sm:text-sm text-slate-300">
              نركز على بناء العقلية البرمجية الحقيقية وتجهيزك لمسابقات البرمجة وسوق العمل العالمي.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-950/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">فهم عميق للهاردوير والذاكرة</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                من خلال لغة C++، بنفهمك إزاي المعالج بينفذ الكود، وإزاي الـ RAM والـ Pointers بتشتغل، مش مجرد نسخ كود بدون فهم!
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-sky-500/50 hover:shadow-xl hover:shadow-amber-950/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">حل مشكلات Codeforces & ICPC</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                تطوير مهارة الـ Problem Solving والتفكير الخوارزمي اللي بتأهلك لاجتياز المقابلات التقنية في أكبر الشركات.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-sky-500/50 hover:shadow-xl hover:shadow-emerald-950/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">متابعة شخصية مستمرة 1:1</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                مراجعة حية لكل كود بتكتبه مع اقتراح التحسينات وأفضل الممارسات (Clean Code) والتطبيق العملي المباشر.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Course Gallery Lightbox with Facebook Real Photos */}
      <CourseGalleryLightbox />

      {/* 8. Student Reviews and Testimonials */}
      <ReviewsCarousel />

      {/* 9. FAQ Section */}
      <FaqAccordion />

      {/* 10. High-Energy Bottom CTA Banner */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-500/50 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-sky-950/60 text-center">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-sky-500/30 blur-[100px] animate-pulse-glow" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-300 mb-5 shadow-sm">
              <Flame className="h-4 w-4 text-orange-400" />
              ابدأ رحلتك البرمجية الاحترافية اليوم
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              جاهز تبني أول ألعابك وبرامجك بـ C++ و Unity؟
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
              المقاعد محدودة جداً في كل دفعة لضمان المتابعة الفردية الدقيقة مع كل طالب. احجز مكانك الآن واستفد من خصم الـ 20%!
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3.5">
              <div className="w-full max-w-lg">
                <label htmlFor="cta-course-select" className="mb-2 block text-left text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                  اختر الكورس الذي تريد التسجيل فيه
                </label>
                <select
                  id="cta-course-select"
                  value={selectedCourseForEnroll.id}
                  onChange={(e) => {
                    const chosenCourse = allCourses.find((course) => course.id === e.target.value) ?? novaCourse;
                    setSelectedCourseForEnroll(chosenCourse);
                  }}
                  className="w-full rounded-2xl border border-sky-500/30 bg-slate-950/80 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-sky-950/30 outline-none ring-0 transition-all focus:border-sky-400"
                >
                  {allCourses.map((course) => (
                    <option key={course.id} value={course.id} className="bg-slate-900 text-white">
                      {course.titleAr}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsEnrollModalOpen(true)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 px-8 py-3.5 text-sm sm:text-base font-black text-white shadow-xl shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="h-5 w-5" />
                <span>حجز مقعدك في الكورس الآن 🚀</span>
              </button>
            </div>

            <div className="mt-5 flex flex-wrap justify-center items-center gap-5 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>ضمان استرداد الأموال</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>شهادة معتمدة بعد التخرج</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>ألعاب وتطبيقات حقيقية مع كل دورة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Enrollment Modal */}
      <EnrollmentModal
        course={selectedCourseForEnroll}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </main>
  );
}

