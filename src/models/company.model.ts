import mongoose from 'mongoose';

export interface Company {
  _id: mongoose.Schema.Types.ObjectId;
  name: string
}

const CompanySchema = new mongoose.Schema<Company>({
  name: {
    type: String,
    required: true
  }
});

export const CompanyModel = mongoose.model<Company>('Company', CompanySchema);