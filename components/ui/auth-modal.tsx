"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { novaLogo } from "@/lib/course-data";
import { useAuth, AuthView } from "@/lib/auth-context";
import {
  X,
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Zap,
  LogIn,
  UserPlus,
  RefreshCw,
  LogOut,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

export function AuthModal() {
  const {
    user,
    isAuthModalOpen,
    closeAuthModal,
    authView,
    setAuthView,
    login,
    signup,
    loginWithGoogle,
    resetPassword,
    logout
  } = useAuth();

  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Signup Form States
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [signupError, setSignupError] = useState<string | null>(null);

  // Forgot Password States
  const [forgotStep, setForgotStep] = useState<"request" | "otp" | "new-password" | "done">("request");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpCode, setOtpCode] = useState(["7", "4", "9", "2"]);
  const [otpGenerated, setOtpGenerated] = useState("7492");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotTimer, setForgotTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Reset errors when view changes
  useEffect(() => {
    setLoginError(null);
    setSignupError(null);
    if (authView === "forgot-password") {
      setForgotStep("request");
    }
  }, [authView]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && forgotTimer > 0) {
      interval = setInterval(() => setForgotTimer((prev) => prev - 1), 1000);
    } else if (forgotTimer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, forgotTimer]);

  // Password strength calculation
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

  const passwordStrength = getPasswordStrength(signupPassword);

  // Quick Demo Auto-Fill
  const handleQuickDemoFill = () => {
    setLoginEmail("ahmed@example.com");
    setLoginPassword("novaPass2026!");
    setLoginError(null);
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginEmail.trim()) {
      setLoginError("يرجى إدخال البريد الإلكتروني أو اسم المستخدم");
      return;
    }
    if (!loginPassword) {
      setLoginError("يرجى إدخال كلمة المرور");
      return;
    }

    setIsSubmitting(true);
    const res = await login(loginEmail, loginPassword, rememberMe);
    setIsSubmitting(false);
    if (!res.success) {
      setLoginError(res.error || "بيانات تسجيل الدخول غير صحيحة");
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (!signupName.trim()) {
      setSignupError("يرجى إدخال الاسم بالكامل");
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      setSignupError("يرجى إدخال بريد إلكتروني صالح");
      return;
    }
    if (!signupPhone.trim()) {
      setSignupError("يرجى إدخال رقم الهاتف للتواصل عبر واتساب");
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError("كلمة المرور يجب ألا تقل عن 6 أحرف");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError("كلمتا المرور غير متطابقتين");
      return;
    }
    if (!acceptTerms) {
      setSignupError("يجب الموافقة على شروط الاستخدام للمتابعة");
      return;
    }

    setIsSubmitting(true);
    const res = await signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword
    });
    setIsSubmitting(false);
    if (!res.success) {
      setSignupError(res.error || "حدث خطأ أثناء إنشاء الحساب");
    }
  };

  // Forgot password flow
  const handleForgotRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) {
      alert("يرجى إدخال بريد إلكتروني صالح");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setOtpGenerated(code);
      setOtpCode(code.split(""));
      setForgotTimer(60);
      setIsTimerRunning(true);
      setForgotStep("otp");
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.join("").length !== 4) {
      alert("يرجى كتابة كود التحقق المكون من 4 أرقام");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotStep("new-password");
    }, 400);
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }
    setIsSubmitting(true);
    await resetPassword(forgotEmail, newPassword);
    setIsSubmitting(false);
    setForgotStep("done");
  };



  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/85 p-3 sm:p-4 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-sky-500/35 bg-slate-900 shadow-2xl shadow-sky-950/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-96 rounded-full bg-gradient-to-r from-sky-500/30 via-blue-600/30 to-indigo-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 right-0 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl" />

            {/* Close Button */}
            <button
              onClick={closeAuthModal}
              className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition-all hover:scale-110 hover:border-slate-500 hover:text-white"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content Container */}
            <div className="p-6 sm:p-8">
              {/* ========================================================================= */}
              {/* VIEW: LOGGED IN USER PROFILE SUMMARY                                      */}
              {/* ========================================================================= */}
              {user && (
                <div className="text-center py-4">
                  <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-sky-400 p-0.5 shadow-xl shadow-sky-950/60">
                    <img
                      src={user.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=user"}
                      alt={user.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 border border-sky-500/40 px-3 py-0.5 text-xs font-bold text-sky-300 mb-2">
                    <Sparkles className="h-3 w-3" />
                    <span>طالب مسجل في Nova Tech</span>
                  </div>

                  <h3 className="text-2xl font-black text-white">{user.name}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-right">
                      <div className="text-slate-400 font-medium">نوع الحساب:</div>
                      <div className="font-bold text-sky-400 mt-0.5 flex items-center gap-1">
                        {user.provider === "google" ? <GoogleIcon className="h-3.5 w-3.5 inline" /> : <Mail className="h-3.5 w-3.5 inline" />}
                        <span>{user.provider === "google" ? "Google Account" : "بريد إلكتروني"}</span>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-right">
                      <div className="text-slate-400 font-medium">تاريخ الانضمام:</div>
                      <div className="font-bold text-white mt-0.5 font-mono">{user.joinedAt}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={closeAuthModal}
                      className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>متابعة التعلم في الدورات</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setAuthView("login");
                      }}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-950/40 px-4 py-3 text-xs sm:text-sm font-bold text-rose-300 hover:bg-rose-900/50 hover:text-white transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* VIEW: GOOGLE AUTHENTICATION                                              */}
              {/* ========================================================================= */}
              {!user && authView === "google-picker" && (
                <div className="text-center py-4">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
                    <GoogleIcon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">تسجيل الدخول عبر Google</h3>
                  <p className="mt-1 text-xs text-slate-300 max-w-sm mx-auto">
                    سيتم توجيهك إلى صفحة تسجيل الدخول الآمنة عبر حساب Google للربط مع أكاديمية Nova Technology.
                  </p>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => loginWithGoogle()}
                      className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <GoogleIcon className="h-5 w-5" />
                      <span>المتابعة إلى Google OAuth 🚀</span>
                    </button>

                    <button
                      onClick={() => setAuthView("login")}
                      className="w-full flex items-center justify-center gap-1.5 rounded-2xl border border-slate-700 bg-slate-900 py-3 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                      <span>العودة لخيارات تسجيل الدخول</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* VIEW: LOGIN (تسجيل الدخول)                                                 */}
              {/* ========================================================================= */}
              {!user && authView === "login" && (
                <div>
                  {/* Top Branding & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="overflow-hidden rounded-xl border border-sky-500/40 bg-slate-900 p-0.5">
                        <Image
                          src={novaLogo}
                          alt="Nova Technology"
                          width={32}
                          height={32}
                          className="h-7 w-7 rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                          Nova Technology Academy
                        </span>
                        <h3 className="text-xl font-black text-white sm:text-2xl">تسجيل الدخول</h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleQuickDemoFill}
                      className="inline-flex items-center gap-1 rounded-xl border border-amber-500/40 bg-amber-950/40 px-2.5 py-1 text-[11px] font-bold text-amber-300 hover:bg-amber-900/60 transition-all"
                      title="ملء بيانات حساب تجريبي جاهز للاختبار السريع"
                    >
                      <Zap className="h-3 w-3 text-amber-400" />
                      <span>تجربة سريعة</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mb-5">
                    أهلاً بك مجدداً! أدخل بياناتك للوصول إلى لوحة الطالب ومتابعة دوراتك البرمجية.
                  </p>

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

                  {/* Error Notification */}
                  {loginError && (
                    <div className="mb-4 flex items-center gap-2 rounded-2xl border border-rose-500/40 bg-rose-950/50 p-3 text-xs font-semibold text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-sky-400" />
                        <span>البريد الإلكتروني أو اسم المستخدم</span>
                        <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5 text-sky-400" />
                          <span>كلمة المرور</span>
                          <span className="text-rose-400">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setAuthView("forgot-password")}
                          className="text-[11px] font-bold text-sky-400 hover:text-sky-300 hover:underline"
                        >
                          نسيت كلمة المرور؟
                        </button>
                      </div>

                      <div className="relative">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all pl-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                        >
                          {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me check */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900"
                        />
                        <span>تذكر بيانات دخولي على هذا الجهاز</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>جاري التحقق والدخول...</span>
                          </div>
                        ) : (
                          <>
                            <LogIn className="h-4 w-4" />
                            <span>تسجيل الدخول الآن 🚀</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Switch to Sign Up */}
                  <div className="mt-5 text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
                    <span>ليس لديك حساب بعد؟ </span>
                    <button
                      type="button"
                      onClick={() => setAuthView("signup")}
                      className="font-bold text-sky-400 hover:text-sky-300 hover:underline"
                    >
                      إنشاء حساب جديد الآن
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* VIEW: SIGNUP (إنشاء حساب جديد)                                            */}
              {/* ========================================================================= */}
              {!user && authView === "signup" && (
                <div>
                  {/* Top Branding & Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="overflow-hidden rounded-xl border border-sky-500/40 bg-slate-900 p-0.5">
                      <Image
                        src={novaLogo}
                        alt="Nova Technology"
                        width={32}
                        height={32}
                        className="h-7 w-7 rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                        الانضمام إلى Nova Tech
                      </span>
                      <h3 className="text-xl font-black text-white sm:text-2xl">إنشاء حساب جديد</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-4">
                    انضم لطلاب أكاديمية Nova Technology وابدأ رحلتك في احتراف البرمجة وصناعة الألعاب.
                  </p>

                  {/* Google OAuth Option in Signup */}
                  <button
                    type="button"
                    onClick={() => loginWithGoogle()}
                    className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:border-sky-500 hover:bg-slate-800/90 hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    <GoogleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>التسجيل السريع باستخدام Google</span>
                  </button>

                  <div className="relative my-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-[10px] font-semibold uppercase">
                      <span className="bg-slate-900 px-3 text-slate-400">أو سجل ببياناتك</span>
                    </div>
                  </div>

                  {signupError && (
                    <div className="mb-3 flex items-center gap-2 rounded-2xl border border-rose-500/40 bg-rose-950/50 p-2.5 text-xs font-semibold text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>{signupError}</span>
                    </div>
                  )}

                  {/* Signup Form */}
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
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="مثال: أحمد محمد علي"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-sky-400" />
                          <span>البريد الإلكتروني</span>
                          <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
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
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          placeholder="010XXXXXXXX"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    {/* Passwords */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5 text-sky-400" />
                          <span>كلمة المرور</span>
                          <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showSignupPassword ? "text" : "password"}
                            required
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 pl-8"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                          >
                            {showSignupPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
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
                          type={showSignupPassword ? "text" : "password"}
                          required
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    {/* Password strength bar */}
                    {signupPassword && (
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

                    {/* Accept Terms */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-300 select-none">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="mt-0.5 h-3.5 w-3.5 rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-sky-500"
                        />
                        <span>
                          أوافق على{" "}
                          <span className="text-sky-400 underline">شروط الاستخدام</span> و{" "}
                          <span className="text-sky-400 underline">سياسة الخصوصية</span> في Nova Technology.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>جاري إنشاء الحساب...</span>
                          </div>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" />
                            <span>إنشاء الحساب والتسجيل 🚀</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Switch to Login */}
                  <div className="mt-4 text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
                    <span>لديك حساب بالفعل؟ </span>
                    <button
                      type="button"
                      onClick={() => setAuthView("login")}
                      className="font-bold text-sky-400 hover:text-sky-300 hover:underline"
                    >
                      تسجيل الدخول
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* VIEW: FORGOT PASSWORD (استعادة كلمة المرور)                                 */}
              {/* ========================================================================= */}
              {!user && authView === "forgot-password" && (
                <div>
                  <div className="text-center mb-5">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-lg shadow-sky-950/40">
                      <KeyRound className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-white sm:text-2xl">استعادة كلمة المرور</h3>
                    <p className="mt-1 text-xs text-slate-300">
                      لا تقلق! سنساعدك في استعادة حسابك في خطوات بسيطة.
                    </p>
                  </div>

                  {/* STEP 1: REQUEST OTP */}
                  {forgotStep === "request" && (
                    <form onSubmit={handleForgotRequestOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-sky-400" />
                          <span>البريد الإلكتروني المسجل في حسابك</span>
                          <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      <div className="rounded-2xl border border-sky-500/20 bg-sky-950/40 p-3 text-xs text-sky-300 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 shrink-0 text-sky-400" />
                        <span>سيتم إرسال كود تحقق مكون من 4 أرقام لإعادة تعيين كلمة المرور.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>جاري الإرسال...</span>
                        ) : (
                          <>
                            <span>إرسال كود التحقق ✉️</span>
                            <ArrowLeft className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {/* STEP 2: ENTER OTP */}
                  {forgotStep === "otp" && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-slate-300">
                        تم إرسال كود التحقق إلى البريد: <strong className="text-sky-400 font-mono">{forgotEmail}</strong>
                        <div className="mt-1 text-[11px] text-amber-300 font-mono">
                          (كود التحقق التجريبي هو: <strong>{otpGenerated}</strong>)
                        </div>
                      </div>

                      <div className="flex justify-center gap-3 dir-ltr" style={{ direction: "ltr" }}>
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value;
                              const newOtp = [...otpCode];
                              newOtp[idx] = val;
                              setOtpCode(newOtp);
                              if (val && idx < 3) {
                                document.getElementById(`otp-input-${idx + 1}`)?.focus();
                              }
                            }}
                            className="h-12 w-12 rounded-2xl border border-sky-500/50 bg-slate-950 text-center text-xl font-bold text-sky-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
                        {isTimerRunning ? (
                          <span>إعادة الإرسال بعد: <strong className="text-sky-400 font-mono">{forgotTimer}s</strong></span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setForgotTimer(60);
                              setIsTimerRunning(true);
                              const newCode = Math.floor(1000 + Math.random() * 9000).toString();
                              setOtpGenerated(newCode);
                              setOtpCode(newCode.split(""));
                            }}
                            className="flex items-center gap-1 text-sky-400 font-bold hover:underline"
                          >
                            <RefreshCw className="h-3 w-3" />
                            <span>إعادة إرسال الكود</span>
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        {isSubmitting ? <span>جاري التحقق...</span> : <span>تأكيد الكود ومتابعة</span>}
                      </button>
                    </form>
                  )}

                  {/* STEP 3: SET NEW PASSWORD */}
                  {forgotStep === "new-password" && (
                    <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5 text-sky-400" />
                          <span>كلمة المرور الجديدة</span>
                          <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                          <span>تأكيد كلمة المرور الجديدة</span>
                          <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="password"
                          required
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        {isSubmitting ? <span>جاري الحفظ...</span> : <span>تعيين كلمة المرور الجديدة 🔒</span>}
                      </button>
                    </form>
                  )}

                  {/* STEP 4: SUCCESS DONE */}
                  {forgotStep === "done" && (
                    <div className="text-center py-4 space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-950/50">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h4 className="text-lg font-black text-white">تم تغيير كلمة المرور بنجاح!</h4>
                      <p className="text-xs text-slate-300">
                        يمكنك الآن استخدام كلمة المرور الجديدة لتسجيل الدخول إلى حسابك في Nova Technology.
                      </p>
                      <button
                        type="button"
                        onClick={() => setAuthView("login")}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-sky-400 transition-all"
                      >
                        <span>الذهاب لتسجيل الدخول الآن ←</span>
                      </button>
                    </div>
                  )}

                  {/* Back to Login link */}
                  {forgotStep !== "done" && (
                    <div className="mt-5 text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setAuthView("login")}
                        className="inline-flex items-center gap-1 font-semibold text-slate-300 hover:text-sky-400"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                        <span>تذكرت كلمة المرور؟ تسجيل الدخول</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
