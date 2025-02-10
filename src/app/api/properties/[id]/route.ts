import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import { authOptions } from '../../auth/[...nextauth]/route';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

// Property Schema
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
  },
  listingType: { type: String, enum: ['Sale', 'Lease'], required: true },
  status: { type: String, enum: ['Active', 'Pending', 'Sold', 'Leased'], default: 'Active' },
  nearbyFacilities: [{
    type: { type: String },
    name: { type: String },
    distance: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number }
    }
  }],
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

// GET /api/properties/[id]
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property details:', error);
    return NextResponse.json({ error: 'Failed to fetch property details' }, { status: 500 });
  }
}

// PUT /api/properties/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    
    const property = await Property.findByIdAndUpdate(
      params.id,
      {
        ...data,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

// DELETE /api/properties/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const property = await Property.findByIdAndDelete(params.id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}
