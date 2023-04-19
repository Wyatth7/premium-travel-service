import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
  thankYouNote = '';

  constructor(
    private mainPageService: MainPageService,
    private tripClientService: TripClientService,
    private applicationStateService: ApplicationStateService,
    private navigationService: NavigationService
  ) {}

  async ngOnInit() {
    setTimeout(() => {
      this.mainPageService.setMainPageData({
        title: 'Thank You Note',
        helperText: 'Enter a thank you note to complete this trip',
        showFooterButtons: true,
        errorText: 'A thank you note must be at least 5 characters',
        buttons: {
          buttonLeft: {
            showButton: true,
            buttonText: 'Later',
            action: async () => this.laterAction(),
          },
          buttonRight: {
            showButton: true,
            buttonText: 'Finish',
            action: () => this.doneAction(),
          },
        },
      });
    }, 0);
  }

  async laterAction() {
    this.navigationService.navigate(['trips']);
  }

  async doneAction() {
    if (this.thankYouNote.length < 5) {
      this.mainPageService.shouldDisplayError(true);
      return;
    }

    await this.tripClientService.resumeTrip('thankYouNote', {
      tripId: this.applicationStateService.currentTripId,
      thankYouNote: this.thankYouNote,
    });

    this.navigationService.navigate(['trip', 'view']);
  }
}
