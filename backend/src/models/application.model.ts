import mongoose, { Document, Schema } from 'mongoose';

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  APPLIED = 'APPLIED',
  REJECTED = 'REJECTED',
  SANCTIONED = 'SANCTIONED',
  DISBURSED = 'DISBURSED',
  CLOSED = 'CLOSED',
}

export enum EmploymentType {
  SALARIED = 'SALARIED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  UNEMPLOYED = 'UNEMPLOYED',
}

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  pan: string;
  dob: Date;
  monthlySalary: number;
  employmentType: EmploymentType;
  breStatus: 'PENDING' | 'PASSED' | 'FAILED';
  breReason?: string;
  documentId?: mongoose.Types.ObjectId;
  applicationStatus: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pan: { type: String, required: true },
    dob: { type: Date, required: true },
    monthlySalary: { type: Number, required: true },
    employmentType: {
      type: String,
      enum: Object.values(EmploymentType),
      required: true,
    },
    breStatus: {
      type: String,
      enum: ['PENDING', 'PASSED', 'FAILED'],
      default: 'PENDING',
    },
    breReason: { type: String },
    documentId: { type: Schema.Types.ObjectId, ref: 'Document' },
    applicationStatus: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.DRAFT,
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>('Application', applicationSchema);
