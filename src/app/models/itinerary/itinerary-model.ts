import { PersonModel } from '../person-model';
import { BillingModel } from './billing-model';

export interface ItineraryModel {
  startDate: Date;
  endDate: Date;
  thankYouNote: string;
  travellers: string[];
  billing: BillingModel;
}
