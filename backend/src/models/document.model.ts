import mongoose, { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
  applicationId: mongoose.Types.ObjectId;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const DocumentModel = mongoose.model<IDocument>('Document', documentSchema);
