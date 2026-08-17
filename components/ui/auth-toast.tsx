"use client";

import { useAuth } from "@/lib/auth-context";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AuthToast() {
  const { notification, showNotification } = useAuth();

  if (!notification) return null;

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />,
    info: <Info className="h-5 w-5 text-sky-400 shrink-0" />
  };

  const borders = {
    success: "border-emerald-500/40 bg-slate-900/95 text-emerald-100",
    error: "border-rose-500/40 bg-slate-900/95 text-rose-100",
    warning: "border-amber-500/40 bg-slate-900/95 text-amber-100",
    info: "border-sky-500/40 bg-slate-900/95 text-sky-100"
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-md">
      <AnimatePresence>
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${borders[notification.type]}`}
        >
          <div className="flex items-center gap-3">
            {icons[notification.type]}
            <p className="text-xs sm:text-sm font-semibold">{notification.message}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
