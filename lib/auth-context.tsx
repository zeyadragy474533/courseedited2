"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { supabase, isSupabaseConfigured, ProfileRecord } from "./supabase";
import { allCourses } from "./course-data";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  provider: "email" | "google";
  role: "student" | "instructor" | "admin";
  joinedAt: string;
}

export interface EnrollmentRecord {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  status?: string;
}

export type AuthView = "login" | "signup" | "forgot-password" | "google-picker";

interface AuthNotification {
  id: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authView: AuthView;
  notification: AuthNotification | null;
  enrolledCourses: string[];
  openAuthModal: (view?: AuthView) => void;
  closeAuthModal: () => void;
  setAuthView: (view: AuthView) => void;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string, newPassword?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  showNotification: (message: string, type?: "success" | "info" | "warning" | "error") => void;
  isEnrolled: (courseId: string) => boolean;
  enrollCourse: (courseId: string, options?: { notes?: string; fullName?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  refreshEnrollments: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [notification, setNotification] = useState<AuthNotification | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  // Trigger celebration particles
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const showNotification = (message: string, type: "success" | "info" | "warning" | "error" = "success") => {
    const id = Date.now().toString();
    setNotification({ id, message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };

  // Helper: Map Supabase Auth User & Profiles table into application User object
  const buildAppUser = useCallback(async (sbUser: any): Promise<User> => {
    const meta = sbUser.user_metadata || {};
    const appMeta = sbUser.app_metadata || {};
    const provider: "email" | "google" = appMeta.provider === "google" ? "google" : "email";
    const defaultAvatar = meta.avatar_url || meta.picture || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(sbUser.email || sbUser.id)}`;

    let fullName = meta.full_name || meta.name || (sbUser.email ? sbUser.email.split("@")[0] : "طالب Nova");
    let phone = meta.phone || "";
    let avatar = defaultAvatar;
    let role: "student" | "instructor" | "admin" = "student";
    let joinedAt = sbUser.created_at ? sbUser.created_at.split("T")[0] : new Date().toISOString().split("T")[0];

    // Attempt to load live profile row from Supabase
    if (isSupabaseConfigured()) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", sbUser.id)
          .maybeSingle();

        if (profile) {
          if (profile.full_name) fullName = profile.full_name;
          if (profile.phone) phone = profile.phone;
          if (profile.avatar_url) avatar = profile.avatar_url;
          if (profile.role) role = profile.role as "student" | "instructor" | "admin";
          if (profile.created_at) joinedAt = profile.created_at.split("T")[0];
        }
      } catch (e) {
        console.warn("Could not query profiles table:", e);
      }
    }

    return {
      id: sbUser.id,
      name: fullName,
      email: sbUser.email || "",
      phone,
      avatar,
      provider,
      role,
      joinedAt
    };
  }, []);

  // Fetch user's enrolled courses from Supabase enrollments table
  const fetchEnrollments = useCallback(async (userId: string) => {
    if (!userId) {
      setEnrolledCourses([]);
      return;
    }

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select("course_id, enrolled_at, status")
          .eq("user_id", userId);

        if (error) {
          console.warn("Error fetching Supabase enrollments:", error.message);
          setEnrolledCourses([]);
          return;
        }

        if (data && data.length > 0) {
          const ids = data.map((item: any) => item.course_id);
          setEnrolledCourses(ids);
        } else {
          // Zero enrolled courses for new/unenrolled users
          setEnrolledCourses([]);
        }
      } catch (e) {
        console.error("Failed to query enrollments table:", e);
        setEnrolledCourses([]);
      }
    } else {
      setEnrolledCourses([]);
    }
  }, []);

  // Initialize Supabase Auth Listener and Session Persistence
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (isSupabaseConfigured()) {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) {
            console.warn("Supabase getSession error:", error.message);
          }

          if (session?.user && mounted) {
            const mapped = await buildAppUser(session.user);
            if (mounted) {
              setUser(mapped);
              await fetchEnrollments(mapped.id);
            }
          } else if (mounted) {
            setUser(null);
            setEnrolledCourses([]);
          }
        } catch (e) {
          console.error("Auth init error:", e);
        } finally {
          if (mounted) setIsLoading(false);
        }

        // Subscribe to real-time auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          if (session?.user) {
            const mapped = await buildAppUser(session.user);
            if (mounted) {
              setUser(mapped);
              await fetchEnrollments(mapped.id);
            }
          } else if (event === "SIGNED_OUT") {
            if (mounted) {
              setUser(null);
              setEnrolledCourses([]);
            }
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } else {
        if (mounted) {
          setUser(null);
          setEnrolledCourses([]);
          setIsLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, [buildAppUser, fetchEnrollments]);

  const openAuthModal = (view: AuthView = "login") => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // 1. LOGIN WITH SUPABASE AUTH (Email + Password)
  const login = async (
    email: string,
    password: string,
    remember: boolean = true
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (error) {
          let msg = error.message;
          if (error.message.includes("Invalid login credentials")) {
            msg = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
          } else if (error.message.includes("Email not confirmed")) {
            msg = "يرجى تأكيد بريدك الإلكتروني أولاً عبر الرابط المرسل إليك";
          }
          return { success: false, error: msg };
        }

        if (data?.user) {
          const mapped = await buildAppUser(data.user);
          setUser(mapped);
          await fetchEnrollments(mapped.id);
          setIsAuthModalOpen(false);
          triggerCelebration();
          showNotification(`أهلاً بك مجدداً يا ${mapped.name}! 🎉`, "success");
          return { success: true };
        }
        return { success: false, error: "تعذر تسجيل الدخول" };
      } catch (e: any) {
        return { success: false, error: e?.message || "حدث خطأ غير متوقع في الاتصال بالخادم" };
      } finally {
        setIsLoading(false);
      }
    } else {
      return { success: false, error: "لم يتم العثور على إعدادات Supabase" };
    }
  };

  // 2. SIGNUP WITH SUPABASE AUTH (Email + Password + Full Name + Phone)
  const signup = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isSupabaseConfigured()) {
      try {
        const cleanEmail = userData.email.trim();
        const cleanName = userData.name.trim();
        const cleanPhone = userData.phone.trim();

        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: userData.password,
          options: {
            data: {
              full_name: cleanName,
              phone: cleanPhone,
              role: "student"
            }
          }
        });

        if (error) {
          let msg = error.message;
          if (error.message.includes("User already registered")) {
            msg = "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول بدلاً من ذلك.";
          } else if (error.message.includes("Password should be at least")) {
            msg = "كلمة المرور يجب ألا تقل عن 6 أحرف.";
          }
          return { success: false, error: msg };
        }

        if (data?.user) {
          // Explicit profile safeguard creation
          try {
            await supabase.from("profiles").upsert({
              id: data.user.id,
              full_name: cleanName,
              email: cleanEmail,
              phone: cleanPhone,
              avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.user.id)}`,
              role: "student",
              updated_at: new Date().toISOString()
            });
          } catch (profileErr) {
            console.warn("Direct profile upsert:", profileErr);
          }

          const mapped = await buildAppUser(data.user);
          setUser(mapped);
          setEnrolledCourses([]); // New user starts with zero enrolled courses
          setIsAuthModalOpen(false);
          triggerCelebration();
          showNotification(`أهلاً بك في أكاديمية Nova Technology يا ${mapped.name}! تم إنشاء حسابك بنجاح 🚀`, "success");
          return { success: true };
        }

        return { success: true };
      } catch (e: any) {
        return { success: false, error: e?.message || "تعذر إنشاء الحساب" };
      } finally {
        setIsLoading(false);
      }
    } else {
      return { success: false, error: "لم يتم ضبط الاتصال بـ Supabase" };
    }
  };

  // 3. GOOGLE OAUTH WITH SUPABASE
  const loginWithGoogle = async () => {
    setIsLoading(true);

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: typeof window !== "undefined" ? `${window.location.origin}` : undefined
          }
        });
        if (error) {
          showNotification(`خطأ في مصادقة Google: ${error.message}`, "error");
        }
      } catch (e: any) {
        showNotification("تعذر بدء الاتصال مع Google OAuth", "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      showNotification("يرجى ضبط مفاتيح Supabase", "error");
      setIsLoading(false);
    }
  };

  // 4. FORGOT / RESET PASSWORD
  const resetPassword = async (email: string, newPassword?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isSupabaseConfigured()) {
      try {
        if (newPassword) {
          const { error } = await supabase.auth.updateUser({ password: newPassword });
          if (error) return { success: false, error: error.message };
        } else {
          const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined
          });
          if (error) return { success: false, error: error.message };
        }

        showNotification(`تم إرسال تعليمات إعادة تعيين كلمة المرور إلى: ${email}`, "success");
        return { success: true };
      } catch (e: any) {
        return { success: false, error: e?.message || "حدث خطأ أثناء استعادة كلمة المرور" };
      } finally {
        setIsLoading(false);
      }
    } else {
      showNotification("Supabase غير متصل", "error");
      setIsLoading(false);
      return { success: false, error: "Supabase not configured" };
    }
  };

  // 5. LOGOUT
  const logout = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn("Supabase signOut error:", e);
      }
    }
    setUser(null);
    setEnrolledCourses([]);
    showNotification("تم تسجيل الخروج بنجاح. نراك قريباً!", "info");
  };

  // 6. CHECK IF USER IS ENROLLED IN A COURSE
  const isEnrolled = (courseId: string): boolean => {
    return enrolledCourses.includes(courseId);
  };

  // 7. ENROLL IN A COURSE (PERSISTED IN SUPABASE ENROLLMENTS TABLE)
  const enrollCourse = async (
    courseId: string,
    options?: { notes?: string; fullName?: string; phone?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      return { success: false, error: "قاعدة بيانات Supabase غير متصلة" };
    }

    setIsLoading(true);

    try {
      // Verify active Supabase auth session
      const { data: { session }, error: sessionErr } = await supabase.auth.getSession();
      const currentAuthUser = session?.user;

      if (!currentAuthUser) {
        openAuthModal("login");
        showNotification("يرجى تسجيل الدخول أولاً أو إنشاء حساب لتأكيد حجز الدورة", "warning");
        return { success: false, error: "يرجى تسجيل الدخول أولاً لإتمام الحجز" };
      }

      if (isEnrolled(courseId)) {
        showNotification("أنت مسجل بالفعل في هذا الكورس! يمكنك متابعة الدروس مباشرة 🎓", "info");
        return { success: false, error: "already_enrolled" };
      }

      const { data, error } = await supabase
        .from("enrollments")
        .insert({
          user_id: currentAuthUser.id,
          course_id: courseId,
          notes: options?.notes || null,
          status: "active"
        })
        .select();

      if (error) {
        const errorMsg = error.message || error.details || error.hint || "";
        // Check for unique constraint violation (duplicate enrollment)
        if (error.code === "23505" || errorMsg.includes("unique") || errorMsg.includes("duplicate")) {
          if (!enrolledCourses.includes(courseId)) {
            setEnrolledCourses((prev) => [...prev, courseId]);
          }
          showNotification("أنت مسجل بالفعل في هذا الكورس!", "info");
          return { success: false, error: "already_enrolled" };
        }

        console.error("Supabase enrollment insert error:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });

        let userFriendlyError = error.message;
        if (error.code === "42501" || errorMsg.includes("policy") || errorMsg.includes("row-level security")) {
          userFriendlyError = "يرجى التأكد من تسجيل الدخول لتسجيل الكورس في حسابك";
        }

        return { success: false, error: userFriendlyError || "حدث خطأ أثناء حفظ التسجيل" };
      }

      // Add to active enrolled list immediately
      setEnrolledCourses((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));

      const courseObj = allCourses.find((c) => c.id === courseId);

      // Trigger admin email notification in background
      try {
        fetch("/api/notify-enrollment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentName: options?.fullName || user?.name || "طالب جديد",
            studentEmail: currentAuthUser.email || user?.email || "",
            studentPhone: options?.phone || user?.phone || "",
            courseId: courseId,
            courseTitle: courseObj?.titleAr || courseObj?.title || courseId,
            notes: options?.notes || "",
            userId: currentAuthUser.id,
            enrolledAt: new Date().toLocaleString("ar-EG")
          })
        }).catch((err) => console.warn("Admin notification dispatch warning:", err));
      } catch (notifyErr) {
        console.warn("Could not dispatch notification:", notifyErr);
      }

      triggerCelebration();
      showNotification(
        `تم تأكيد تسجيلك بنجاح في: ${courseObj?.titleAr || courseId}! 🎉`,
        "success"
      );
      return { success: true };
    } catch (e: any) {
      console.error("Enrollment unexpected error:", e);
      return { success: false, error: e?.message || "حدث خطأ غير متوقع أثناء الحجز" };
    } finally {
      setIsLoading(false);
    }
  };

  const refreshEnrollments = async () => {
    if (user?.id) {
      await fetchEnrollments(user.id);
    }
  };

  const refreshProfile = async () => {
    if (user?.id && isSupabaseConfigured()) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const mapped = await buildAppUser(session.user);
        setUser(mapped);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        authView,
        notification,
        enrolledCourses,
        openAuthModal,
        closeAuthModal,
        setAuthView,
        login,
        signup,
        loginWithGoogle,
        resetPassword,
        logout,
        showNotification,
        isEnrolled,
        enrollCourse,
        refreshEnrollments,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
