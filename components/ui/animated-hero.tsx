"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { novaCourse, novaLogo, platformStats } from "@/lib/course-data";
import { Sparkles, Flame, CheckCircle2, ArrowLeft, Users, Award, Code2, Cpu, Gamepad2, Star, Zap } from "lucide-react";
import { EnrollmentModal } from "@/components/ui/enrollment-modal";

export function AnimatedHero() {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"visual" | "code">("visual");

  const statIcons = {
    Users: <Users className="h-5 w-5 text-sky-400" />,
    Award: <Award className="h-5 w-5 text-amber-400" />,
    Code2: <Code2 className="h-5 w-5 text-emerald-400" />,
    Sparkles: <Sparkles className="h-5 w-5 text-purple-400" />
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 pt-3 pb-10 sm:pt-6 sm:pb-14 border-b border-slate-800/80">
      {/* Background Animated Neon Gradients & Cyber Aura */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-gradient-to-tr from-sky-500/25 via-blue-600/20 to-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/4 -right-16 h-[300px] w-[300px] rounded-full bg-sky-500/20 blur-[90px]" />
      <div className="pointer-events-none absolute top-1/2 -left-16 h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Live Notification Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-500/30 bg-slate-900/90 p-2.5 sm:px-4 sm:py-2.5 shadow-lg shadow-sky-950/40 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="rounded-md bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-[11px] font-black text-sky-300">
              دفعة سبتمبر 2024
            </span>
            <span className="text-slate-300 hidden sm:inline">
              ⚡ باب التسجيل مفتوح الآن في معسكر C++ والبرمجة الاحترافية — المقاعد محدودة!
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span>4.9/5 (280+ تقييم)</span>
            </div>
            <button
              onClick={() => setIsEnrollOpen(true)}
              className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-1 font-bold text-white shadow-md hover:brightness-110 text-[11px]"
            >
              حجز مقعد فوراً ←
            </button>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Hero Left Content (7 Cols) */}
          <div className="lg:col-span-7 text-right">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/80 px-3.5 py-1.5 text-xs font-bold text-sky-300 shadow-md">
                <Flame className="h-4 w-4 text-orange-400 animate-bounce" />
                <span>أكاديمية Nova Technology للبرمجة الاحترافية</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3 py-1 text-[11px] font-bold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>🟢 تدريب حضوري وعبر الإنترنت</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.2]">
              تعلم البرمجة الحقيقية{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent underline decoration-sky-500/50 decoration-wavy decoration-2">
                بمشاريع وفهم عملي
              </span>
            </h1>

            {/* Description */}
            <p className="mt-3.5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300 font-medium">
              مش مجرد تلقين نظري! في <strong>Nova Technology</strong> بنبنيلك عقلية مبرمج محترف يفهم المنطق البرمجي، يتحكم في الذاكرة بـ C++، يصنع ألعاب بـ Unity، ويبني مشاريع برمجية متكاملة تفتح له أبواب سوق العمل.
            </p>

            {/* Trust Points Grid */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>تطبيق عملي من أول محاضرة</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>مشاريع تخرج فردية وجماعية</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>شهادات معتمدة ومتابعة مستمرة</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => setIsEnrollOpen(true)}
                className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 px-8 py-3.5 text-sm sm:text-base font-black text-white shadow-xl shadow-sky-500/30 transition-all hover:scale-105 hover:shadow-sky-500/50 active:scale-95"
              >
                <Sparkles className="h-5 w-5 fill-white/20 animate-spin" style={{ animationDuration: "8s" }} />
                <span>احجز مكانك في الكورس الآن 🚀</span>
              </button>

              <Link
                href="/courses"
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-bold text-slate-100 backdrop-blur-md transition-all hover:border-sky-500/60 hover:bg-slate-800 hover:scale-105"
              >
                <span>استكشف جميع الكورسات</span>
                <ArrowLeft className="h-4 w-4 text-sky-400" />
              </Link>
            </div>

            {/* Student Avatars & Coupon */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 space-x-reverse">
                  <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-sky-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    A
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    M
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    Z
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-slate-950 bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    +1.2k
                  </div>
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  انضم إلى أكثر من <strong className="text-white">1,200+ طالب</strong> تم تدريبهم بنجاح
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-emerald-950/70 border border-emerald-500/40 px-3 py-1.5 text-xs text-emerald-300 font-medium">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span>كود الخصم: <strong className="font-mono font-bold text-white">NOVA20</strong></span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Showcase (5 Cols) */}
          <div className="relative lg:col-span-5">
            {/* Top Badge */}
            <div className="absolute -top-4 -left-3 z-20 flex items-center gap-2 rounded-2xl border border-sky-400/50 bg-slate-950/95 px-3 py-2 shadow-xl shadow-sky-950/60 backdrop-blur-xl">
              <Cpu className="h-4 w-4 text-sky-400 animate-pulse" />
              <div>
                <div className="text-[10px] font-bold uppercase text-sky-400">RAM & Pointers</div>
                <div className="text-xs font-bold text-white">تحكم حقيقي بالذاكرة</div>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute -bottom-4 -right-3 z-20 flex items-center gap-2 rounded-2xl border border-amber-400/50 bg-slate-950/95 px-3 py-2 shadow-xl shadow-amber-950/60 backdrop-blur-xl">
              <Gamepad2 className="h-4 w-4 text-amber-400" />
              <div>
                <div className="text-[10px] font-bold uppercase text-amber-400">Game Engine</div>
                <div className="text-xs font-bold text-white">Unity 6 & C# Physics</div>
              </div>
            </div>

            {/* Main Featured Showcase Box */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-500/40 bg-slate-900/90 p-3 shadow-2xl shadow-sky-950/60 backdrop-blur-xl">
              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-slate-800/90 bg-slate-950/90 p-3 rounded-t-[2rem]">
                <div className="flex items-center gap-2.5">
                  <div className="overflow-hidden rounded-xl border border-sky-500/40 bg-slate-900/50 shadow-md">
                    <Image
                      src={novaLogo}
                      alt="Nova Technology Logo"
                      width={38}
                      height={38}
                      priority
                      className="h-8 w-8 object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">
                      الكورس الأكثر طلباً
                    </span>
                    <h3 className="text-xs font-bold text-white">{novaCourse.title}</h3>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                  <button
                    onClick={() => setActiveTab("visual")}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                      activeTab === "visual" ? "bg-sky-500 text-slate-950" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    الصورة
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                      activeTab === "code" ? "bg-sky-500 text-slate-950" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    الكود Live
                  </button>
                </div>
              </div>

              {/* Card Media / Code Display */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-b-[2rem] bg-slate-950">
                {activeTab === "visual" ? (
                  <>
                    <Image
                      src={novaCourse.coverImage}
                      alt={novaCourse.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Bottom overlay inside card */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-900/95 p-3 backdrop-blur-md">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-sky-400">تدريب عملي شامل</div>
                        <div className="text-sm font-black text-white">
                          ${novaCourse.price}{" "}
                          <span className="text-xs text-slate-400 line-through font-normal">${novaCourse.originalPrice}</span>
                        </div>
                      </div>
                      <Link
                        href={`/courses/${novaCourse.id}`}
                        className="rounded-xl bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-sky-400 transition-colors"
                      >
                        تفاصيل الكورس ←
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="h-full p-4 font-mono text-xs text-sky-300 overflow-y-auto bg-slate-950 leading-relaxed">
                    <p className="text-slate-500">{"// Nova Tech C++ Core Engine"}</p>
                    <p className="mt-1 text-purple-400">#include &lt;iostream&gt;</p>
                    <p className="text-purple-400">#include &lt;vector&gt;</p>
                    <p className="mt-2 text-blue-400">class <span className="text-amber-300">NovaStudent</span> &#123;</p>
                    <p className="pl-4 text-slate-300">public:</p>
                    <p className="pl-6 text-sky-200">void buildRealProjects() &#123;</p>
                    <p className="pl-8 text-emerald-400">std::cout &lt;&lt; &quot;🔥 C++ & Games Mastered!&quot;;</p>
                    <p className="pl-6 text-sky-200">&#125;</p>
                    <p className="text-blue-400">&#125;;</p>
                    <div className="mt-4 rounded-xl bg-sky-950/70 p-2.5 border border-sky-800 text-[11px] text-sky-200">
                      ⚡ يمكنك تجربة محاكي الكود التفاعلي أسفل هذه الواجهة لتشغيل برامج حقيقية سطر بسطر!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards Bar */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-10">
          {platformStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-4 text-center shadow-lg shadow-slate-950/40 backdrop-blur-xl transition-all hover:border-sky-500/50 hover:-translate-y-1"
            >
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 mb-2">
                {statIcons[stat.icon as keyof typeof statIcons] || <Sparkles className="h-4 w-4 text-sky-400" />}
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{stat.number}</div>
              <div className="mt-0.5 text-xs font-bold text-sky-300">{stat.label}</div>
              <div className="text-[10px] text-slate-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        course={novaCourse}
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />
    </section>
  );
}

