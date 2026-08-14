"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { novaCourseGallery } from "@/lib/course-data";
import { X, ChevronLeft, ChevronRight, Sparkles, ZoomIn, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  id?: string;
  url: string;
  title: string;
  caption: string;
  category: string;
  location?: string;
  date?: string;
  tag?: string;
}

function GalleryTiltCard({
  image,
  index,
  onOpen
}: {
  image: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>("");
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      style={{
        transform: transformStyle || undefined,
        transition: "transform 0.15s ease-out, box-shadow 0.25s ease-out"
      }}
      className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-2.5 shadow-xl shadow-slate-950/60 backdrop-blur-xl hover:border-sky-400/70 hover:shadow-2xl hover:shadow-sky-950/50 transition-all duration-300"
    >
      {/* Glare spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(56, 189, 248, 0.4) 0%, transparent 65%)`,
          opacity: glarePosition.opacity
        }}
      />

      {/* Image Container with high clarity */}
      <div className="relative h-72 w-full overflow-hidden rounded-[1.6rem] bg-slate-950">
        <Image
          src={image.url}
          alt={image.title}
          fill
          priority={index < 4}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:contrast-105"
        />

        {/* Dynamic Dark Gradient for Perfect Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-sky-400/40 bg-slate-950/90 px-3 py-1 text-[11px] font-bold text-sky-300 backdrop-blur-md shadow-md">
            {image.category}
          </span>
          {image.tag && (
            <span className="rounded-full border border-slate-700 bg-slate-900/90 px-2.5 py-1 text-[10px] font-semibold text-slate-300 backdrop-blur-md">
              {image.tag}
            </span>
          )}
        </div>

        {/* Hover Click / Zoom Cue */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full border border-sky-400/60 bg-slate-950/95 px-4 py-2 text-xs font-bold text-sky-300 shadow-2xl shadow-sky-500/40 backdrop-blur-md">
            <ZoomIn className="h-4 w-4" />
            <span>عرض الصورة بدقة كاملة</span>
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5">
          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium mb-1.5">
            {image.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-sky-400" />
                {image.location}
              </span>
            )}
            {image.date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-sky-400" />
                {image.date}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
            {image.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs text-slate-300 leading-relaxed">
            {image.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CourseGalleryLightbox() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = [
    { id: "All", label: "الكل", count: novaCourseGallery.length },
    { id: "Coding", label: "معسكر C++", count: novaCourseGallery.filter((i) => i.category === "Coding").length },
    { id: "Workshop", label: "ورش العمل", count: novaCourseGallery.filter((i) => i.category === "Workshop").length },
    { id: "Mentorship", label: "التوجيه الفردي", count: novaCourseGallery.filter((i) => i.category === "Mentorship").length },
    { id: "Projects", label: "مشاريع التخرج", count: novaCourseGallery.filter((i) => i.category === "Projects").length },
    { id: "Community", label: "مجتمع الطلاب", count: novaCourseGallery.filter((i) => i.category === "Community").length },
    { id: "Awards", label: "التكريم والشهادات", count: novaCourseGallery.filter((i) => i.category === "Awards").length }
  ].filter(cat => cat.count > 0);

  const filteredImages =
    activeFilter === "All"
      ? novaCourseGallery
      : novaCourseGallery.filter((item) => item.category === activeFilter);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="relative overflow-hidden py-8 sm:py-10">
      {/* Decorative ambient orbs */}
      <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 h-80 w-full max-w-5xl rounded-full bg-gradient-to-r from-sky-500/15 via-blue-600/15 to-purple-600/15 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Title with Live Badge */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-300 mb-2 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
              <span>معرض صور تدريبات Nova الحقيقية</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              كواليس المعسكرات <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">ولحظات الإنجاز</span>
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-slate-300">
              شاهد لقطات حية من القاعات التدريبية، تفاعل الطلاب مع الكود، وتكريم الأبطال في معسكرات Nova Technology.
            </p>
          </div>

          {/* Interactive Categories Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeFilter === cat.id
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 scale-105"
                    : "border border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] rounded-full px-1.5 py-0.2 ${
                  activeFilter === cat.id ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Tilt Gallery Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image, index) => (
            <GalleryTiltCard
              key={`${image.url}-${index}`}
              image={image}
              index={index}
              onOpen={() => handleOpenLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* High-Fidelity Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-2xl"
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-white shadow-2xl transition-transform hover:scale-110 hover:bg-slate-800"
              aria-label="Close image modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-white shadow-2xl transition-transform hover:scale-110 hover:bg-slate-800 sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-white shadow-2xl transition-transform hover:scale-110 hover:bg-slate-800 sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Main Frame */}
            <div
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[2.5rem] border border-sky-500/40 bg-slate-900 p-2 shadow-2xl shadow-sky-950/60"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[55vh] w-[88vw] max-w-4xl sm:h-[65vh]">
                <Image
                  src={filteredImages[selectedImageIndex].url}
                  alt={filteredImages[selectedImageIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Lightbox details footer */}
              <div className="border-t border-slate-800/90 bg-slate-950/95 p-5 sm:p-6 rounded-b-[2.3rem]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="rounded-full bg-sky-500/20 border border-sky-500/30 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-sky-300">
                        {filteredImages[selectedImageIndex].category}
                      </span>
                      {filteredImages[selectedImageIndex].location && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="h-3 w-3 text-sky-400" />
                          {filteredImages[selectedImageIndex].location}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {filteredImages[selectedImageIndex].title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {filteredImages[selectedImageIndex].caption}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                    <span className="text-xs font-mono text-sky-400 font-bold">
                      صورة {selectedImageIndex + 1} من {filteredImages.length}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Nova Technology Official Archive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
