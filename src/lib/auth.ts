import { getServerSession } from 'next-auth';
import dbConnect from './dbConnect';
import mongoose from 'mongoose';

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

export async function isAdmin(email: string | null | undefined): Promise<boolean> {
    if (!email) return false;
    
    try {
        await dbConnect();
        const user = await User.findOne({ email: email.toLowerCase() });
        return user?.role === 'admin';
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

export async function requireAdmin() {
    const session = await getServerSession();
    if (!session?.user?.email || !await isAdmin(session.user.email)) {
        throw new Error('Unauthorized: Admin access required');
    }
    return session;
}

export async function makeUserAdmin(email: string): Promise<boolean> {
    try {
        await dbConnect();
        const result = await User.updateOne(
            { email: email.toLowerCase() },
            { $set: { role: 'admin' } }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error making user admin:', error);
        return false;
    }
}
