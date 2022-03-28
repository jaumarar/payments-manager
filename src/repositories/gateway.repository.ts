import { UpdateWriteOpResult, Schema } from 'mongoose';
import { Gateway, GatewayModel } from '../models/gateway.model';
import { Code, Status } from '../types/gateway';

export async function findByCode(code: Code): Promise<Gateway | undefined> {
  return GatewayModel
    .findOne({ code })
    .lean();
}

export async function findById(id: Schema.Types.ObjectId): Promise<Gateway | undefined> {
  return GatewayModel
    .findOne({
      _id: id
    })
    .lean();
}

export async function create(name: string, code: Code, status: Status): Promise<Gateway> {
  return GatewayModel.create({
    name,
    code,
    status,
    companies: []
  });
}

export async function update(gateway: Gateway): Promise<UpdateWriteOpResult> {
  return GatewayModel.updateOne({
    _id: gateway._id
  }, gateway);
}