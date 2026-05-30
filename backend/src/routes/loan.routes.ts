import { Router } from 'express';
import { applyForLoan, getLoans, approveLoan, rejectLoan, disburseLoan, updateLoanStatus } from '../controllers/loan.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';
import { Role } from '../models/user.model';

const router = Router();

router.route('/')
  .post(protect, authorize(Role.BORROWER), applyForLoan)
  .get(protect, getLoans);

router.patch('/:id/approve', protect, authorize(Role.SANCTION), approveLoan);
router.patch('/:id/reject', protect, authorize(Role.SANCTION), rejectLoan);
router.patch('/:id/disburse', protect, authorize(Role.DISBURSEMENT), disburseLoan);
router.patch('/:id/status', protect, authorize(Role.ADMIN), updateLoanStatus);

export default router;
