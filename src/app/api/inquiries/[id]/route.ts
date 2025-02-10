import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import { authOptions } from '../../auth/[...nextauth]/route';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

const Inquiry = mongoose.models.Inquiry;

// PATCH /api/inquiries/[id]
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    
    const inquiry = await Inquiry.findByIdAndUpdate(
      params.id,
      { 
        ...data,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    // Send notification if status changed to 'scheduled'
    if (data.status === 'scheduled' && inquiry.email) {
      // You can implement email notification here
      // await sendScheduledVisitEmail(inquiry);
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

// DELETE /api/inquiries/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const inquiry = await Inquiry.findByIdAndDelete(params.id);

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
