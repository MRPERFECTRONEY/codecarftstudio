import nodemailer from 'nodemailer';

const AGENCY_EMAIL = process.env.AGENCY_EMAIL || 'admin.codecraftstudio@gmail.com';
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[char]));
let transporter = null;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  console.log('[EMAIL] SMTP transport configured');
} else {
  console.log('[EMAIL] SMTP is not configured; inquiry email notifications are disabled.');
}

export async function sendInquiryNotificationEmail(data) {
  if (!transporter) return;
  const tracking_code = escapeHtml(data.tracking_code);
  const client_name = escapeHtml(data.client_name);
  const client_email = escapeHtml(data.client_email);
  const client_phone = escapeHtml(data.client_phone || 'N/A');
  const company_name = escapeHtml(data.company_name || 'N/A');
  const project_type = escapeHtml(data.project_type);
  const description = escapeHtml(data.description || 'No description provided.');
  const subjectName = String(data.client_name || 'Client').replace(/[\r\n]/g,' ').slice(0,120);
  const htmlContent = `
    <div style="font-family:Arial,sans-serif;background:#07090e;color:#f8fafc;padding:30px;border-radius:12px">
      <h2 style="color:#00f0ff">New Project Proposal Request</h2>
      <p><strong>Tracking Code:</strong> ${tracking_code}</p>
      <p><strong>Client Name:</strong> ${client_name}</p>
      <p><strong>Client Email:</strong> <a href="mailto:${client_email}">${client_email}</a></p>
      <p><strong>Phone:</strong> ${client_phone}</p>
      <p><strong>Company:</strong> ${company_name}</p>
      <p><strong>Project:</strong> ${project_type}</p>
      <h3>Project description</h3><p style="white-space:pre-wrap">${description}</p>
    </div>`;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: AGENCY_EMAIL,
      replyTo: data.client_email,
      subject: 'New proposal request [' + String(data.tracking_code || '').slice(0,32) + '] from ' + subjectName,
      html: htmlContent
    });
    console.log('[EMAIL] Inquiry notification sent');
  } catch (error) {
    console.error('[EMAIL] Inquiry notification failed:', error.message);
  }
}
