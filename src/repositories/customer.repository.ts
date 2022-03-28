import { Customer, CustomerModel } from '../models/customer.model';
import { UpdateWriteOpResult } from 'mongoose';

export async function findById(id: string): Promise<Customer | undefined> {
  return CustomerModel
    .findOne({ _id: id })
    .lean();
}

export async function create(name: string, email: string): Promise<Customer> {
  return CustomerModel.create({
    name,
    email,
    gateways: []
  });
}

export async function update(customer: Customer): Promise<UpdateWriteOpResult> {
  return CustomerModel.updateOne({
    _id: customer._id
  }, customer);
}