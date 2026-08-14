import type { Metadata } from "next";
import { Cairo, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Technology | أكاديمية تعليم البرمجة الاحترافية",
  description:
    "أكاديمية Nova Technology لتعليم لغات البرمجة C++, C#, Scratch, وتطوير المواقع بمشاريع عملية حقيقية وإشراف مباشر من كبار المهندسين.",
  keywords: ["Nova Technology", "كورس C++", "برمجة ألعاب", "Unity", "Scratch", "تعلم البرمجة من الصفر", "Problem Solving"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 selection:text-white">
        <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
          {/* Neon Gradient Orbs */}
          <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
          <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.1),transparent_35%)]" />
          
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
