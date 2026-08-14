"use client";

import { useState } from "react";
import { Course } from "@/lib/course-data";
import { X, CheckCircle2, ArrowRight, Mail, LogIn, Eye, EyeOff } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "motion/react";

interface EnrollmentModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollmentModal({ course, isOpen, onClose }: EnrollmentModalProps) {
  const [view, setView] = useState<"login" | "signup" | "forgot" | "success">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("برجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("تم تسجيل دخولك بنجاح!");
      setView("success");
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 900);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      alert("برجاء ملء جميع الحقول");
      return;
    }
    if (password !== confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }
    if (password.length < 6) {
      alert("كلمة المرور يجب أن تكون على الأقل 6 أحرف");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("تم إنشاء حسابك بنجاح!");
      setView("success");
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 900);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("برجاء إدخال البريد الإلكتروني");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
      setView("success");
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 900);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("تم تسجيل دخولك عبر جوجل بنجاح!");
      setView("success");
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 900);
  };

  const handleResetAndClose = () => {
    setView("login");
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-sky-500/30 bg-slate-900 shadow-2xl shadow-sky-950/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header background light glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-gradient-to-r from-sky-500/30 to-blue-600/30 blur-3xl" />

            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition-transform hover:scale-110 hover:text-white"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content per view */}
            <div className="p-6 sm:p-8">
              {/* LOGIN VIEW */}
              {view === "login" && (
                <div>
                  <h3 className="text-2xl font-black text-white sm:text-3xl">
                    تسجيل الدخول
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    أدخل بيانات حسابك للدخول إلى منصة Nova Technology.
                  </p>

                  <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-sky-400" />
                        البريد الإلكتروني
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

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <LogIn className="h-3.5 w-3.5 text-sky-400" />
                        كلمة المرور
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-xs text-sky-400 hover:text-sky-300"
                      >
                        هل نسيت كلمة المرور؟
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                      >
                        <span>{isSubmitting ? "جاري التحقق..." : "دخول"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>

                  {/* Google Login */}
                  <div className="mt-6">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-700"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-900 px-2 text-slate-400">أو</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-slate-900 transition-all disabled:opacity-50"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.91 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                      <span>دخول عبر جوجل</span>
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                    <span className="text-slate-400">ليس لديك حساب؟</span>
                    <button
                      type="button"
                      onClick={() => setView("signup")}
                      className="font-semibold text-sky-400 hover:text-sky-300"
                    >
                      إنشاء حساب جديد
                    </button>
                  </div>
                </div>
              )}

              {/* SIGNUP VIEW */}
              {view === "signup" && (
                <div>
                  <h3 className="text-2xl font-black text-white sm:text-3xl">
                    إنشاء حساب جديد
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    انضم إلى منصة Nova Technology وابدأ رحلتك التعليمية.
                  </p>

                  <form onSubmit={handleSignup} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="أحمد محمد طارق"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        البريد الإلكتروني
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

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        كلمة المرور
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        تأكيد كلمة المرور
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                        >
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "جاري الإنشاء..." : "إنشاء حساب"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                    <span className="text-slate-400">لديك حساب بالفعل؟</span>
                    <button
                      type="button"
                      onClick={() => setView("login")}
                      className="font-semibold text-sky-400 hover:text-sky-300"
                    >
                      تسجيل الدخول
                    </button>
                  </div>
                </div>
              )}

              {/* FORGOT PASSWORD VIEW */}
              {view === "forgot" && (
                <div>
                  <h3 className="text-2xl font-black text-white sm:text-3xl">
                    إعادة تعيين كلمة المرور
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور.
                  </p>

                  <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-sky-400" />
                        البريد الإلكتروني
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

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setView("login")}
                      className="font-semibold text-sky-400 hover:text-sky-300"
                    >
                      العودة لتسجيل الدخول
                    </button>
                  </div>
                </div>
              )}

              {/* SUCCESS VIEW */}
              {view === "success" && (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-950/50">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-5 text-3xl font-black text-white">
                    أهلا وسهلا! 🎉
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                    {successMessage}
                  </p>

                  <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-right max-w-md mx-auto space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">البريد الإلكتروني:</span>
                      <span className="font-bold text-white">{email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">الحالة:</span>
                      <span className="font-bold text-emerald-400">نجح ✓</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetAndClose}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-all hover:scale-105"
                  >
                    تم، الذهاب للصفحة الرئيسية 🚀
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
