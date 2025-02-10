const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

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

async function createUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create admin user
    const adminPassword = 'Admin@123';
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@midcproperty.com',
      password: hashedAdminPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Admin credentials:');
    console.log('Email: admin@midcproperty.com');
    console.log('Password: Admin@123');

    // Create regular user
    const userPassword = 'User@123';
    const hashedUserPassword = await bcrypt.hash(userPassword, 10);
    
    const user = new User({
      name: 'Regular User',
      email: 'user@midcproperty.com',
      password: hashedUserPassword,
      role: 'user'
    });

    await user.save();
    console.log('\nRegular user created successfully');
    console.log('User credentials:');
    console.log('Email: user@midcproperty.com');
    console.log('Password: User@123');

  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createUsers();
