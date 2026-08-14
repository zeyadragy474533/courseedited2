"use client";

import { useState } from "react";
import { faqItems } from "@/lib/course-data";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300 mb-2.5">
            <HelpCircle className="h-3.5 w-3.5 text-sky-400" />
            الأسئلة الشائعة FAQ
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            كل ما تود معرفته عن دورات <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">Nova</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-sky-400/60 bg-slate-900/90 shadow-xl shadow-sky-950/30"
                    : "border-slate-800/80 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-right transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {item.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition-transform duration-300 mr-3 ${
                      isOpen ? "rotate-180 bg-sky-500 text-slate-950 border-sky-400" : ""
                    }`}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-800/80 bg-slate-950/50 p-4 sm:p-5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

