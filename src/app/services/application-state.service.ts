import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  private _agentId?: string;

  set agentId(id: string) {
    this._agentId = id;
  }

  get agentId() {
    if (!this._agentId) return '';
    return this._agentId;
  }

  constructor() {}
}
