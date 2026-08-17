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
  User,
  Phone,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  ShieldCheck,
  CheckCircle2
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

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "bg-slate-700" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: "ضعيفة", color: "bg-rose-500" };
    if (score === 2) return { score: 50, label: "متوسطة", color: "bg-amber-500" };
    if (score === 3) return { score: 75, label: "جيدة", color: "bg-sky-500" };
    return { score: 100, label: "قوية جداً 🛡️", color: "bg-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("يرجى إدخال الاسم بالكامل");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("يرجى إدخال بريد إلكتروني صالح");
      return;
    }
    if (!phone.trim()) {
      setError("يرجى إدخال رقم الهاتف للتواصل");
      return;
    }
    if (password.length < 6) {
      setError("كلمة المرور يجب ألا تقل عن 6 أحرف");
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    if (!acceptTerms) {
      setError("يجب الموافقة على شروط الاستخدام للمتابعة");
      return;
    }

    setIsSubmitting(true);
    const res = await signup({ name, email, phone, password });
    setIsSubmitting(false);

    if (res.success) {
      router.push("/");
    } else {
      setError(res.error || "حدث خطأ أثناء إنشاء الحساب");
    }
  };

  return (
    <div className="relative min-h-[85vh] py-10 px-4 flex items-center justify-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-blue-600/15 blur-[120px]" />

      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-[2.5rem] border border-sky-500/35 bg-slate-900/90 p-6 sm:p-8 shadow-2xl shadow-sky-950/60 backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-3">
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
                Nova Technology Academy
              </span>
              <h1 className="text-2xl font-black text-white">إنشاء حساب جديد</h1>
            </div>
          </div>

          <p className="text-xs text-slate-300 mb-4">
            سجل حسابك مجاناً وابدأ مسارك في احتراف لغات البرمجة C++ و Scratch وتطوير الألعاب.
          </p>

          {/* Google OAuth Option */}
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:border-sky-500 hover:bg-slate-800/90 hover:scale-[1.01] active:scale-95 transition-all"
          >
            <GoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>التسجيل السريع باستخدام Google</span>
          </button>

          <div className="relative my-3.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] font-semibold uppercase">
              <span className="bg-slate-900 px-3 text-slate-400">أو أدخل بياناتك</span>
            </div>
          </div>

          {error && (
            <div className="mb-3 flex items-center gap-2 rounded-2xl border border-rose-500/40 bg-rose-950/50 p-2.5 text-xs font-semibold text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignupSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-sky-400" />
                <span>الاسم بالكامل (Full Name)</span>
                <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: أحمد محمد علي"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-sky-400" />
                  <span>البريد الإلكتروني</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-sky-400" />
                  <span>رقم الهاتف / واتساب</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-sky-400" />
                  <span>كلمة المرور</span>
                  <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 pl-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                  <span>تأكيد كلمة المرور</span>
                  <span className="text-rose-400">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {password && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>قوة كلمة المرور:</span>
                  <span className="font-bold text-white">{passwordStrength.label}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: `${passwordStrength.score}%` }}
                  />
                </div>
              </div>
            )}

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-sky-500"
                />
                <span>
                  أوافق على <span className="text-sky-400 underline">شروط الاستخدام</span> و{" "}
                  <span className="text-sky-400 underline">سياسة الخصوصية</span> في Nova Technology.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>جاري إنشاء الحساب...</span>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>إنشاء الحساب الآن 🚀</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
            <span>لديك حساب بالفعل؟ </span>
            <Link
              href="/login"
              className="font-bold text-sky-400 hover:text-sky-300 hover:underline"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
