"use client";

import { useState } from "react";
import { Course } from "@/lib/course-data";
import { X, Sparkles, CheckCircle2, ShieldCheck, CreditCard, Gift, ArrowRight, Zap, Phone, Mail, User } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "motion/react";

type PaymentMethodType = "instapay" | "vodafone" | "fawry" | "card";

interface EnrollmentModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollmentModal({ course, isOpen, onClose }: EnrollmentModalProps) {
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("instapay");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "NOVA20" || code === "FIRE20" || code === "GAMED") {
      setDiscountPercent(20);
      setCouponSuccess("🔥 تم تفعيل خصم 20% بنجاح كود الأبطال!");
      setCouponError("");
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
    } else if (code === "NOVA50") {
      setDiscountPercent(50);
      setCouponSuccess("🎉 كود ذهبي! خصم 50% استثنائي!");
      setCouponError("");
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {}
    } else {
      setCouponError("كود غير صالح. جرب استخدام كود الأبطال: NOVA20");
      setCouponSuccess("");
      setDiscountPercent(0);
    }
  };

  const finalPrice = Math.round(course.price * (1 - discountPercent / 100));

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("برجاء إدخال الاسم ورقم الهاتف للتواصل");
      return;
    }
    setStep("payment");
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 1200);
  };

  const handleResetAndClose = () => {
    setStep("form");
    setDiscountPercent(0);
    setCouponCode("");
    onClose();
  };

  const paymentOptions: Array<{ id: PaymentMethodType; name: string; desc: string; badge: string }> = [
    { id: "instapay", name: "InstaPay (إنستاباي)", desc: "تحويل فوري بدون أي رسوم إضافية", badge: "الأسرع والأسهل ⚡" },
    { id: "vodafone", name: "Vodafone Cash (فودافون كاش)", desc: "تحويل مباشر للمحفظة مع تأكيد فوري", badge: "متاح 24/7" },
    { id: "fawry", name: "Fawry (فوري)", desc: "كود دفع صالح في أي منفذ فوري بمصر", badge: "كود سداد" },
    { id: "card", name: "بطاقات الائتمان (Visa / MasterCard)", desc: "دفع آمن ومباشر ومشفر بالكامل", badge: "بطاقة بنكية" },
  ];

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

            {/* Content per step */}
            <div className="p-6 sm:p-8">
              {step === "form" && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-400">
                    <Sparkles className="h-4 w-4" />
                    <span>حجز مقعد فوري ومباشر</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    الانضمام إلى {course.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    املأ بياناتك وسيتم التواصل معك مباشرة لتأكيد الحضور وبدء الدورة.
                  </p>

                  <form onSubmit={handleNextStep} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-sky-400" />
                        الاسم بالكامل (Full Name)
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: أحمد محمد طارق"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-sky-400" />
                          رقم الهاتف / واتساب
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="010XXXXXXXX"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-sky-400" />
                          البريد الإلكتروني (اختياري)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    {/* Promo Code Box */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <Gift className="h-3.5 w-3.5 text-amber-400" />
                          لديك كود خصم؟ (جرب: NOVA20)
                        </span>
                        {discountPercent > 0 && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                            خصم {discountPercent}%
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="ادخل الكود هنا"
                          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs uppercase font-mono text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-sky-300 hover:bg-slate-700"
                        >
                          تطبيق
                        </button>
                      </div>
                      {couponSuccess && <p className="mt-2 text-xs font-medium text-emerald-400">{couponSuccess}</p>}
                      {couponError && <p className="mt-2 text-xs font-medium text-rose-400">{couponError}</p>}
                    </div>

                    {/* Pricing Summary */}
                    <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">إجمالي المبلغ:</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-white">${finalPrice}</span>
                          {discountPercent > 0 && (
                            <span className="text-sm text-slate-500 line-through">${course.price}</span>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all"
                      >
                        <span>متابعة الدفع</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === "payment" && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-400">
                    <CreditCard className="h-4 w-4" />
                    <span>طريقة الدفع وتأكيد الحجز</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-black text-white">اختر وسيلة الدفع المناسبة</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    المبلغ المطلوب سداده: <strong className="text-white text-sm">${finalPrice}</strong>
                  </p>

                  <div className="mt-6 space-y-3">
                    {paymentOptions.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                          paymentMethod === m.id
                            ? "border-sky-500 bg-sky-950/40 shadow-md shadow-sky-900/30"
                            : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === m.id ? "border-sky-400 bg-sky-500" : "border-slate-600"}`}>
                              {paymentMethod === m.id && <div className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">{m.name}</h4>
                              <p className="text-xs text-slate-400">{m.desc}</p>
                            </div>
                          </div>
                          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-sky-300">
                            {m.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-sky-500/20 bg-sky-950/30 p-3.5 text-xs text-sky-200 flex items-start gap-2.5">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-sky-400" />
                    <div>
                      <strong>ضمان Nova الذهبي:</strong> استرجاع كامل الرسوم خلال أول محاضرتين إذا لم تكن التجربة متوافقة مع تطلعاتك بنسبة 100%!
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-semibold text-slate-300 hover:text-white"
                    >
                      رجوع
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmOrder}
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>جاري تسجيل الحجز...</span>
                        </div>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 fill-current" />
                          <span>تأكيد الحجز النهائي (${finalPrice})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-950/50">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-5 text-3xl font-black text-white">
                    مبروك يا بطل! 🎉 تم حجز مقعدك بنجاح
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                    تم تسجيل بياناتك في كورس <strong>{course.title}</strong> بنجاح. سيتواصل معك فريق Nova Technology عبر الواتساب على رقم <strong>{phone}</strong> لإرسال رابط الجروب ومواعيد المحاضرات.
                  </p>

                  <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-right max-w-md mx-auto space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">اسم الطالب:</span>
                      <span className="font-bold text-white">{fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">الكورس:</span>
                      <span className="font-bold text-sky-400">{course.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">إجمالي المبلغ:</span>
                      <span className="font-bold text-emerald-400">${finalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetAndClose}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-all hover:scale-105"
                  >
                    تم، العودة للموقع 🚀
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
