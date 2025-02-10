import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

const sampleProperties = [
  {
    title: 'Modern Industrial Shed in MIDC Bhosari',
    description: 'A state-of-the-art industrial shed with modern amenities and excellent connectivity.',
    type: 'Industrial Shed',
    price: 15000000,
    area: 5000,
    location: {
      lat: 18.6298,
      lng: 73.8472,
      address: 'Plot No. 123, MIDC Bhosari, Pune, Maharashtra 411026'
    },
    listingType: 'Sale',
    status: 'Active',
    nearbyFacilities: [
      {
        type: 'Transport',
        name: 'Pune Railway Station',
        distance: '12 km',
        location: { lat: 18.5285, lng: 73.8743 }
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1590937893216-bce2a6a4b49b?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1590937894689-0af9c0c64e89?auto=format&fit=crop&w=800'
    ]
  },
  {
    title: 'Warehouse Space in MIDC Chakan',
    description: 'Large warehouse space suitable for manufacturing or storage purposes.',
    type: 'Warehouse',
    price: 25000000,
    area: 8000,
    location: {
      lat: 18.7619,
      lng: 73.8790,
      address: 'Plot No. 456, MIDC Chakan Phase II, Pune, Maharashtra 410501'
    },
    listingType: 'Lease',
    status: 'Active',
    nearbyFacilities: [
      {
        type: 'Transport',
        name: 'Chakan Bus Station',
        distance: '3 km',
        location: { lat: 18.7582, lng: 73.8675 }
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1586528116493-5aa5c5f0b62a?auto=format&fit=crop&w=800'
    ]
  },
  {
    title: 'Factory Space in MIDC Ranjangaon',
    description: 'Ready-to-move factory space with all necessary industrial infrastructure.',
    type: 'Factory',
    price: 35000000,
    area: 12000,
    location: {
      lat: 18.7748,
      lng: 74.2449,
      address: 'Plot No. 789, MIDC Ranjangaon, Pune, Maharashtra 412220'
    },
    listingType: 'Sale',
    status: 'Active',
    nearbyFacilities: [
      {
        type: 'Transport',
        name: 'Ranjangaon Bus Stop',
        distance: '1 km',
        location: { lat: 18.7745, lng: 74.2440 }
      }
    ],
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1581578731585-c137aa9c3b23?auto=format&fit=crop&w=800'
    ]
  }
];

// Property Schema (make sure this matches the one in your properties route)
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

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Clear existing properties
    await Property.deleteMany({});

    // Insert sample properties
    await Property.insertMany(sampleProperties);

    return NextResponse.json({
      message: 'Database seeded successfully',
      count: sampleProperties.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
