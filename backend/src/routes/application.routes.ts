import { Router } from 'express';
import { createApplication, uploadSalarySlip, getApplications, getApplicationById } from '../controllers/application.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';
import { upload } from '../middleware/upload.middleware';
import { Role } from '../models/user.model';

const router = Router();

router.route('/')
  .post(protect, authorize(Role.BORROWER), createApplication)
  .get(protect, getApplications);

router.post('/upload', protect, authorize(Role.BORROWER), upload.single('salarySlip'), uploadSalarySlip);

router.get('/:id', protect, getApplicationById);

export default router;
