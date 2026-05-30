import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Payment } from '../models/payment.model';
import { Loan } from '../models/loan.model';
import { Application, ApplicationStatus } from '../models/application.model';
import { AuditLog } from '../models/audit-log.model';

export const recordPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) return;
    const { loanId, utrNumber, amount, paymentDate } = req.body;

    if (amount <= 0) {
      res.status(400).json({ message: 'Amount must be greater than 0' });
      return;
    }

    const loan = await Loan.findById(loanId);
    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }

    if (loan.status !== ApplicationStatus.DISBURSED) {
      res.status(400).json({ message: 'Loan is not in DISBURSED state' });
      return;
    }

    if (amount > loan.outstandingBalance) {
      res.status(400).json({ message: 'Amount cannot exceed outstanding balance' });
      return;
    }

    const existingPayment = await Payment.findOne({ utrNumber });
    if (existingPayment) {
      res.status(400).json({ message: 'UTR Number must be unique' });
      return;
    }

    const payment = await Payment.create({
      loanId,
      utrNumber,
      amount,
      paymentDate: new Date(paymentDate),
      receivedBy: req.user._id,
    });

    loan.totalPaid += amount;
    loan.outstandingBalance -= amount;

    // Prevent floating point arithmetic issues (e.g. 0.0000000001)
    loan.outstandingBalance = Math.max(0, Math.round(loan.outstandingBalance * 100) / 100);

    await AuditLog.create({
      action: 'Payment Recorded',
      performedBy: req.user._id,
      entityType: 'Loan',
      entityId: loan._id,
      details: `Amount: ${amount}, UTR: ${utrNumber}`,
    });

    // Auto-closure logic
    if (loan.outstandingBalance <= 0) {
      loan.status = ApplicationStatus.CLOSED;
      await Application.findByIdAndUpdate(loan.applicationId, { applicationStatus: ApplicationStatus.CLOSED });
      
      await AuditLog.create({
        action: 'Loan Closed',
        performedBy: req.user._id,
        entityType: 'Loan',
        entityId: loan._id,
        details: 'Auto-closed due to full repayment',
      });
    }

    await loan.save();

    res.status(201).json({ payment, loan });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPayments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const payments = await Payment.find().populate('loanId').sort({ paymentDate: -1 });
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
