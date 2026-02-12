import { pool } from "@/lib/db";
import nodemailer from "nodemailer";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  company: z.string().min(2).max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
  mobile: z.string().min(10).max(15),
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || "true") === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lead = LeadSchema.parse(body);

    await pool.query(
      `INSERT INTO leads (name, email, company, message, mobile, created_at)
       VALUES ($1, $2, $3, $4, $5, now())`,
      [lead.name, lead.email, lead.company || null, lead.message, lead.mobile],
    );
    // 2️⃣ Send email
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: lead.email,
      subject: `New Lead from ${lead.name}`,
      text: `
    Name: ${lead.name}
    Email: ${lead.email}
    Company: ${lead.company || "-"}
    Message:${lead.message}
    Mobile: ${lead.mobile}
          `,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    // Zod validation error or invalid JSON etc.
    return Response.json(
      { ok: false, error: e?.message ?? "Invalid request" },
      { status: 400 },
    );
  }
}
