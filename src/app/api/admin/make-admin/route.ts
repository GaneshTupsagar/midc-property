import { NextResponse } from 'next/server';
import { makeUserAdmin } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const success = await makeUserAdmin(email);

        if (success) {
            return NextResponse.json(
                { message: 'User has been made admin successfully' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: 'Failed to make user admin' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error in make-admin route:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
