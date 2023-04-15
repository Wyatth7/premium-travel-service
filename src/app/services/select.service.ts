import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private selectAciton!: (id: string) => Promise<void>;
  private _lastSelectedId = '';

  get lastSelectedId() {
    return this._lastSelectedId;
  }

  set lastSelectedId(id: string) {
    this._lastSelectedId = id;
  }

  constructor() {}

  setSelectAction(actionMethod: () => Promise<void>) {
    this.selectAciton = actionMethod;
  }

  async executeAction(id: string) {
    await this.selectAciton(id);
  }
}
