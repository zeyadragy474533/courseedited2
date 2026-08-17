import Image from "next/image";
import Link from "next/link";
import { novaLogo } from "@/lib/course-data";
import { MessageCircle, Mail, Phone, MapPin, Heart, Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950 pt-16 pb-12 overflow-hidden">
      {/* Background radial gradient */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-full max-w-5xl rounded-full bg-gradient-to-t from-sky-500/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3">
              <div className="overflow-hidden rounded-2xl border border-sky-500/40 bg-slate-900/80 p-0.5 shadow-lg shadow-sky-950/40">
                <Image
                  src={novaLogo}
                  alt="Nova Technology logo"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-[0.9rem] object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white">Nova Technology</span>
                <p className="text-xs text-sky-400 font-semibold">أكاديمية تعليم البرمجة والمشاريع</p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              منصتكم الأولى لتعلم لغات البرمجة من الصفر حتى الاحتراف: C++ و Scratch، مع التركيز على بناء عقلية المبرمج والتطبيق العملي.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 transition-transform hover:scale-110 hover:bg-emerald-900/50"
                title="WhatsApp Support"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@novatechnology.edu"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-950/40 text-sky-400 transition-transform hover:scale-110 hover:bg-sky-900/50"
                title="Email Us"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+201000000000"
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-950/40 text-indigo-400 transition-transform hover:scale-110 hover:bg-indigo-900/50"
                title="Call Support"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">روابط سريعة</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-sky-400 transition-colors">جميع الدورات والمعسكرات</Link>
              </li>
              <li>
                <Link href="/courses/cpp-programming-course" className="hover:text-sky-400 transition-colors">كورس C++ الشامل للمبتدئين والمحترفين</Link>
              </li>
              <li>
                <Link href="/#interactive-terminal" className="hover:text-sky-400 transition-colors">المحرر البرمجي التفاعلي Live</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-sky-400 transition-colors">معرض كواليس التدريبات</Link>
              </li>
            </ul>
          </div>

          {/* Featured Courses */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">المسارات المتاحة</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>C++ Programming Masterclass</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Scratch & Logic for Young Coders</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Problem Solving & Algorithms</span>
              </li>
            </ul>
          </div>

          {/* Guarantee & Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">ضمان الجودة</h4>
            <div className="mt-4 rounded-2xl border border-sky-500/30 bg-sky-950/40 p-4 text-xs text-sky-200">
              <div className="flex items-center gap-1.5 font-bold text-white mb-1">
                <Sparkles className="h-4 w-4 text-sky-400" />
                <span>شهادات معتمدة ومتابعة مستمرة</span>
              </div>
              يحصل كل متدرب على شهادة إتمام معتمدة بعد تسليم مشروع التخرج ومراجعته مع المدرب شخصياً.
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="h-4 w-4 text-sky-400 shrink-0" />
              <span>مقر التدريب: أونلاين عبر المنصة التفاعلية + ورش عمل دورية</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Nova Technology. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <span>صُنع بشغف لتمكين المبرمجين</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
