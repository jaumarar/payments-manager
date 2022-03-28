import { Transaction, TransactionModel } from '../models/transaction.model';
import mongoose from 'mongoose';

export async function findByExternalId(id: string): Promise<Transaction | undefined> {
  return TransactionModel
    .findOne({ id })
    .lean();
}

export async function create(id: string, gateway: mongoose.Schema.Types.ObjectId, customer: mongoose.Schema.Types.ObjectId, amount: number): Promise<Transaction> {
  return TransactionModel.create({
    id,
    gateway,
    customer,
    amount
  });
}
