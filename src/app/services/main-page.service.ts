import { Injectable } from '@angular/core';
import { PageDataModel } from '../models/page-data-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  mainPageData = new BehaviorSubject<PageDataModel>({
    title: '',
    helperText: '',
    showFooterButtons: true,
    buttons: {
      buttonLeft: {
        buttonText: '',
        async action() {
          return;
        },
      },
      buttonRight: {
        buttonText: '',
        async action() {
          return;
        },
      },
    },
  });

  constructor() {}

  setMainPageData(newPageData: PageDataModel) {
    this.mainPageData.next(newPageData);
  }
}