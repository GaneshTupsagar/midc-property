export type UserRole = 'AGENT' | 'OWNER' | 'BUYER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  emailVerified?: Date;
  packageType?: 'BASIC' | 'PREMIUM' | 'PROFESSIONAL';
  packageExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  verificationDocuments?: {
    type: string;
    url: string;
    verified: boolean;
  }[];
}
