import { ApplicationStatus } from '../models/application.model';

const allowedTransitions: Record<ApplicationStatus, ApplicationStatus[]> = {
  [ApplicationStatus.DRAFT]: [ApplicationStatus.APPLIED],
  [ApplicationStatus.APPLIED]: [ApplicationStatus.SANCTIONED, ApplicationStatus.REJECTED],
  [ApplicationStatus.SANCTIONED]: [ApplicationStatus.DISBURSED],
  [ApplicationStatus.DISBURSED]: [ApplicationStatus.CLOSED],
  [ApplicationStatus.REJECTED]: [],
  [ApplicationStatus.CLOSED]: [],
};

export const canTransitionTo = (currentStatus: ApplicationStatus, nextStatus: ApplicationStatus): boolean => {
  const allowed = allowedTransitions[currentStatus] || [];
  return allowed.includes(nextStatus);
};
