import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TripStateType } from '../models/trip-state-type';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  navigateToTripState(stateType: TripStateType) {
    console.log('in navigation ' + stateType);

    switch (stateType) {
      case TripStateType.Travellers:
        this.navigate(['trip', 'edit', 'travellers']);
        break;
      case TripStateType.Packages:
        this.navigate(['trip', 'edit', 'packages']);
        break;
      case TripStateType.PaymentPerson:
        this.navigate(['trip', 'edit', 'paymentperson']);
        break;
      case TripStateType.Payment:
        this.navigate(['trip', 'edit', 'payment']);
        break;
      case TripStateType.Note:
        this.navigate(['trip', 'edit', 'note']);
        break;
      case TripStateType.Itinerary:
        this.navigate(['trip', 'view']);
        break;
      default:
        this.navigate(['trips']);
    }
  }
}
