"use client";

import Link from "next/link";
import { Course } from "@/lib/course-data";
import { Star, Users, BookOpen, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { CourseCyberVisual } from "./course-cyber-visual";

interface CourseCardProps {
  course: Course;
  onEnroll?: (course: Course) => void;
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-800/90 bg-slate-900/80 p-2.5 shadow-xl shadow-slate-950/40 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-950/60"
    >
      {/* Top Cyber Interactive Visual Header */}
      <div className="relative">
        <CourseCyberVisual
          courseId={course.id}
          category={course.category}
          title={course.title}
        />

        {/* Level and Category Badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 z-20 pointer-events-none">
          <span className="rounded-full border border-sky-400/30 bg-slate-950/85 px-3 py-1 text-[11px] font-bold text-sky-300 backdrop-blur-md shadow-sm">
            {course.category}
          </span>
          {course.featured && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[10px] font-black text-slate-950 shadow-md">
              <Sparkles className="h-3 w-3 fill-current" />
              مميز 🔥
            </span>
          )}
        </div>

        {/* Rating overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-950/90 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md z-20 pointer-events-none">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{course.rating}</span>
          <span className="text-slate-400 text-[10px]">({course.reviewsCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold">
          <span>{course.brand}</span>
          <span>•</span>
          <span className="text-slate-300">{course.level}</span>
        </div>

        <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
          {course.titleAr}
        </h3>
        <p className="mt-0.5 font-mono text-xs text-slate-400">{course.title}</p>

        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-300">
          {course.shortDescription}
        </p>

        {/* Highlights */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-slate-800 bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-sky-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-sky-400" />
            <span>{course.lessonsCount} درس تطبيقي</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-sky-400" />
            <span>{course.studentsCount} طالب</span>
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-3.5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">${course.price}</span>
              <span className="text-xs text-slate-500 line-through">${course.originalPrice}</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400">وفر ${course.originalPrice - course.price} اليوم!</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/courses/${course.id}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-200 transition-colors hover:border-sky-500 hover:text-white"
              title="تفاصيل الكورس"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => onEnroll ? onEnroll(course) : null}
              className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-105 hover:shadow-sky-500/40 active:scale-95"
            >
              حجز ⚡
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

