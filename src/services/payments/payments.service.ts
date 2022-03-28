import { findById as findCustomerById } from '../../repositories/customer.repository';
import { Code } from '../../types/gateway';
import { PaymentAbstract } from './strategies/payment.abstract';
import { findById as findCompanyById } from '../../repositories/company.repository';
import { StripePayments } from './strategies/stripe.payments';
import {findByCode} from '../../repositories/gateway.repository';

export class PaymentsService {
  private async instantiate(customerId: string, companyId: string, gatewayCode: Code): Promise<StripePayments | never> {
    const customer = await findCustomerById(customerId);

    if (!customer) {
      throw new Error(`Customer ${customerId} not found`);
    }

    const company = await findCompanyById(companyId);

    if (!company) {
      throw new Error(`Company ${company} not found`);
    }

    const gateway = await findByCode(gatewayCode);

    if (!gateway) {
      throw new Error(`Cannot instantiate, unexpected gateway ${gateway}`);
    }

    switch (gatewayCode) {
      case Code.STRIPE: {
        return new StripePayments(gateway, company);
      }
      default: {
        throw new Error(`Gateway ${gatewayCode} has not yet been implemented`);
      }
    }
  }

  public async pay(customerId: string, companyId: string, gatewayCode: Code, amount: number): Promise<any | never> {
    const customer = await findCustomerById(customerId);

    if (!customer) {
      throw new Error(`Customer ${customerId} not found`);
    }

    const paymentsStrategy = await this.instantiate(customerId, companyId, gatewayCode);

    const result = await paymentsStrategy.pay(customer, amount);

    return result;
  }

  public async capture(customerId: string, companyId: string, gatewayCode: Code, amount: number): Promise<any | never> {
    const customer = await findCustomerById(customerId);

    if (!customer) {
      throw new Error(`Customer ${customerId} not found`);
    }

    const paymentsStrategy = await this.instantiate(customerId, companyId, gatewayCode);

    const result = await paymentsStrategy.capture(customer, amount);

    return result;
  }
}