import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

// Inquiry Schema
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  requirement: { type: String, required: true },
  visitDate: String,
  message: String,
  propertyId: String,
  propertyTitle: String,
  source: String,
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'scheduled', 'completed', 'cancelled'],
    default: 'new'
  },
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// POST /api/inquiries
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Create inquiry in database
    const inquiry = await Inquiry.create(data);

    // Send email notification
    const emailContent = `
      New Inquiry Received:
      
      Name: ${data.name}
      Phone: ${data.phone}
      Email: ${data.email || 'Not provided'}
      Requirement: ${data.requirement}
      ${data.propertyTitle ? `Property: ${data.propertyTitle}` : ''}
      ${data.visitDate ? `Requested Visit Date: ${data.visitDate}` : ''}
      ${data.message ? `Message: ${data.message}` : ''}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Property Inquiry',
      text: emailContent,
    });

    // Send WhatsApp notification if configured
    if (process.env.WHATSAPP_API_KEY) {
      const whatsappMessage = `New Inquiry:\n${data.name} (${data.phone}) - ${data.requirement}`;
      await fetch(process.env.WHATSAPP_API_ENDPOINT!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`,
        },
        body: JSON.stringify({
          phone: process.env.WHATSAPP_ADMIN_NUMBER,
          message: whatsappMessage,
        }),
      });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}

// GET /api/inquiries
export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
