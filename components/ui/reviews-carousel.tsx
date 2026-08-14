"use client";

import { studentReviews } from "@/lib/course-data";
import { Star, MessageSquare, Quote, CheckCircle2 } from "lucide-react";

export function ReviewsCarousel() {
  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      {/* Ambient background aura */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-full max-w-5xl rounded-full bg-sky-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300 mb-2.5">
              <MessageSquare className="h-3.5 w-3.5 text-sky-400" />
              تجارب حقيقية وقصص نجاح
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
              آراء وتقييمات طلاب <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">Nova Technology</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-300">
              استمع لما يقوله خريجونا وأولياء الأمور عن أثر المعسكرات البرمجية والتحول العملي.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-xs font-bold text-sky-300 shadow-md">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>تقييم عام 4.9/5 من +1,200 طالب</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {studentReviews.map((rev) => (
            <div
              key={rev.id}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/40 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/60 hover:-translate-y-1.5"
            >
              <Quote className="absolute top-5 left-5 h-7 w-7 text-sky-500/15" />

              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-slate-200 italic">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-lg border border-sky-500/30">
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                    <p className="text-[10px] text-slate-400">{rev.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>طالب معتمد</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

