import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import applicationRoutes from './routes/application.routes';
import loanRoutes from './routes/loan.routes';
import paymentRoutes from './routes/payment.routes';
import dashboardRoutes from './routes/dashboard.routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint at root
app.get('/', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'CreditSea Loan Management System API is running successfully!',
    timestamp: new Date()
  });
});

export default app;
