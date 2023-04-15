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
        showButton: true,
        async action() {
          return;
        },
      },
      buttonRight: {
        buttonText: '',
        showButton: true,
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
