import {PaymentAbstract} from './payment.abstract';
import {Customer} from '../../../models/customer.model';

export class StripePayments extends PaymentAbstract {

  async pay(customer: Customer, amount: number): Promise<any> {
    /**
     * Create a charge
     *
     * const paymentIntent = await stripe.paymentIntents.create({
     *   amount: 2000,
     *   currency: 'eur',
     *   payment_method_types: ['card'],
     * });
     *
     * and execute it
     * const paymentIntent = await stripe.paymentIntents.confirm(
     *   'pi_1EUp2l2tXu0CfXKw4irXWU2u',
     *   {payment_method: 'pm_card_visa'}
     * );
     */

    return Promise.resolve('');
  }

  async capture(customer: Customer, amount: number): Promise<any> {
    /**
     * Create a charge
     *
     * const paymentIntent = await stripe.paymentIntents.create({
     *   amount: 2000,
     *   currency: 'eur',
     *   payment_method_types: ['card'],
     * });
     *
     * then capture
     * const paymentIntent = await stripe.paymentIntents.capture(
     *   'pi_1EUp2l2tXu0CfXKw8EflAjgm'
     * );
     */

    return Promise.resolve('');
  }

}