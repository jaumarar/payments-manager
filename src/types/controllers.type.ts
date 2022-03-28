import { Code } from './gateway';

export type PayRequest = {
  customer: string;
  company: string;
  gateway: Code;
  amount: number;
};

export type CaptureRequest = {
  customer: string;
  company: string;
  gateway: Code;
  amount: number;
};

export type CreditCard = {
  number: string;
  holder: string;
  expiration: string;
  cvv: string;
};

export type TokenizeRequest = {
  customer: string;
  company: string;
  gateway: Code;
  card: CreditCard;
};

export type ReimburseRequest = {
  reason: string;
};

export type PartialReimburseRequest = {
  reason: string;
  amount: number;
};