import { Router } from 'express';
import { recordPayment, getPayments } from '../controllers/payment.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';
import { Role } from '../models/user.model';

const router = Router();

router.route('/')
  .post(protect, authorize(Role.COLLECTION), recordPayment)
  .get(protect, authorize(Role.COLLECTION), getPayments);

export default router;
