import { PaymentLinkData } from '../../data/paymentLinks/data';
import { IdempotencyParameter, PaginationParameters, ThrottlingParameter } from '../../types/parameters';

export type CreateParameters = Pick<PaymentLinkData, 'description' | 'amount' | 'redirectUrl' | 'webhookUrl' | 'expiresAt'> & {
  profileId?: string;
  testmode?: boolean;
} & IdempotencyParameter;

export interface GetParameters {
  testmode?: boolean;
}

export type ListParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};

export type IterateParameters = Omit<ListParameters, 'limit'> & ThrottlingParameter;
