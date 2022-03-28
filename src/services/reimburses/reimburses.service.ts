import {findByExternalId} from '../../repositories/transaction.repository';
import { StripeReimburses } from './strategies/stripe.reimburses';
import {findById} from '../../repositories/gateway.repository';
import {Code} from '../../types/gateway';
import {MercadoPagoReimburses} from './strategies/mercado-pago.reimburses';

export class ReimbursesService {
  private async instantiate(transactionId: string): Promise<StripeReimburses | never> {
    const transaction = await findByExternalId(transactionId);

    if (!transaction) {
      throw new Error(`Transaction ${transactionId} not found`);
    }

    const gateway = await findById(transaction.gateway);

    if (!gateway) {
      throw new Error(`Cannot instantiate, unexpected gateway ${gateway}`);
    }

    switch (gateway.code) {
      case Code.STRIPE: {
        return new StripeReimburses(transaction);
      }
      case Code.MERCADO_PAGO: {
        return new MercadoPagoReimburses(transaction);
      }
      default: {
        throw new Error(`Gateway ${gateway.code} has not yet been implemented`);
      }
    }
  }

  public async reimburse(transactionId: string, reason: string): Promise<any | never> {
    const reimburseStrategy = await this.instantiate(transactionId);

    const result = await reimburseStrategy.reimburse(reason);

    return result;
  }

  public async partialReimburse(transactionId: string, reason: string, amount: number): Promise<any | never> {
    const reimburseStrategy = await this.instantiate(transactionId);

    const result = await reimburseStrategy.partialReimburse(reason, amount);

    return result;
  }
}