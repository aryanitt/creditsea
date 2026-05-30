import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User, Role } from '../src/models/user.model';
import { Application } from '../src/models/application.model';
import { Loan } from '../src/models/loan.model';

dotenv.config();

async function resetBorrower() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loan_management');
    console.log('Connected to MongoDB');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password@123', salt);

    // Surgical upsert: Preserve borrower@test.com's user ID so their loans & applications are never lost on reset
    const existingBorrower = await User.findOne({ email: 'borrower@test.com' });
    let borrowerId;

    if (existingBorrower) {
      existingBorrower.password = hashedPassword;
      existingBorrower.name = 'Borrower User';
      existingBorrower.role = Role.BORROWER;
      existingBorrower.status = 'ACTIVE';
      await existingBorrower.save();
      borrowerId = existingBorrower._id;
      console.log('Successfully reset borrower@test.com password to Password@123 (preserved _id)');
    } else {
      const newBorrower = await User.create({
        name: 'Borrower User',
        email: 'borrower@test.com',
        password: hashedPassword,
        role: Role.BORROWER,
        status: 'ACTIVE'
      });
      borrowerId = newBorrower._id;
      console.log('Successfully created fresh borrower@test.com with password Password@123');
    }

    // Database integrity: Clean up any orphaned Applications and Loans where the userId no longer exists in the User collection
    console.log('Running database integrity check to remove orphaned blank rows...');
    
    const allApplications = await Application.find();
    let orphanedAppCount = 0;
    for (const app of allApplications) {
      const userExists = await User.findById(app.userId);
      if (!userExists) {
        await Application.deleteOne({ _id: app._id });
        await Loan.deleteMany({ applicationId: app._id });
        orphanedAppCount++;
      }
    }

    const allLoans = await Loan.find();
    let orphanedLoanCount = 0;
    for (const loan of allLoans) {
      const userExists = await User.findById(loan.userId);
      if (!userExists) {
        await Loan.deleteOne({ _id: loan._id });
        orphanedLoanCount++;
      }
    }

    console.log(`Cleaned up ${orphanedAppCount} orphaned applications and ${orphanedLoanCount} orphaned loans.`);
    console.log('DB Integrity Check complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting borrower:', error);
    process.exit(1);
  }
}

resetBorrower();
