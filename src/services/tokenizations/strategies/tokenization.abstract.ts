import { Customer } from '../../../models/customer.model';
import { Gateway } from '../../../models/gateway.model';
import { Company } from '../../../models/company.model';
import {CreditCard} from '../../../types/controllers.type';

export abstract class TokenizationAbstract {
  constructor(
    protected readonly gateway: Gateway,
    protected readonly company: Company
  ) {}

  abstract tokenize(customer: Customer, card: CreditCard): Promise<any>;
}