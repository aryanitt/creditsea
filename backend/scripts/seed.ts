import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User, Role } from '../src/models/user.model';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loan_management');
    console.log('MongoDB Connected for Seeding');

    await User.deleteMany(); // Clear existing users

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password@123', salt);

    const users = [
      { name: 'Admin User', email: 'admin@test.com', password: hashedPassword, role: Role.ADMIN },
      { name: 'Sales Executive', email: 'sales@test.com', password: hashedPassword, role: Role.SALES },
      { name: 'Sanction Executive', email: 'sanction@test.com', password: hashedPassword, role: Role.SANCTION },
      { name: 'Disbursement Executive', email: 'disbursement@test.com', password: hashedPassword, role: Role.DISBURSEMENT },
      { name: 'Collection Executive', email: 'collection@test.com', password: hashedPassword, role: Role.COLLECTION },
      { name: 'Borrower User', email: 'borrower@test.com', password: hashedPassword, role: Role.BORROWER },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
