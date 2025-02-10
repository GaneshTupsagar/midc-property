import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Property Schema
const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
  },
  images: [String],
  area: Number,
  type: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    
    if (!lat || !lng) {
      return NextResponse.json(
        { message: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find properties within 50km radius
    // Using MongoDB's geospatial query
    const properties = await Property.find({
      'location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: 50000 // 50km in meters
        }
      }
    }).limit(12);

    return NextResponse.json(properties);
  } catch (error: any) {
    console.error('Error fetching nearby properties:', error);
    return NextResponse.json(
      { message: 'Error fetching nearby properties' },
      { status: 500 }
    );
  }
}
