import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { Role } from '../models/user.model';

export const authorize = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    if (req.user.role === Role.ADMIN) {
      // Admin has access to all modules
      return next();
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Not authorized for this module' });
      return;
    }

    next();
  };
};
