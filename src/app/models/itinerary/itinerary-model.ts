import { BillingModel } from './billing-model';
import { TripDetailModel } from './trip-detail-model';

export interface ItineraryModel {
  startDate: Date;
  endDate: Date;
  thankYouNote: string;
  travellers: string[];
  billing: BillingModel;
  tripDetails: TripDetailModel[];
}
