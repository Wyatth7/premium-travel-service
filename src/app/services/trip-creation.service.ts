import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TripCreationService {
  idList: string[] = [];

  constructor() {}

  addToIdList(id: string) {
    if (this.idList.includes(id)) return;

    this.idList.push(id);

    console.log(this.idList);
  }

  clearIdList() {
    this.idList = [];
  }
}
