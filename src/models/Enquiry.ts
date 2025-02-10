import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  property?: mongoose.Types.ObjectId;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Enquiry = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', enquirySchema);

export default Enquiry;
