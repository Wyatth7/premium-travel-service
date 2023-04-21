import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TripCreationService {
  idList: string[] = [];

  constructor() {}

  addToIdList(id: string) {
    if (this.idList.includes(id)) {
      this.removeIdFromList(id);
      return;
    }

    this.idList.push(id);
  }

  removeIdFromList(id: string) {
    if (!this.idList.includes(id)) return;

    this.idList = this.idList.filter((listId) => listId !== id);
  }

  clearIdList() {
    this.idList = [];
  }
}
