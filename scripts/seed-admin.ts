import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    avatar: String,
    phone: String,
    isActive: Boolean,
  }, { timestamps: true });

  const User = mongoose.models.User || mongoose.model('User', userSchema);

  const email = 'admin@interiordesign.com';
  const existing = await User.findOne({ email });

  if (existing) {
    await User.updateOne({ email }, { $set: { role: 'admin' } });
    console.log('✅ Updated existing user to admin:', email);
  } else {
    const hashed = await bcrypt.hash('Admin123!', 12);
    await User.create({
      name: 'Admin User',
      email,
      password: hashed,
      role: 'admin',
      isActive: true,
    });
    console.log('✅ Created admin user:', email);
  }

  await mongoose.disconnect();
  console.log('Database seeding complete!');
}

seed().catch(console.error);