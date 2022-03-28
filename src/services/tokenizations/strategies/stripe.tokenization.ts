import { TokenizationAbstract } from './tokenization.abstract';
import {Customer} from '../../../models/customer.model';
import {CreditCard} from '../../../types/controllers.type';

export class StripeTokenization extends TokenizationAbstract {
  async tokenize(customer: Customer, card: CreditCard): Promise<any> {
    /**
     * This code should run something in the lines of,
     * where a token is created to later be charged
     *
     * const token = await stripe.tokens.create({
     *   card: {
     *     number: '4242424242424242',
     *     exp_month: 3,
     *     exp_year: 2023,
     *     cvc: '314',
     *   },
     * });
     */

    return Promise.resolve('');
  }

}