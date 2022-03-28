import { Transaction } from '../../../models/transaction.model';

export abstract class ReimburseAbstract {
  constructor(
    protected readonly transaction: Transaction
  ) {}

  abstract reimburse(reason: string): Promise<any>;

  abstract partialReimburse(reason: string, amount: number): Promise<any>;
}