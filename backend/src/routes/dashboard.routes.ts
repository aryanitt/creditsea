import { Router } from 'express';
import { getAnalytics, getLeads } from '../controllers/dashboard.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';
import { Role } from '../models/user.model';

const router = Router();

router.get('/analytics', protect, authorize(Role.ADMIN), getAnalytics);
router.get('/leads', protect, authorize(Role.ADMIN, Role.SALES), getLeads);

export default router;
