import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private selectAciton!: () => Promise<void>;

  constructor() {}

  setSelectAction(actionMethod: () => Promise<void>) {
    this.selectAciton = actionMethod;
  }

  async executeAction() {
    await this.selectAciton();
  }
}
