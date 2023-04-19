import { TripPaymentType } from '../trip-payment-type';
import { CardModel } from './card-model';
import { CashModel } from './cash-model';
import { CheckModel } from './check-model';

export interface AddTransactionModel {
  personId: string;
  tripId: string;
  amount: number;
  paymentType: TripPaymentType;
  card: CardModel;
  check: CheckModel;
  cash: CashModel;
}
