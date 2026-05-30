"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../src/models/user.model");
const application_model_1 = require("../src/models/application.model");
const loan_model_1 = require("../src/models/loan.model");
const payment_model_1 = require("../src/models/payment.model");
const calculator_util_1 = require("../src/utils/calculator.util");
dotenv_1.default.config();
const demoNames = [
    "Rahul Sharma", "Priya Patel", "Amit Singh", "Neha Gupta",
    "Vikram Malhotra", "Anjali Desai", "Rohit Kumar", "Sneha Reddy",
    "Karan Johar", "Pooja Hegde", "Siddharth Verma", "Kavya Iyer",
    "Arjun Nair", "Divya Menon", "Manish Tiwari"
];
async function generateDemoData() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash('Password@123', salt);
        for (let i = 0; i < demoNames.length; i++) {
            const name = demoNames[i];
            const email = `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@example.com`;
            // 1. Create User
            const user = await user_model_1.User.create({
                name,
                email,
                password: hashedPassword,
                role: user_model_1.Role.BORROWER,
            });
            // 2. Determine random status
            const statuses = [
                application_model_1.ApplicationStatus.APPLIED,
                application_model_1.ApplicationStatus.SANCTIONED,
                application_model_1.ApplicationStatus.DISBURSED,
                application_model_1.ApplicationStatus.CLOSED,
                application_model_1.ApplicationStatus.REJECTED
            ];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            // 3. Create Application
            const principal = Math.floor(50000 + Math.random() * 450000); // 50k to 5L
            const tenure = Math.floor(30 + Math.random() * 335); // 30 to 365 days
            const { interestAmount, totalRepayment } = (0, calculator_util_1.calculateLoanDetails)(principal, tenure, 12);
            const app = await application_model_1.Application.create({
                userId: user._id,
                pan: `ABCDE${Math.floor(1000 + Math.random() * 9000)}F`,
                dob: new Date('1990-01-01'),
                monthlySalary: Math.floor(25000 + Math.random() * 150000),
                employmentType: application_model_1.EmploymentType.SALARIED,
                breStatus: 'PASSED',
                applicationStatus: status,
            });
            // 4. Create Loan (if not rejected)
            if (status !== application_model_1.ApplicationStatus.REJECTED) {
                let outstanding = totalRepayment;
                let paid = 0;
                if (status === application_model_1.ApplicationStatus.CLOSED) {
                    paid = totalRepayment;
                    outstanding = 0;
                }
                else if (status === application_model_1.ApplicationStatus.DISBURSED) {
                    // Random partial payment
                    if (Math.random() > 0.5) {
                        paid = Math.floor(totalRepayment * (Math.random() * 0.8));
                        outstanding = totalRepayment - paid;
                    }
                }
                const loan = await loan_model_1.Loan.create({
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
                    await payment_model_1.Payment.create({
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
    }
    catch (error) {
        console.error('Error generating demo data:', error);
        process.exit(1);
    }
}
generateDemoData();
