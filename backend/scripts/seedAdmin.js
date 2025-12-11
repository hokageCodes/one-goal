const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      console.log('Admin user already exists:', adminExists.email);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      email: 'admin@onegoal.com',
      password: 'Admin@123', // Change this in production!
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true, // Admin is pre-verified
      authProvider: 'email'
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: Admin@123');
    console.log('⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
