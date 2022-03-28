import { Code } from '../../types/gateway';
import { findById as findCustomerById } from '../../repositories/customer.repository';
import { findById as findCompanyById } from '../../repositories/company.repository';
import { CreditCard } from '../../types/controllers.type';
import { findByCode } from '../../repositories/gateway.repository';
import { StripeTokenization } from './strategies/stripe.tokenization';
import { Company } from '../../models/company.model';

export class TokenizationsService {
  private async instantiate(gatewayCode: Code, company: Company): Promise<StripeTokenization | never> {
    const gateway = await findByCode(gatewayCode);

    if (!gateway) {
      throw new Error(`Cannot instantiate, unexpected gateway ${gateway}`);
    }

    switch (gatewayCode) {
      case Code.STRIPE: {
        return new StripeTokenization(gateway, company);
      }
      default: {
        throw new Error(`Gateway ${gatewayCode} has not yet been implemented`);
      }
    }
  }

  public async tokenize(customerId: string, companyId: string, gatewayCode: Code, card: CreditCard): Promise<any | never> {
    const customer = await findCustomerById(customerId);

    if (!customer) {
      throw new Error(`Customer ${customerId} not found`);
    }

    const company = await findCompanyById(companyId);

    if (!company) {
      throw new Error(`Company ${company} not found`);
    }

    const tokenizationStrategy = await this.instantiate(gatewayCode, company);

    const result = await tokenizationStrategy.tokenize(customer, card);

    return result;
  }
}