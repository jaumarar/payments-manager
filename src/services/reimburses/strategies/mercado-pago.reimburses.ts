import {ReimburseAbstract} from './reimburse.abstract';
import {Customer} from '../../../models/customer.model';

export class MercadoPagoReimburses extends ReimburseAbstract {
  async reimburse(reason: string): Promise<any> {
    /**
     * POST https://api.mercadopago.com/v1/payments/{id}/refunds
     */
    return Promise.resolve('');
  }

  async partialReimburse(reason: string, amount: number): Promise<any> {
    /**
     * Mercado pago allows partial refund, but for the sake of the task
     */
    throw new Error('Method not implemented');
  }

}