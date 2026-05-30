import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Loan } from '../models/loan.model';
import { Application, ApplicationStatus } from '../models/application.model';
import { calculateLoanDetails } from '../utils/calculator.util';
import { AuditLog } from '../models/audit-log.model';
import { canTransitionTo } from '../services/loan-state.service';
import { Role } from '../models/user.model';

export const applyForLoan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) return;
    const { applicationId, principalAmount, tenureDays, interestRate = 12 } = req.body;

    const application = await Application.findById(applicationId);
    if (!application || application.userId.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: 'Application not found or unauthorized' });
      return;
    }

    if (application.applicationStatus !== ApplicationStatus.APPLIED) {
      res.status(400).json({ message: 'Invalid application status for loan application' });
      return;
    }

    const { interestAmount, totalRepayment } = calculateLoanDetails(principalAmount, tenureDays, interestRate);

    const loan = await Loan.create({
      userId: req.user._id,
      applicationId,
      principalAmount,
      tenureDays,
      interestRate,
      interestAmount,
      totalRepayment,
      outstandingBalance: totalRepayment,
      status: ApplicationStatus.APPLIED,
    });

    await AuditLog.create({
      action: 'Loan Applied',
      performedBy: req.user._id,
      entityType: 'Loan',
      entityId: loan._id,
    });

    res.status(201).json(loan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLoans = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) return;
    
    let filter = {};
    if (req.user.role === Role.BORROWER) {
      filter = { userId: req.user._id };
    } else if (req.user.role === Role.SANCTION) {
      // Sanction desk needs to see APPLIED (pending) and already processed loans (SANCTIONED, etc.)
      filter = {};
    } else if (req.user.role === Role.DISBURSEMENT) {
      // Show pending disbursement (SANCTIONED) and already disbursed history
      filter = { status: { $in: [ApplicationStatus.SANCTIONED, ApplicationStatus.DISBURSED, ApplicationStatus.CLOSED] } };
    } else if (req.user.role === Role.COLLECTION) {
      filter = { status: { $in: [ApplicationStatus.DISBURSED, ApplicationStatus.CLOSED] } };
    }

    const loans = await Loan.find(filter)
      .populate('userId', 'name email')
      .populate('applicationId')
      .sort({ createdAt: -1 });

    res.json(loans);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const approveLoan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) return;
    const { id } = req.params;

    const loan = await Loan.findById(id);
    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }

    if (!canTransitionTo(loan.status, ApplicationStatus.SANCTIONED)) {
      res.status(400).json({ message: `Cannot transition from ${loan.status} to SANCTIONED` });
      return;
    }

    loan.status = ApplicationStatus.SANCTIONED;
    loan.approvedBy = req.user._id as any;
    loan.approvedAt = new Date();
    await loan.save();

    await Application.findByIdAndUpdate(loan.applicationId, { applicationStatus: ApplicationStatus.SANCTIONED });

    await AuditLog.create({
      action: 'Loan Sanctioned',
      performedBy: req.user._id,
      entityType: 'Loan',
      entityId: loan._id,
    });

    res.json(loan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectLoan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) return;
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      res.status(400).json({ message: 'Rejection reason is mandatory' });
      return;
    }

    const loan = await Loan.findById(id);
    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }

    if (!canTransitionTo(loan.status, ApplicationStatus.REJECTED)) {
      res.status(400).json({ message: `Cannot transition from ${loan.status} to REJECTED` });
      return;
    }

    loan.status = ApplicationStatus.REJECTED;
    await loan.save();

    await Application.findByIdAndUpdate(loan.applicationId, { applicationStatus: ApplicationStatus.REJECTED });

    await AuditLog.create({
      action: 'Loan Rejected',
      performedBy: req.user._id,
      entityType: 'Loan',
      entityId: loan._id,
      details: `Reason: ${reason}`,
    });

    res.json(loan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const disburseLoan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) return;
    const { id } = req.params;

    const loan = await Loan.findById(id);
    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }

    if (!canTransitionTo(loan.status, ApplicationStatus.DISBURSED)) {
      res.status(400).json({ message: `Cannot transition from ${loan.status} to DISBURSED` });
      return;
    }

    loan.status = ApplicationStatus.DISBURSED;
    loan.disbursedBy = req.user._id as any;
    loan.disbursedAt = new Date();
    await loan.save();

    await Application.findByIdAndUpdate(loan.applicationId, { applicationStatus: ApplicationStatus.DISBURSED });

    await AuditLog.create({
      action: 'Loan Disbursed',
      performedBy: req.user._id,
      entityType: 'Loan',
      entityId: loan._id,
    });

    res.json(loan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLoanStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== Role.ADMIN) {
      res.status(403).json({ message: 'Only admin can forcefully update status' });
      return;
    }
    const { id } = req.params;
    const { status } = req.body;

    const loan = await Loan.findById(id);
    if (!loan) {
      res.status(404).json({ message: 'Loan not found' });
      return;
    }

    const oldStatus = loan.status;
    loan.status = status;
    await loan.save();

    await Application.findByIdAndUpdate(loan.applicationId, { applicationStatus: status });

    await AuditLog.create({
      action: 'Admin Status Override',
      performedBy: req.user._id,
      entityType: 'Loan',
      entityId: loan._id,
      details: `Changed from ${oldStatus} to ${status}`,
    });

    res.json(loan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
