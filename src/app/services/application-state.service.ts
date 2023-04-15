import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  private _lastSelectedId = '';

  set agentId(id: string) {
    this._lastSelectedId = id;
    console.log(id);
  }

  get agentId() {
    if (!this._lastSelectedId) return '';
    return this._lastSelectedId;
  }

  constructor() {}
}
