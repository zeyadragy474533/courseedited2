"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { novaLogo } from "@/lib/course-data";
import { useAuth } from "@/lib/auth-context";
import {
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LogIn,
  Zap,
  Code2,
  Cpu,
  ShieldCheck
} from "lucide-react";

// Official Google G SVG Icon
function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loginWithGoogle, openAuthModal } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickDemoFill = () => {
    setEmail("ahmed@example.com");
    setPassword("novaPass2026!");
    setError(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setIsSubmitting(true);
    const res = await login(email, password, rememberMe);
    setIsSubmitting(false);

    if (res.success) {
      router.push("/");
    } else {
      setError(res.error || "بيانات تسجيل الدخول غير صحيحة");
    }
  };

  return (
    <div className="relative min-h-[85vh] py-10 px-4 flex items-center justify-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-sky-500/15 blur-[120px]" />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Brand presentation */}
        <div className="hidden lg:block lg:col-span-6 text-right pr-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/80 px-3.5 py-1.5 text-xs font-bold text-sky-300 mb-4">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>بوابة الطلاب والمدربين</span>
          </div>

          <h1 className="text-4xl font-black text-white leading-tight">
            مرحباً بك في منصة{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Nova Technology
            </span>
          </h1>

          <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-md">
            سجل دخولك الآن لمتابعة محاضراتك البرمجية، الوصول إلى محررات الأكواد التفاعلية، والتواصل المباشر مع المدربين.
          </p>

          <div className="mt-8 space-y-3.5 max-w-md">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 shrink-0">
                <Code2 className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">مشاريع وتطبيقات واقعية</div>
                <div className="text-slate-400">تطبيق عملي خطوة بخطوة في C++ و Scratch</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">شهادات تخرج معتمدة</div>
                <div className="text-slate-400">تقييم مستمر لمستواك البرمجي</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-500/35 bg-slate-900/90 p-6 sm:p-8 shadow-2xl shadow-sky-950/60 backdrop-blur-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="overflow-hidden rounded-xl border border-sky-500/40 bg-slate-900 p-0.5">
                  <Image
                    src={novaLogo}
                    alt="Nova Technology"
                    width={36}
                    height={36}
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                    Nova Academy
                  </span>
                  <h2 className="text-2xl font-black text-white">تسجيل الدخول</h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="inline-flex items-center gap-1 rounded-xl border border-amber-500/40 bg-amber-950/40 px-2.5 py-1 text-[11px] font-bold text-amber-300 hover:bg-amber-900/60 transition-all"
                title="ملء بيانات حساب تجريبي جاهز"
              >
                <Zap className="h-3 w-3 text-amber-400" />
                <span>تجربة سريعة</span>
              </button>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() => loginWithGoogle()}
              className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:border-sky-500 hover:bg-slate-800/90 hover:scale-[1.01] active:scale-95 transition-all"
            >
              <GoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>المتابعة باستخدام Google (Continue with Google)</span>
            </button>

            {/* Or Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[11px] font-semibold uppercase">
                <span className="bg-slate-900 px-3 text-slate-400">أو عبر البريد الإلكتروني</span>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-2xl border border-rose-500/40 bg-rose-950/50 p-3 text-xs font-semibold text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-sky-400" />
                  <span>البريد الإلكتروني أو اسم المستخدم</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-sky-400" />
                    <span>كلمة المرور</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-bold text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-sky-500"
                  />
                  <span>تذكر بيانات دخولي على هذا الجهاز</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري التحقق...</span>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      <span>تسجيل الدخول الآن 🚀</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Switch to Signup */}
            <div className="mt-5 text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
              <span>ليس لديك حساب بعد؟ </span>
              <Link
                href="/signup"
                className="font-bold text-sky-400 hover:text-sky-300 hover:underline"
              >
                إنشاء حساب جديد الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
