import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { to, subject, template, data } = await request.json();

    // Email templates
    const templates: { [key: string]: (data: any) => string } = {
      'purchase-confirmation': (data) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your purchase, ${data.name}!</h2>
          
          <p>Your advertising package has been successfully activated.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3>Package Details:</h3>
            <p>Package: ${data.package}</p>
            <p>Invoice Number: ${data.invoice}</p>
          </div>
          
          <p>Your property listing will be reviewed and published shortly. You'll receive another notification once it's live.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666;">Best regards,<br>MIDC Property Team</p>
          </div>
        </div>
      `,
    };

    // Get the email template
    const emailTemplate = templates[template];
    if (!emailTemplate) {
      return NextResponse.json(
        { error: 'Invalid email template' },
        { status: 400 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: emailTemplate(data),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
