import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Loan } from '../models/loan.model';
import { Application, ApplicationStatus } from '../models/application.model';
import { User, Role } from '../models/user.model';

export const getAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalApplications = await Application.countDocuments();
    const appliedLoans = await Application.countDocuments({ applicationStatus: ApplicationStatus.APPLIED });
    const rejectedLoans = await Application.countDocuments({ applicationStatus: ApplicationStatus.REJECTED });
    
    const sanctionedLoans = await Loan.countDocuments({ status: ApplicationStatus.SANCTIONED });
    const disbursedLoans = await Loan.countDocuments({ status: ApplicationStatus.DISBURSED });
    const closedLoans = await Loan.countDocuments({ status: ApplicationStatus.CLOSED });

    const loans = await Loan.find();
    let totalOutstanding = 0;
    let totalPaid = 0;
    let totalRepayment = 0;

    loans.forEach(loan => {
      totalOutstanding += loan.outstandingBalance;
      totalPaid += loan.totalPaid;
      totalRepayment += loan.totalRepayment;
    });

    const collectionRate = totalRepayment > 0 ? ((totalPaid / totalRepayment) * 100).toFixed(2) : 0;

    res.json({
      totalApplications,
      appliedLoans,
      rejectedLoans,
      sanctionedLoans,
      disbursedLoans,
      closedLoans,
      totalOutstanding,
      totalPaid,
      collectionRate,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Find users with role BORROWER who do not have an application
    const borrowers = await User.find({ role: Role.BORROWER }).select('-password');
    const applications = await Application.find().select('userId');
    const applicantsIds = applications.map(app => app.userId.toString());
    
    const leads = borrowers.filter(b => !applicantsIds.includes(b._id.toString()));
    res.json(leads);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
