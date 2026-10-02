require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ieee-workshop');
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL || 'admin@ieeworkshop.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123456';

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }

    await Admin.create({
      email,
      password,
      name: 'Workshop Admin',
      role: 'superadmin'
    });

    console.log('Admin created successfully!');
    console.log(`Email: ${email}`);
    console.log('Use the password from your .env file to login.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();
