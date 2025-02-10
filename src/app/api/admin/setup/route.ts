import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(req: Request) {
    try {
        await dbConnect();

        const email = 'ganesh0988@gmail.com';
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            const hashedPassword = await bcrypt.hash('admin123', 12);
            user = await User.create({
                name: 'Ganesh',
                email,
                password: hashedPassword,
                role: 'admin'
            });
            return NextResponse.json({ message: 'Admin user created successfully' });
        } else {
            // Update existing user to admin
            await User.updateOne(
                { email },
                { 
                    $set: { 
                        role: 'admin',
                        updatedAt: new Date()
                    }
                }
            );
            return NextResponse.json({ message: 'Existing user updated to admin' });
        }
    } catch (error) {
        console.error('Error setting up admin:', error);
        return NextResponse.json(
            { error: 'Failed to set up admin user' },
            { status: 500 }
        );
    }
}
