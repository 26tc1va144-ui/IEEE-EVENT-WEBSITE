const nodemailer = require('nodemailer');

/**
 * Create reusable transporter.
 * Falls back to a console-log stub when SMTP is not configured.
 */
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn('SMTP not configured — emails will be logged to console');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

/**
 * Send registration confirmation email.
 */
const sendConfirmationEmail = async (participant) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"IEEE Workshop" <noreply@ieeworkshop.com>',
    to: participant.email,
    subject: `Registration Confirmed — IEEE RAS & IAS International Workshop | ${participant.registrationId}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #0a1628 0%, #00629B 100%); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎉 Registration Confirmed!</h1>
          <p style="color: #cbd5e1; margin: 8px 0 0;">IEEE RAS & IAS International Workshop</p>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <p style="font-size: 16px; color: #1a1a2e;">Dear <strong>${participant.name}</strong>,</p>
          <p style="color: #4a4a6a; line-height: 1.6;">
            Thank you for registering for the International Workshop organized by IEEE RAS & IAS at MITS DU. Your registration has been confirmed.
          </p>
          <div style="background: #f0f4ff; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="margin: 0 0 16px; color: #0a1628;">Registration Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #4a4a6a;">Registration ID</td><td style="padding: 8px 0; font-weight: 600; color: #00629B;">${participant.registrationId}</td></tr>
              <tr><td style="padding: 8px 0; color: #4a4a6a;">Name</td><td style="padding: 8px 0; color: #1a1a2e;">${participant.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #4a4a6a;">Email</td><td style="padding: 8px 0; color: #1a1a2e;">${participant.email}</td></tr>
              <tr><td style="padding: 8px 0; color: #4a4a6a;">College</td><td style="padding: 8px 0; color: #1a1a2e;">${participant.college}</td></tr>
              <tr><td style="padding: 8px 0; color: #4a4a6a;">Payment Status</td><td style="padding: 8px 0; color: #22c55e; font-weight: 600;">✅ Paid — ₹299</td></tr>
            </table>
          </div>
          ${participant.qrCode ? `
          <div style="text-align: center; margin: 24px 0;">
            <p style="color: #4a4a6a; margin-bottom: 12px;">Your Digital Pass (show at venue):</p>
            <img src="${participant.qrCode}" alt="QR Code" style="width: 200px; height: 200px;" />
          </div>
          ` : ''}
          <p style="color: #4a4a6a; line-height: 1.6; font-size: 14px;">
            Please keep this email for your records. Present your Registration ID or QR code at the venue for check-in.
          </p>
        </div>
        <div style="background: #0a1628; padding: 24px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 12px;">
            © 2026 IEEE RAS & IAS — MITS DU. All Rights Reserved.
          </p>
        </div>
      </div>
    `
  };

  if (!transporter) {
    console.log('--- EMAIL (not sent — SMTP not configured) ---');
    console.log(`To: ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log('-----------------------------------------------');
    return;
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${participant.email}`);
  } catch (error) {
    console.error('Email sending error:', error.message);
    // Don't throw — email failure shouldn't break registration
  }
};

module.exports = { sendConfirmationEmail };
