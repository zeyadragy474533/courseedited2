"use client";

import { Flame, Zap, Trophy, ShieldCheck, Terminal, Code2, Users } from "lucide-react";

export function LiveTicker() {
  const items = [
    { icon: <Flame className="h-4 w-4 text-orange-400" />, text: "🔥 فتح باب الحجز لدفعة C++ و Unity الجديدة - المقاعد محدودة!" },
    { icon: <Zap className="h-4 w-4 text-amber-400" />, text: "⚡ كود خصم إضافي 20%: NOVA20 متاح للمسجلين اليوم" },
    { icon: <Trophy className="h-4 w-4 text-yellow-400" />, text: "🏆 تدريب مكثف على حل مشكلات ICPC & Codeforces" },
    { icon: <Code2 className="h-4 w-4 text-sky-400" />, text: "💻 مشاريع عملية واقعية: محركات ألعاب + برامج عالية الأداء" },
    { icon: <Users className="h-4 w-4 text-emerald-400" />, text: "👥 متابعة شخصية 1:1 مع كل طالب ومراجعة تفصيلية للكود" },
    { icon: <ShieldCheck className="h-4 w-4 text-teal-400" />, text: "🎓 شهادة تخرج معتمدة بعد مناقشة مشروع التخرج النهائي" },
    { icon: <Terminal className="h-4 w-4 text-indigo-400" />, text: "🧠 فهم حقيقي للـ RAM والـ Pointers والهندسة المعمارية" },
  ];

  return (
    <div className="relative border-y border-sky-500/20 bg-slate-950/90 py-2.5 overflow-hidden backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent" />

      <div className="animate-marquee gap-8 items-center text-xs font-semibold text-slate-300">
        {/* First copy */}
        {items.map((item, idx) => (
          <div key={`ticker-1-${idx}`} className="flex items-center gap-2 whitespace-nowrap px-3">
            {item.icon}
            <span>{item.text}</span>
            <span className="text-slate-700 mx-2">•</span>
          </div>
        ))}
        {/* Second copy for smooth loop */}
        {items.map((item, idx) => (
          <div key={`ticker-2-${idx}`} className="flex items-center gap-2 whitespace-nowrap px-3">
            {item.icon}
            <span>{item.text}</span>
            <span className="text-slate-700 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
