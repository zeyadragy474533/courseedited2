import { CourseGalleryLightbox } from "@/components/ui/course-gallery-lightbox";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "معرض الصور وتدريبات الطلاب | Nova Technology",
  description: "استعرض صور معسكرات وورش عمل وتدريبات البرمجة وتكريم الطلاب في أكاديمية Nova Technology.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-bold text-slate-300 hover:border-sky-500/50 hover:text-white transition-colors"
        >
          <ArrowRight className="h-4 w-4 text-sky-400" />
          <span>العودة إلى الصفحة الرئيسية</span>
        </Link>
      </div>

      <CourseGalleryLightbox />
    </div>
  );
}
