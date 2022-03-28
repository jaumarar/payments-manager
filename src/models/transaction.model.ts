import mongoose from 'mongoose';
import {Gateway} from './gateway.model';

export interface Transaction {
  id: string;
  gateway: mongoose.Schema.Types.ObjectId;
  customer: mongoose.Schema.Types.ObjectId;
  amount: number;
}

const TransactionScheme = new mongoose.Schema<Transaction>({
  id: {
    type: String,
    required: true
  },
  gateway: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gateway',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

export const TransactionModel = mongoose.model<Transaction>('Transaction', TransactionScheme);