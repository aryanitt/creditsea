import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Application, ApplicationStatus } from '../models/application.model';
import { DocumentModel } from '../models/document.model';
import { runBRE } from '../services/bre.service';
import { AuditLog } from '../models/audit-log.model';
import { User, Role } from '../models/user.model';

export const createApplication = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { pan, dob, monthlySalary, employmentType } = req.body;
    
    if (!req.user) return;

    // Run Business Rules Engine
    const breResult = runBRE({ dob: new Date(dob), monthlySalary, employmentType, pan });

    let applicationStatus = ApplicationStatus.APPLIED;
    if (!breResult.passed) {
      applicationStatus = ApplicationStatus.REJECTED;
    }

    const application = await Application.create({
      userId: req.user._id,
      pan,
      dob: new Date(dob),
      monthlySalary,
      employmentType,
      breStatus: breResult.passed ? 'PASSED' : 'FAILED',
      breReason: breResult.reason,
      applicationStatus,
    });

    await AuditLog.create({
      action: 'Application Created',
      performedBy: req.user._id,
      entityType: 'Application',
      entityId: application._id,
      details: `Status: ${applicationStatus}`,
    });

    if (!breResult.passed) {
      res.status(400).json({ 
        message: 'Application rejected by BRE', 
        reason: breResult.reason,
        application 
      });
      return;
    }

    res.status(201).json(application);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadSalarySlip = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { applicationId } = req.body;
    
    if (!req.file || !req.user) {
      res.status(400).json({ message: 'File is required' });
      return;
    }

    const application = await Application.findById(applicationId);
    if (!application || application.userId.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: 'Application not found or unauthorized' });
      return;
    }

    const document = await DocumentModel.create({
      applicationId,
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    application.documentId = document._id as any;
    await application.save();

    res.status(201).json(document);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) return;
    
    let filter = {};
    if (req.user.role === Role.BORROWER) {
      filter = { userId: req.user._id };
    }

    const applications = await Application.find(filter).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('documentId');
      
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }
    res.json(application);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
