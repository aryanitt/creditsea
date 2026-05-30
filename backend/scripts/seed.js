"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../src/models/user.model");
dotenv_1.default.config();
const seedUsers = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loan_management');
        console.log('MongoDB Connected for Seeding');
        await user_model_1.User.deleteMany(); // Clear existing users
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash('Password@123', salt);
        const users = [
            { name: 'Admin User', email: 'admin@test.com', password: hashedPassword, role: user_model_1.Role.ADMIN },
            { name: 'Sales Executive', email: 'sales@test.com', password: hashedPassword, role: user_model_1.Role.SALES },
            { name: 'Sanction Executive', email: 'sanction@test.com', password: hashedPassword, role: user_model_1.Role.SANCTION },
            { name: 'Disbursement Executive', email: 'disbursement@test.com', password: hashedPassword, role: user_model_1.Role.DISBURSEMENT },
            { name: 'Collection Executive', email: 'collection@test.com', password: hashedPassword, role: user_model_1.Role.COLLECTION },
            { name: 'Borrower User', email: 'borrower@test.com', password: hashedPassword, role: user_model_1.Role.BORROWER },
        ];
        await user_model_1.User.insertMany(users);
        console.log('Users seeded successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};
seedUsers();
