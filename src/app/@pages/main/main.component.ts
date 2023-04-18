import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageDataModel } from 'src/app/models/page-data-model';
import { MainPageService } from 'src/app/services/main-page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  pageData!: PageDataModel;
  showModal = false;

  pageDataSubscription!: Subscription;

  constructor(private mainPageService: MainPageService) {}

  ngOnInit(): void {
    this.pageDataSubscription = this.mainPageService.mainPageData.subscribe(
      (pageData) => (this.pageData = pageData)
    );

    console.log('render');
  }

  ngOnDestroy(): void {
    this.pageDataSubscription.unsubscribe();
  }

  async executeAction(isDone: boolean) {
    setTimeout(async () => {
      if (isDone) {
        await this.pageData.buttons?.buttonRight.action();
      } else {
        await this.pageData.buttons?.buttonLeft.action();
      }
    }, 0);
  }
}
