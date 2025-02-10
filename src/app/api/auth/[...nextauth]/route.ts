import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth/next';
import { JWT } from 'next-auth/jwt';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// OTP Schema
const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  verified: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true }
});

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();

          // Find user
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }

          // Check password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            return null;
          }

          // Return user without password
          const { password: _, ...userWithoutPassword } = user.toObject();
          return userWithoutPassword;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    }),
    CredentialsProvider({
      id: "phone-otp",
      name: "Phone OTP",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
        otp: { label: "OTP", type: "text", placeholder: "123456" }
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber || !credentials?.otp) {
          return null;
        }

        try {
          await connectDB();

          // Verify OTP
          const otpDoc = await OTP.findOne({
            phoneNumber: credentials.phoneNumber,
            otp: credentials.otp,
            verified: false,
            expiresAt: { $gt: new Date() }
          }).sort({ createdAt: -1 });

          if (!otpDoc) {
            return null;
          }

          // Mark OTP as verified
          otpDoc.verified = true;
          await otpDoc.save();

          // Find or create user
          let user = await User.findOne({ phoneNumber: credentials.phoneNumber });
          
          if (!user) {
            user = await User.create({
              phoneNumber: credentials.phoneNumber,
              name: `User${Math.random().toString(36).slice(2, 8)}`,
              email: `${Math.random().toString(36).slice(2, 8)}@placeholder.com`,
              password: await bcrypt.hash(Math.random().toString(36), 10)
            });
          }

          return user.toObject();
        } catch (error) {
          console.error('Phone auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT, user: any, account: any }) {
      if (user) {
        token.role = user.role;
        token.id = user._id;
        if (account?.provider === 'google') {
          token.provider = 'google';
        } else if (account?.provider === 'phone-otp') {
          token.provider = 'phone';
          token.phoneNumber = user.phoneNumber;
        }
        // Add timestamp for token refresh
        token.createdAt = Date.now();
      }
      // Check if token needs refresh (e.g., every 24 hours)
      if (token.createdAt && (Date.now() - (token.createdAt as number) > 24 * 60 * 60 * 1000)) {
        try {
          // Refresh user data from database
          await connectDB();
          const updatedUser = await User.findById(token.id).select('-password');
          if (updatedUser) {
            token.role = updatedUser.role;
            token.createdAt = Date.now();
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }
      return token;
    },
    async session({ session, token }: { session: any, token: JWT }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.provider = token.provider;
        if (token.provider === 'phone') {
          session.user.phoneNumber = token.phoneNumber;
        }
        // Add session expiry
        session.expires = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString();
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
