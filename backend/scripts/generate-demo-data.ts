import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User, Role } from '../src/models/user.model';
import { Application, ApplicationStatus, EmploymentType } from '../src/models/application.model';
import { Loan } from '../src/models/loan.model';
import { Payment } from '../src/models/payment.model';
import { calculateLoanDetails } from '../src/utils/calculator.util';

dotenv.config();

const demoNames = [
  "Rahul Sharma", "Priya Patel", "Amit Singh", "Neha Gupta", 
  "Vikram Malhotra", "Anjali Desai", "Rohit Kumar", "Sneha Reddy",
  "Karan Johar", "Pooja Hegde", "Siddharth Verma", "Kavya Iyer",
  "Arjun Nair", "Divya Menon", "Manish Tiwari"
];

async function generateDemoData() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password@123', salt);

    for (let i = 0; i < demoNames.length; i++) {
      const name = demoNames[i];
      const email = `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@example.com`;
      
      // 1. Create User
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: Role.BORROWER,
      });

      // 2. Determine random status
      const statuses = [
        ApplicationStatus.APPLIED, 
        ApplicationStatus.SANCTIONED, 
        ApplicationStatus.DISBURSED, 
        ApplicationStatus.CLOSED, 
        ApplicationStatus.REJECTED
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      // 3. Create Application
      const principal = Math.floor(50000 + Math.random() * 450000); // 50k to 5L
      const tenure = Math.floor(30 + Math.random() * 335); // 30 to 365 days
      const { interestAmount, totalRepayment } = calculateLoanDetails(principal, tenure, 12);

      const app = await Application.create({
        userId: user._id,
        pan: `ABCDE${Math.floor(1000 + Math.random() * 9000)}F`,
        dob: new Date('1990-01-01'),
        monthlySalary: Math.floor(25000 + Math.random() * 150000),
        employmentType: EmploymentType.SALARIED,
        breStatus: 'PASSED',
        applicationStatus: status,
      });

      // 4. Create Loan (if not rejected)
      if (status !== ApplicationStatus.REJECTED) {
        let outstanding = totalRepayment;
        let paid = 0;

        if (status === ApplicationStatus.CLOSED) {
          paid = totalRepayment;
          outstanding = 0;
        } else if (status === ApplicationStatus.DISBURSED) {
          // Random partial payment
          if (Math.random() > 0.5) {
            paid = Math.floor(totalRepayment * (Math.random() * 0.8));
            outstanding = totalRepayment - paid;
          }
        }

        const loan = await Loan.create({
          userId: user._id,
          applicationId: app._id,
          principalAmount: principal,
          tenureDays: tenure,
          interestRate: 12,
          interestAmount,
          totalRepayment,
          outstandingBalance: outstanding,
          totalPaid: paid,
          status: status,
        });

        // 5. Create Payment history if any money was paid
        if (paid > 0) {
          await Payment.create({
            loanId: loan._id,
            utrNumber: `UTR${Math.floor(100000000 + Math.random() * 900000000)}`,
            amount: paid,
            paymentDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Random past date
            receivedBy: user._id,
          });
        }
      }

      console.log(`Generated records for ${name} [${status}]`);
    }

    console.log('✅ Demo Data Generation Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error generating demo data:', error);
    process.exit(1);
  }
}

generateDemoData();
