import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User, Role } from '../src/models/user.model';

dotenv.config();

async function resetBorrower() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loan_management');
    console.log('Connected to MongoDB');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password@123', salt);

    // Surgically delete existing borrower@test.com if any, and create a fresh one
    await User.deleteMany({ email: 'borrower@test.com' });
    
    await User.create({
      name: 'Borrower User',
      email: 'borrower@test.com',
      password: hashedPassword,
      role: Role.BORROWER,
      status: 'ACTIVE'
    });

    console.log('Successfully created/reset borrower@test.com with password Password@123');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting borrower:', error);
    process.exit(1);
  }
}

resetBorrower();
