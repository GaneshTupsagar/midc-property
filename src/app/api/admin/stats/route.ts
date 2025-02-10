import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const session = await getServerSession();
    
    // Check if user is authenticated and is admin
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    // Fetch all required stats
    const [
      totalUsers,
      totalProperties,
      totalEnquiries,
      activeListings,
      pendingApprovals,
      revenue
    ] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('properties').countDocuments(),
      db.collection('enquiries').countDocuments(),
      db.collection('properties').countDocuments({ status: 'active' }),
      db.collection('properties').countDocuments({ status: 'pending' }),
      db.collection('transactions').aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ]).toArray()
    ]);

    return NextResponse.json({
      totalUsers,
      totalProperties,
      totalEnquiries,
      activeListings,
      pendingApprovals,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
