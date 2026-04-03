import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import SuperAdmin from '../modules/superAdmin/superAdmin.models.js';
import connectDB from '../config/db.js';

const seedSuperAdmin = async () => {
  await connectDB();

  // Pehle check karo koi superAdmin already hai?
  const existing = await SuperAdmin.findOne({ role: 'superAdmin' });

  if (existing) {
    console.log('✅ SuperAdmin already exists:', existing.email);
    process.exit(0);
  }

  // Naya superAdmin banao
  const admin = await SuperAdmin.create({
    name: 'Pallavi Patel',
    email: 'admin@saas.com',       // ← apna email daalo
    password: 'Admin@123',         // ← apna password daalo (hash ho jayega auto)
    role: 'superAdmin'
  });

  console.log('🎉 SuperAdmin created successfully!');
  console.log('📧 Email:', admin.email);
  console.log('🔑 Password: Admin@123  (yeh save karke rakho!)');
  process.exit(0);
};

seedSuperAdmin().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
