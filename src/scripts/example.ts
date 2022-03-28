import 'source-map-support/register';
import 'dotenv/config';
import connect from '../inits/mongoose';
import { create as createCompany } from '../repositories/company.repository';
import { create as createCustomer, update as updateCustomer } from '../repositories/customer.repository';
import { create as createGateway, update as updateGateway } from '../repositories/gateway.repository';
import { Code, Status } from '../types/gateway';

async function example(): Promise<void> {
  await connect();

  const company = await createCompany('Company 1');
  console.log('A company has been created');

  const [stripe] = await Promise.all([
    createGateway('Stripe', Code.STRIPE, Status.ENABLED),
    createGateway('Mercado Pago', Code.MERCADO_PAGO, Status.ENABLED)
  ]);
  console.log('And multiple gateways');

  stripe.companies.push({
    company: company._id,
    status: Status.ENABLED,
    keySecret: 'key-secret-stripe',
    keyPublic: 'key-public-stripe'
  });

  await updateGateway(stripe);
  console.log('A gateway is configured with a company');

  const customer = await createCustomer('Customer', 'customer@company.com');
  console.log('The customer is created');

  customer.gateways.push({
    company: company._id,
    gateway: stripe._id,
    externalId: 'customer-id-stripe'
  });

  await updateCustomer(customer);
  console.log('And with the tokenization of a credit card the customer has a gateway enabled');

  console.log('Now this can be closed...');
}

void example();
