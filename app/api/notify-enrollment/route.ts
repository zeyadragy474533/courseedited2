import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "technotrendsz@gmail.com";

interface EnrollmentNotificationPayload {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  notes?: string;
  userId?: string;
  enrolledAt?: string;
}

function generateEmailHtml(payload: EnrollmentNotificationPayload): string {
  const {
    studentName,
    studentEmail,
    studentPhone,
    courseId,
    courseTitle,
    notes,
    userId,
    enrolledAt = new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" })
  } = payload;

  const cleanPhone = (studentPhone || "").replace(/[^0-9]/g, "");
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith("0") ? "2" + cleanPhone : cleanPhone}?text=${encodeURIComponent(`مرحباً ${studentName}، نتواصل معك بخصوص تسجيلك في دورة: ${courseTitle}`)}`
    : null;

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>حجز كورس جديد - Nova Technology</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0b1120;
      color: #e2e8f0;
      margin: 0;
      padding: 0;
      direction: rtl;
    }
    .wrapper {
      width: 100%;
      background-color: #0b1120;
      padding: 30px 15px;
      box-sizing: border-box;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(180deg, #131d33 0%, #0f172a 100%);
      border: 1px solid #1e293b;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%);
      padding: 30px 24px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 6px 0 0 0;
      font-size: 14px;
      color: #e0f2fe;
      opacity: 0.9;
    }
    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 4px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 12px;
      color: #ffffff;
    }
    .content {
      padding: 28px 24px;
    }
    .info-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 10px;
      margin-top: 10px;
    }
    .info-row td {
      padding: 14px 16px;
      background: #1e293b;
      border-radius: 12px;
    }
    .info-label {
      color: #94a3b8;
      font-size: 13px;
      font-weight: 600;
      width: 32%;
      vertical-align: middle;
    }
    .info-value {
      color: #ffffff;
      font-size: 15px;
      font-weight: bold;
      vertical-align: middle;
    }
    .highlight {
      color: #38bdf8;
    }
    .notes-box {
      margin-top: 18px;
      padding: 16px;
      background: #1e293b;
      border-right: 4px solid #38bdf8;
      border-radius: 8px;
      color: #cbd5e1;
      font-size: 13px;
      line-height: 1.6;
    }
    .actions {
      margin-top: 28px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 14px;
      text-decoration: none;
      margin: 6px;
    }
    .btn-whatsapp {
      background-color: #10b981;
      color: #ffffff !important;
    }
    .btn-email {
      background-color: #0284c7;
      color: #ffffff !important;
    }
    .footer {
      border-top: 1px solid #1e293b;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      background-color: #0c1322;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="badge">🔥 حجز دورة جديد مؤكد</div>
        <h1>Nova Technology Academy</h1>
        <p>تم تسجيل طالب جديد في أحد المسارات البرمجية</p>
      </div>

      <div class="content">
        <table class="info-table">
          <tr class="info-row">
            <td class="info-label">👤 اسم الطالب</td>
            <td class="info-value highlight">${studentName}</td>
          </tr>
          <tr class="info-row">
            <td class="info-label">📚 الدورة المطلوبة</td>
            <td class="info-value" style="color: #fbbf24;">${courseTitle} <span style="font-size: 11px; color: #94a3b8;">(${courseId})</span></td>
          </tr>
          <tr class="info-row">
            <td class="info-label">📞 رقم الهاتف / واتساب</td>
            <td class="info-value" dir="ltr" style="text-align: right;">${studentPhone || "غير متوفر"}</td>
          </tr>
          <tr class="info-row">
            <td class="info-label">✉️ البريد الإلكتروني</td>
            <td class="info-value" dir="ltr" style="text-align: right;">${studentEmail}</td>
          </tr>
          <tr class="info-row">
            <td class="info-label">🕒 وقت الحجز</td>
            <td class="info-value" style="font-size: 13px; color: #94a3b8;">${enrolledAt}</td>
          </tr>
          ${userId ? `
          <tr class="info-row">
            <td class="info-label">🆔 معرف المستخدم (UID)</td>
            <td class="info-value" style="font-size: 11px; color: #64748b; font-family: monospace;" dir="ltr">${userId}</td>
          </tr>` : ""}
        </table>

        ${notes ? `
        <div class="notes-box">
          <strong style="color: #38bdf8; display: block; margin-bottom: 4px;">💬 ملاحظات الطالب:</strong>
          ${notes}
        </div>` : ""}

        <div class="actions">
          ${whatsappUrl ? `<a href="${whatsappUrl}" class="btn btn-whatsapp" target="_blank">📱 فتح محادثة واتساب</a>` : ""}
          <a href="mailto:${studentEmail}" class="btn btn-email">✉️ مراسلة عبر الإيميل</a>
        </div>
      </div>

      <div class="footer">
        <p>هذا إشعار تلقائي تم إنشاؤه بواسطة نظام التسجيل في <strong>Nova Technology Academy</strong>.</p>
        <p style="margin-top: 4px; font-size: 11px;">المستلم: ${NOTIFICATION_EMAIL}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(req: Request) {
  try {
    const payload: EnrollmentNotificationPayload = await req.json();

    if (!payload.studentName || !payload.courseTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const htmlContent = generateEmailHtml(payload);
    const subject = `🎉 حجز جديد: ${payload.studentName} في ${payload.courseTitle}`;

    let emailSent = false;
    let transportUsed = "none";

    // 1. Try Resend if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Nova Academy <onboarding@resend.dev>",
          to: [NOTIFICATION_EMAIL],
          subject,
          html: htmlContent,
        });

        if (!error && data) {
          emailSent = true;
          transportUsed = "resend";
        }
      } catch (e) {
        console.warn("Resend email delivery attempt failed:", e);
      }
    }

    // 2. Try Nodemailer if SMTP configuration is present
    if (!emailSent && (process.env.SMTP_USER || process.env.GMAIL_USER)) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.SMTP_SERVICE || "gmail",
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: process.env.SMTP_SECURE !== "false",
          auth: {
            user: process.env.SMTP_USER || process.env.GMAIL_USER,
            pass: process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"Nova Technology" <${process.env.SMTP_USER || process.env.GMAIL_USER}>`,
          to: NOTIFICATION_EMAIL,
          subject,
          html: htmlContent,
        });

        emailSent = true;
        transportUsed = "nodemailer_smtp";
      } catch (e) {
        console.warn("Nodemailer SMTP delivery attempt failed:", e);
      }
    }

    console.log(`[ENROLLMENT NOTIFICATION] Course: ${payload.courseTitle} | Student: ${payload.studentName} (${payload.studentEmail}) | Sent: ${emailSent} (${transportUsed})`);

    return NextResponse.json({
      success: true,
      delivered: emailSent,
      transport: transportUsed,
      recipient: NOTIFICATION_EMAIL,
      message: emailSent
        ? `تم إرسال الإشعار بنجاح إلى ${NOTIFICATION_EMAIL}`
        : `تم تجهيز وتسجيل بيانات الحجز بنجاح (سيتم الإرسال فور ربط SMTP/Resend key)`,
    });
  } catch (error: any) {
    console.error("Failed to process enrollment notification:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
