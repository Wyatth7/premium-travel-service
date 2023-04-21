import { PackageModel } from '../package-model';
import { TransactionModel } from './transaction-model';
import { BillingDetailModel } from './billing-detail-model';

export interface BillingModel {
  total: number;
  billingDetails: BillingDetailModel[];
  transactions: TransactionModel[];
}
