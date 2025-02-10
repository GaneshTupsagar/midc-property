import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { authOptions } from '../../api/auth/[...nextauth]/route';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

// Property Schema
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: [
      'Industrial Shed',
      'Factory',
      'Warehouse',
      'Office Space',
      'Land',
      'Industrial Gala',
      'Commercial Shop',
      'Commercial Showroom',
      'Cold Storage',
      'Data Center Space',
      'Research Center',
      'Manufacturing Unit',
      'Assembly Unit',
      'Laboratory Space',
      'Distribution Center',
      'Logistics Park',
      'Food Processing Unit',
      'Chemical Plant',
      'Pharmaceutical Unit',
      'IT Park Space'
    ]
  },
  subType: {
    type: String,
    enum: [
      'Ready to Move',
      'Under Construction',
      'Shell and Core',
      'Built to Suit',
      'Plug and Play'
    ]
  },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
  },
  listingType: { 
    type: String, 
    enum: ['Sale', 'Rent', 'Lease'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Pending', 'Sold', 'Rented', 'Leased'], 
    default: 'Active' 
  },
  specifications: {
    powerSupply: String,
    waterSupply: String,
    gasSupply: String,
    ceilingHeight: String,
    floorStrength: String,
    craneCapacity: String,
    loadingDocks: String,
    parkingSpaces: String,
    effluentTreatment: String,
    wasteManagement: String
  },
  amenities: [String],
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
  contact: {
    name: String,
    email: String,
    phone: String,
    company: String
  },
  package: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

// GET /api/properties
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 8; // Number of items per page
    const skip = (page - 1) * limit;

    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    try {
      await connectDB();
    } catch (dbError) {
      console.error('Failed to connect to MongoDB:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Build query based on search parameters
    const query: any = {};

    // Basic filters
    if (searchParams.get('listingType') && searchParams.get('listingType') !== 'all') {
      query.listingType = searchParams.get('listingType');
    }
    if (searchParams.get('type') && searchParams.get('type') !== 'all') {
      query.type = searchParams.get('type');
    }
    if (searchParams.get('zone')) {
      query['location.address'] = new RegExp(searchParams.get('zone')!, 'i');
    }

    // Price range
    const priceRange = searchParams.get('price');
    if (priceRange && priceRange !== 'any') {
      const [min, max] = priceRange.split('-').map(Number);
      query.price = { $gte: min };
      if (max) query.price.$lte = max;
    }

    // Area range
    const areaRange = searchParams.get('area');
    if (areaRange && areaRange !== 'any') {
      const [min, max] = areaRange.split('-').map(Number);
      query.area = { $gte: min };
      if (max) query.area.$lte = max;
    }

    // Specifications
    Object.keys(searchParams).forEach(key => {
      if (key.startsWith('spec_') && searchParams.get(key) !== 'Any') {
        const specKey = key.replace('spec_', '');
        query[`specifications.${specKey}`] = searchParams.get(key);
      }
    });

    // Amenities
    const amenities = searchParams.get('amenities');
    if (amenities) {
      query.amenities = { $all: amenities.split(',') };
    }

    // Keyword search
    const keyword = searchParams.get('keyword');
    if (keyword) {
      query.$or = [
        { title: new RegExp(keyword, 'i') },
        { description: new RegExp(keyword, 'i') },
        { 'location.address': new RegExp(keyword, 'i') }
      ];
    }

    // Get total count for pagination
    const totalCount = await Property.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    // Get paginated properties
    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      properties,
      currentPage: page,
      totalPages,
      totalCount,
    });
  } catch (error) {
    console.error('Error in GET /api/properties:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/properties
export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    const {
      propertyTitle,
      propertyDescription,
      propertyType,
      listingType,
      location,
      area,
      price,
      amenities,
      name,
      email,
      phone,
      company,
      package: packageName,
    } = data;

    // Create new property
    const property = new Property({
      title: propertyTitle,
      description: propertyDescription,
      type: propertyType,
      listingType,
      location,
      area: parseFloat(area),
      price: parseFloat(price),
      amenities,
      contact: {
        name,
        email,
        phone,
        company
      },
      package: packageName,
      status: 'pending', // Will be reviewed before going live
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await property.save();

    // Send notification to admin
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Property Listing Submission',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Property Listing Submission</h2>
          
          <h3>Property Details:</h3>
          <ul>
            <li>Title: ${propertyTitle}</li>
            <li>Type: ${propertyType}</li>
            <li>Location: ${location}</li>
            <li>Package: ${packageName}</li>
          </ul>
          
          <h3>Contact Information:</h3>
          <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
            ${company ? `<li>Company: ${company}</li>` : ''}
          </ul>
          
          <p>Please review this listing in the admin dashboard.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, propertyId: property._id });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property listing' },
      { status: 500 }
    );
  }
}
