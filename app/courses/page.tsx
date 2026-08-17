"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allCourses, Course } from "@/lib/course-data";
import { CourseCard } from "@/components/ui/course-card";
import { EnrollmentModal } from "@/components/ui/enrollment-modal";
import {
  Search,
  BookOpen,
  ArrowLeft,
  ArrowUpDown,
  X,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type SortOption =
  | "popular"
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "rating";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedCourse, setSelectedCourse] = useState<Course>(allCourses[0]);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  // Dynamic counts for category pills
  const totalCount = allCourses.length;
  const cppCount = allCourses.filter((c) => c.category === "C++").length;
  const scratchCount = allCourses.filter((c) => c.category === "Scratch").length;

  const categories = [
    { id: "All", label: "جميع الكورسات", count: totalCount },
    { id: "C++", label: "كورس C++", count: cppCount },
    { id: "Scratch", label: "كورس Scratch", count: scratchCount }
  ];

  // Combined Search + Category Filter + Dynamic Sort
  const filteredAndSortedCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = allCourses.filter((course) => {
      // 1. Search Query Match
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.titleAr.toLowerCase().includes(query) ||
        course.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        course.description.toLowerCase().includes(query) ||
        course.shortDescription.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.level.toLowerCase().includes(query) ||
        course.syllabus.some(
          (mod) =>
            mod.title.toLowerCase().includes(query) ||
            mod.titleAr.toLowerCase().includes(query) ||
            mod.lessons.some(
              (les) =>
                les.title.toLowerCase().includes(query) ||
                les.titleAr.toLowerCase().includes(query)
            )
        );

      // 2. Category Filter Match
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // 3. Multi-option Sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.studentsCount - a.studentsCount;
        case "newest":
          return (
            new Date(b.createdAt || "2024-01-01").getTime() -
            new Date(a.createdAt || "2024-01-01").getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt || "2024-01-01").getTime() -
            new Date(b.createdAt || "2024-01-01").getTime()
          );
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setIsEnrollModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("popular");
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All" || sortBy !== "popular";

  return (
    <main className="min-h-screen pb-24 pt-8 text-slate-100 selection:bg-sky-500/30 selection:text-white">
      {/* Background Neon ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-6xl rounded-full bg-gradient-to-b from-sky-500/15 via-blue-600/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Navigation & Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 mb-3 shadow-sm">
              <BookOpen className="h-3.5 w-3.5 text-sky-400" />
              أكاديمية NOVA TECHNOLOGY
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              كورسات <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">C++ و Scratch</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              اختر الدورة المناسبة لك واشترك في أقوى معسكرات التدريب العملي المباشر وبناء المشاريع.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 self-start md:self-end rounded-full border border-slate-700 bg-slate-900/90 px-5 py-2.5 text-xs font-bold text-slate-200 backdrop-blur-md transition-all hover:border-sky-500 hover:text-white hover:scale-105 active:scale-95 shadow-md"
          >
            <ArrowLeft className="h-4 w-4 text-sky-400" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

        {/* Search, Sort, and Filter Control Center */}
        <div className="my-8 rounded-[2rem] border border-slate-800/90 bg-slate-900/70 p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-slate-950/50">
          <div className="grid gap-4 md:grid-cols-12 items-center">
            {/* Search Input Bar (Col 8) */}
            <div className="relative md:col-span-8">
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4 text-sky-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن كورس (C++ أو Scratch)..."
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/90 pr-11 pl-10 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 shadow-inner transition-all focus:border-sky-400 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  title="مسح البحث"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort selection Dropdown (Col 4) */}
            <div className="md:col-span-4">
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute right-3.5 text-slate-400">
                  <ArrowUpDown className="h-4 w-4 text-sky-400" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full appearance-none cursor-pointer rounded-2xl border border-slate-700/80 bg-slate-950/90 pr-10 pl-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 shadow-inner transition-all hover:border-slate-600 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="popular">الأكثر تسجيلاً (Most Popular)</option>
                  <option value="rating">الأعلى تقييماً (Top Rated)</option>
                  <option value="newest">الأحدث (Newest)</option>
                  <option value="oldest">الأقدم (Oldest)</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Pills & Result Metrics Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 ml-1">الكورسات المتاحة:</span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30 scale-105"
                        : "border border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        isActive
                          ? "bg-slate-950/20 text-slate-950 font-black"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results Count & Reset Filter Indicator */}
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400">
                عرض <strong className="text-sky-400">{filteredAndSortedCourses.length}</strong> من أصل {allCourses.length} كورس
              </span>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>إعادة تعيين</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Courses Grid or Empty State */}
        <AnimatePresence mode="wait">
          {filteredAndSortedCourses.length > 0 ? (
            <motion.div
              key="courses-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
            >
              {filteredAndSortedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnroll}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl backdrop-blur-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-4 shadow-lg shadow-sky-950/50">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">لا توجد نتائج مطابقة لبحثك</h3>
              {searchQuery && (
                <p className="mt-2 text-sm text-slate-400">
                  لم نتمكن من العثور على أي كورس يطابق: &quot;<span className="text-sky-300 font-semibold">{searchQuery}</span>&quot;
                </p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                تأكد من كتابة اسم الكورس بشكل صحيح (C++ أو Scratch) أو أعد ضبط خيارات البحث.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>إعادة تعيين البحث والفلاتر</span>
                </button>
                <Link
                  href="/"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Academy Guarantee Banner */}
        <div className="mt-14 rounded-3xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl text-center max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-sky-400" />
              <span>شهادات تخرج معتمدة من Nova Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>مشاريع برمجية حقيقية وتطبيق أسبوعي</span>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
              <span>متابعة شخصية 1:1 لكل طالب</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Enrollment Modal */}
      <EnrollmentModal
        course={selectedCourse}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </main>
  );
}
