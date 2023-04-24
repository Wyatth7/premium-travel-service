import { Injectable } from '@angular/core';
import { TripStateType } from '../models/trip/trip-state-type';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  private _agentId = '';
  private _currentTripState = TripStateType.Create;
  private _currentTripId = '';

  set currentTripId(id: string) {
    this._currentTripId = id;
  }

  get currentTripId() {
    return this._currentTripId;
  }

  set currentTripState(state: TripStateType) {
    this._currentTripState = state;
  }

  get currentTripState() {
    return this._currentTripState;
  }

  set agentId(id: string) {
    this._agentId = id;
    console.log(id);
  }

  get agentId() {
    if (!this._agentId) return '';
    return this._agentId;
  }

  constructor() {}
}
