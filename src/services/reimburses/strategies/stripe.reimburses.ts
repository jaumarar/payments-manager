import {ReimburseAbstract} from './reimburse.abstract';
import {Customer} from '../../../models/customer.model';

export class StripeReimburses extends ReimburseAbstract {
  async reimburse(reason: string): Promise<any> {
    /**
     * A complete refund will be something like
     *
     * const refund = await stripe.refunds.create({
     *   payment_intent: 'pi_Aabcxyz01aDfoo',
     * });
     */
    return Promise.resolve('');
  }

  async partialReimburse(reason: string, amount: number): Promise<any> {
    /**
     * const refund = await stripe.refunds.create({
     *   payment_intent: 'pi_Aabcxyz01aDfoo',
     *   amount: 1000,
     * });
     */
    return Promise.resolve('');
  }

}