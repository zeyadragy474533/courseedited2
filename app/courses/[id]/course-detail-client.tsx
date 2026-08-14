"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Course, novaLogo } from "@/lib/course-data";
import { CurriculumAccordion } from "@/components/ui/curriculum-accordion";
import { InteractiveCodeRunner } from "@/components/ui/interactive-code-runner";
import { EnrollmentModal } from "@/components/ui/enrollment-modal";
import { CourseCard } from "@/components/ui/course-card";
import { CourseCyberVisual } from "@/components/ui/course-cyber-visual";
import {
  Star,
  Users,
  Clock,
  BookOpen,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Terminal,
  Zap
} from "lucide-react";

interface CourseDetailClientProps {
  course: Course;
  relatedCourses: Course[];
}

export function CourseDetailClient({ course, relatedCourses }: CourseDetailClientProps) {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedEnrollCourse, setSelectedEnrollCourse] = useState<Course>(course);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleOpenEnroll = (c?: Course) => {
    setSelectedEnrollCourse(c || course);
    setIsEnrollModalOpen(true);
  };

  return (
    <main className="min-h-screen pb-24 text-slate-100 selection:bg-sky-500/30 selection:text-white">
      {/* Hero Banner with Course Information */}
      <section className="relative overflow-hidden pt-8 pb-16">
        {/* Neon Ambient Background */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-6xl rounded-full bg-gradient-to-b from-sky-500/15 via-blue-600/10 to-transparent blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-bold text-slate-300 transition-colors hover:border-slate-600 hover:text-white backdrop-blur-md"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← العودة لكل الكورسات</span>
            </Link>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white backdrop-blur-md"
            >
              <Share2 className="h-3.5 w-3.5 text-sky-400" />
              <span>{copiedLink ? "تم نسخ الرابط!" : "مشاركة الكورس"}</span>
            </button>
          </div>

          {/* Main Course Hero Grid */}
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Left Col: Course Info */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <div className="overflow-hidden rounded-xl border border-sky-500/40 bg-slate-900/60 p-0.5">
                  <Image
                    src={novaLogo}
                    alt="Nova Technology Logo"
                    width={36}
                    height={36}
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                  {course.brand} • {course.category}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                {course.titleAr}
              </h1>
              <p className="mt-2 font-mono text-sm text-slate-400">{course.title}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 border border-slate-800">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{course.rating}</span>
                  <span className="text-slate-400">({course.reviewsCount} تقييم)</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 border border-slate-800">
                  <Users className="h-4 w-4 text-sky-400" />
                  <span>{course.studentsCount} طالب ملتحق</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 border border-slate-800">
                  <Clock className="h-4 w-4 text-sky-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 border border-slate-800">
                  <BookOpen className="h-4 w-4 text-sky-400" />
                  <span>{course.lessonsCount} درس وتطبيق</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-sky-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-3">عن هذا المعسكر التدريبي</h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Right Col: Course Pricing & Sticky Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 overflow-hidden rounded-[2.5rem] border border-sky-500/30 bg-slate-900/80 p-5 shadow-2xl shadow-sky-950/50 backdrop-blur-xl">
                {/* Cyber Visual Header */}
                <div className="relative">
                  <CourseCyberVisual
                    courseId={course.id}
                    category={course.category}
                    title={course.title}
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-black text-slate-950 shadow-lg z-20">
                    خصم خاص متاح 🔥
                  </div>
                </div>

                {/* Price block */}
                <div className="mt-6 flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black text-white">${course.price}</span>
                      <span className="text-lg text-slate-500 line-through">${course.originalPrice}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">وفر ${course.originalPrice - course.price} عند التسجيل الآن</span>
                  </div>

                  <span className="rounded-full border border-sky-500/30 bg-sky-950/60 px-3 py-1 text-xs font-bold text-sky-300">
                    كود: NOVA20
                  </span>
                </div>

                {/* Main Action Button */}
                <button
                  type="button"
                  onClick={() => handleOpenEnroll()}
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 py-4 text-base font-black text-white shadow-xl shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Zap className="h-5 w-5 fill-current" />
                  <span>حجز مقعدك في الكورس الآن 🚀</span>
                </button>

                {/* Features Included List */}
                <div className="mt-6 border-t border-slate-800/80 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    يشمل هذا المعسكر:
                  </h4>
                  <ul className="space-y-3 text-xs text-slate-300">
                    {course.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Syllabus Modules Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 mb-2">
            <BookOpen className="h-3.5 w-3.5 text-sky-400" />
            المنهج وخطة التدريب
          </div>
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            ماذا ستتعلم في هذا الكورس بالتفصيل؟
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            تصفح أسابيع التدريب والمواضيع والدروس والتطبيقات العملية خطوة بخطوة.
          </p>
        </div>

        <CurriculumAccordion syllabus={course.syllabus} />
      </section>

      {/* Live Interactive Code Sandbox */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 mb-2">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            تجربة كتابة الكود لايف
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            جرب محاكي C++ التفاعلي واختبر الأكواد الآن
          </h3>
        </div>

        <InteractiveCodeRunner />
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">المسارات ذات الصلة</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">كورسات أخرى قد تهمك</h3>
            </div>
            <Link href="/courses" className="text-xs font-bold text-sky-400 hover:underline">
              عرض الجميع ←
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedCourses.map((rc) => (
              <CourseCard key={rc.id} course={rc} onEnroll={handleOpenEnroll} />
            ))}
          </div>
        </section>
      )}

      {/* Global Enrollment Modal */}
      <EnrollmentModal
        course={selectedEnrollCourse}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </main>
  );
}
