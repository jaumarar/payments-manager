import { Customer } from '../../../models/customer.model';
import { Gateway } from '../../../models/gateway.model';
import { Company } from '../../../models/company.model';

export abstract class PaymentAbstract {
  constructor(
    protected readonly gateway: Gateway,
    protected readonly company: Company
  ) {}

  abstract pay(customer: Customer, amount: number): Promise<any>;

  abstract capture(customer: Customer, amount: number): Promise<any>;
}