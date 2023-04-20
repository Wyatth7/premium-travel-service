import { PackageModel } from '../package-model';
import { TransactionModel } from './transaction-model';
import { TripDetailModel } from './trip-detail-model';

export interface BillingModel {
  total: number;
  billingDetails: TripDetailModel[];
  transactions: TransactionModel[];
}
