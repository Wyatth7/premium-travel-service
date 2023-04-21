import { CardModel } from '../payment/card-model';
import { CashModel } from '../payment/cash-model';
import { CheckModel } from '../payment/check-model';
import { TripPaymentType } from '../trip-payment-type';

export interface TransactionModel {
  paidByName: string;
  amount: number;
  paymentType: TripPaymentType;
  card: CardModel;
  check: CheckModel;
  cash: CashModel;
}
