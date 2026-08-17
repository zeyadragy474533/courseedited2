import { createClient } from "@supabase/supabase-js";

// Read environment variables (supports NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and NEXT_PUBLIC_SUPABASE_ANON_KEY)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ycznwibfasyxwmogapgg.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "public-anon-key";

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseKey &&
    supabaseKey !== "public-anon-key" &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project")
  );
};

export type ProfileRecord = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "student" | "instructor" | "admin";
  created_at: string;
  updated_at: string;
};

export type EnrollmentRecord = {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  status: "active" | "completed" | "cancelled";
  notes: string | null;
};

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
