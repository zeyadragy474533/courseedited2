"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  KeyRound,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [step, setStep] = useState<"request" | "done">("request");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      alert("يرجى إدخال بريد إلكتروني صالح");
      return;
    }
    setIsSubmitting(true);
    const result = await resetPassword(email);
    setIsSubmitting(false);

    if (result.success) {
      setStep("done");
    }
  };

  return (
    <div className="relative min-h-[85vh] py-10 px-4 flex items-center justify-center">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-sky-500/15 blur-[120px]" />

      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-[2.5rem] border border-sky-500/35 bg-slate-900/90 p-6 sm:p-8 shadow-2xl shadow-sky-950/60 backdrop-blur-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-lg shadow-sky-950/40">
              <KeyRound className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-white">استعادة كلمة المرور</h1>
            <p className="mt-1 text-xs text-slate-300">
              أدخل بريدك الإلكتروني وسنرسل لك كود التحقق لإعادة تعيين كلمة السر.
            </p>
          </div>

          {/* STEP 1: REQUEST */}
          {step === "request" && (
            <form onSubmit={handleRequestResetLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-sky-400" />
                  <span>البريد الإلكتروني المسجل في حسابك</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="rounded-2xl border border-sky-500/20 bg-sky-950/40 p-3 text-xs text-sky-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-sky-400" />
                <span>سنرسل لك رابطاً آمناً عبر Supabase لإعادة تعيين كلمة المرور فوراً.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? <span>جاري الإرسال...</span> : <span>إرسال رابط إعادة التعيين ✉️</span>}
              </button>
            </form>
          )}

          {/* STEP 4: DONE */}
          {step === "done" && (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-950/50">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black text-white">تم إرسال الرابط بنجاح! 🚀</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                أرسلنا رسالة إلى <strong className="text-sky-400 font-mono">{email}</strong> تحتوي على رابط مباشر لإعادة تعيين كلمة المرور. يرجى مراجعة صندوق الوارد (أو مجلد Spam).
              </p>
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-sky-400 transition-all"
              >
                <span>العودة لصفحة تسجيل الدخول ←</span>
              </Link>
            </div>
          )}

          {step !== "done" && (
            <div className="mt-5 text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 font-semibold text-slate-300 hover:text-sky-400"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                <span>العودة لتسجيل الدخول</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
