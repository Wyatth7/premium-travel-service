import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageDataModel } from '../models/page-data-model';

@Injectable({
  providedIn: 'root',
})
export class PageDataService {
  pageData = new BehaviorSubject<PageDataModel>({
    title: '',
    helperText: '',
    gridData: [],
  });

  constructor() {}
}
