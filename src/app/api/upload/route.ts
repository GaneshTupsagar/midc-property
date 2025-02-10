import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import Property from '@/models/Property'; // Import your Property model

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function addWatermark(imageBuffer: Buffer): Promise<Buffer> {
  const textBuffer = Buffer.from(
    `<svg>
      <text x="10" y="50" font-size="30" fill="white" opacity="0.5">MIDC Property</text>
    </svg>`
  );

  return sharp(imageBuffer)
    .composite([
      {
        input: textBuffer,
        gravity: 'southeast', // Position the text
      },
    ])
    .toBuffer(); // Maintain original quality
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const convertedImage = await sharp(Buffer.from(buffer))
      .toFormat('jpeg') // Change 'jpeg' to 'png' if you prefer PNG format
      .toBuffer();

    const watermarkedImage = await addWatermark(convertedImage);

    // Generate unique filename
    const extension = 'jpeg'; // Changed to 'jpeg' due to conversion
    const filename = `${uuidv4()}.${extension}`;

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `properties/${filename}`,
      Body: watermarkedImage,
      ContentType: 'image/jpeg', // Changed to 'image/jpeg' due to conversion
      ACL: 'public-read',
    });

    await s3Client.send(command);

    // Return the URL of the uploaded file
    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/properties/${filename}`;

    const propertyId = uuidv4(); // Generate unique property ID

    // Save property details to the database
    const newProperty = new Property({
      propertyId: propertyId,
      imageUrl: fileUrl,
      title: title,
      description: description,
      location: location,
    });

    await newProperty.save();

    return NextResponse.json({ message: 'File uploaded successfully', url: fileUrl, propertyId }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
