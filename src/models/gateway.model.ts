import mongoose from 'mongoose';
import { Code, Status } from '../types/gateway';

export interface GatewayCompany {
  company: mongoose.Schema.Types.ObjectId,
  status: Status;
  keySecret: string;
  keyPublic: string;
}

export interface Gateway {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  code: Code;
  status: Status;
  companies: GatewayCompany[]
}

const GatewayCompanySchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  keySecret: String,
  keyPublic: String
}, {
  _id: false
});

const GatewaySchema = new mongoose.Schema<Gateway>({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    enum: Object.values(Code),
    unique : true,
    index: true
  },
  status: {
    type: String,
    enum: Object.values(Status)
  },
  companies: [GatewayCompanySchema]
});

export const GatewayModel = mongoose.model<Gateway>('Gateway', GatewaySchema);