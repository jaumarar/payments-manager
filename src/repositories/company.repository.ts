import { Company, CompanyModel } from '../models/company.model';

export async function findById(id: string): Promise<Company | undefined> {
  return CompanyModel
    .findOne({ _id: id })
    .lean();
}

export async function create(name: string): Promise<Company> {
  return CompanyModel.create({
    name
  });
}