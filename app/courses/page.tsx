"use client";

import { useState } from "react";
import Link from "next/link";
import { allCourses, Course } from "@/lib/course-data";
import { CourseCard } from "@/components/ui/course-card";
import { EnrollmentModal } from "@/components/ui/enrollment-modal";
import { Search, BookOpen, ArrowLeft, ArrowUpDown } from "lucide-react";

type SortOption = "popular" | "price-low" | "price-high" | "rating";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedCourse, setSelectedCourse] = useState<Course>(allCourses[0]);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const categories = ["All", "Systems & Core", "Game Dev", "Kids & Logic", "Web & Cloud"];
  const levels = ["All", "مبتدئ", "متوسط", "جميع المستويات"];

  const filteredCourses = allCourses
    .filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.titleAr.includes(searchQuery) ||
        c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.description.includes(searchQuery);

      const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || c.level.includes(selectedLevel);

      return matchesSearch && matchesCat && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.studentsCount - a.studentsCount;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setIsEnrollModalOpen(true);
  };

  return (
    <main className="min-h-screen pb-20 pt-10 text-slate-100">
      {/* Background Neon ambient */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-80 w-full max-w-5xl rounded-full bg-gradient-to-r from-sky-500/10 via-blue-600/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 mb-3">
              <BookOpen className="h-3.5 w-3.5 text-sky-400" />
              أكاديمية Nova Technology
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              استكشف جميع <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">الكورسات والمسارات</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-300">
              اختر لغة البرمجة أو التخصص الذي تريد إتقانه، واشترك في أقوى معسكرات التدريب العملي المباشر.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 self-start md:self-end rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

        {/* Search and Filters Bar */}
        <div className="my-8 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-xl">
          <div className="grid gap-4 md:grid-cols-12 items-center">
            {/* Search Input */}
            <div className="relative md:col-span-6">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن كورس (مثل: C++, Scratch, Unity, أو خوارزميات)..."
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-950 pr-11 pl-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Category selection */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-xs font-medium text-slate-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="All">جميع الفئات (All Categories)</option>
                <option value="Systems & Core">Systems & Core (C++)</option>
                <option value="Game Dev">Game Dev (C# / Unity)</option>
                <option value="Kids & Logic">Kids & Logic (Scratch)</option>
                <option value="Web & Cloud">Web & Cloud (Frontend)</option>
              </select>
            </div>

            {/* Sort selection */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full rounded-2xl border border-slate-700/80 bg-slate-950 px-4 py-3 text-xs font-medium text-slate-200 focus:border-sky-500 focus:outline-none"
                >
                  <option value="popular">الأكثر تسجيلاً (Most Popular)</option>
                  <option value="rating">الأعلى تقييماً (Top Rated)</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 ml-2">المسارات:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1 text-xs transition-all ${
                    selectedCategory === cat
                      ? "bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                      : "border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat === "All" ? "الكل" : cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 ml-2">المستوى:</span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`rounded-full px-3 py-0.5 text-[11px] transition-all ${
                    selectedLevel === lvl
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-slate-950 text-slate-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Listing */}
        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-white">لم يتم العثور على نتائج</h3>
            <p className="mt-1 text-xs text-slate-400">جرب البحث بكلمات أخرى أو اختر فئة مختلفة.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedLevel("All");
              }}
              className="mt-4 rounded-full bg-sky-500 px-5 py-2 text-xs font-bold text-slate-950"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        course={selectedCourse}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </main>
  );
}
