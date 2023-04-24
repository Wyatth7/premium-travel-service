import { TripStateType } from './trip-state-type';

export interface TripStateModel {
  tripId: string;
  isComplete: boolean;
  currentState: TripStateType;
}
