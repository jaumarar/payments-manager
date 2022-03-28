import mongoose from 'mongoose';

export interface CustomerGateway {
  company: mongoose.Schema.Types.ObjectId,
  gateway: mongoose.Schema.Types.ObjectId,
  externalId: string;
}

export interface Customer {
  _id: mongoose.Schema.Types.ObjectId,
  name: string;
  email: string;
  gateways: CustomerGateway[];
}

const CustomerPaymentGateway = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  gateway: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gateway',
    required: true
  },
  externalId: String
}, {
  _id: false
});

const CustomerSchema = new mongoose.Schema<Customer>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  gateways: [CustomerPaymentGateway]
});

export const CustomerModel = mongoose.model<Customer>('Customer', CustomerSchema);