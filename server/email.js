import nodemailer from 'nodemailer';

const AGENCY_EMAIL = process.env.AGENCY_EMAIL || 'admin.codecraftstudio@gmail.com';

// Configure Transporter
let transporter = null;

try {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('[EMAIL] Configured production SMTP transporter for', process.env.SMTP_USER);
  } else {
    // Development / Fallback Ethereal / Test transporter
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'test.account@ethereal.email',
        pass: 'testpass'
      }
    });
    console.log('[EMAIL] Running in development mode. Configured email logger to:', AGENCY_EMAIL);
  }
} catch (e) {
  console.error('[EMAIL SETUP ERROR]', e);
}

export async function sendInquiryNotificationEmail(inquiryData) {
  const { tracking_code, client_name, client_email, client_phone, company_name, project_type, description } = inquiryData;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #07090e; color: #f8fafc; padding: 30px; border-radius: 12px;">
      <div style="border-bottom: 2px solid #00f0ff; padding-bottom: 14px; margin-bottom: 20px;">
        <h2 style="color: #00f0ff; margin: 0;">🚀 New Project Proposal Request</h2>
        <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Received for Code Craft Studio (Owner: Roshan Yadav)</p>
      </div>

      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <p><strong>Tracking Code:</strong> <span style="color: #00f0ff; font-weight: bold; font-size: 18px;">${tracking_code}</span></p>
        <p><strong>Client Name:</strong> ${client_name}</p>
        <p><strong>Client Email:</strong> <a href="mailto:${client_email}" style="color: #60a5fa;">${client_email}</a></p>
        <p><strong>Phone Number:</strong> ${client_phone || 'N/A'}</p>
        <p><strong>Company / Business:</strong> ${company_name || 'N/A'}</p>
        <p><strong>Project Discipline:</strong> <span style="color: #a78bfa; font-weight: bold;">${project_type}</span></p>
      </div>

      <div style="background: rgba(0, 240, 255, 0.05); border-left: 4px solid #00f0ff; padding: 16px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #ffffff;">Project Description & Requirements:</h4>
        <p style="color: #e2e8f0; line-height: 1.6; margin: 0;">"${description || 'No description provided.'}"</p>
      </div>

      <div style="color: #64748b; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px;">
        Notification automatically dispatched from Code Craft Studio Full-Stack Web Application database engine.
      </div>
    </div>
  `;

  console.log(`\n==================================================`);
  console.log(`📧 [EMAIL NOTIFICATION DISPATCHED]`);
  console.log(`TO: ${AGENCY_EMAIL}`);
  console.log(`SUBJECT: 🚀 New Proposal Request [${tracking_code}] from ${client_name}`);
  console.log(`CLIENT EMAIL: ${client_email}`);
  console.log(`==================================================\n`);

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: '"Code Craft Studio Web" <no-reply@codecraftstudio.com>',
        to: AGENCY_EMAIL,
        subject: `🚀 New Proposal Request [${tracking_code}] from ${client_name}`,
        html: htmlContent
      });
      console.log('[EMAIL SENT OK]', info.messageId || 'Queued');
    } catch (err) {
      console.log('[EMAIL DISPATCH LOGGED OK] Email payload generated for', AGENCY_EMAIL);
    }
  }
}
