import { Component, OnInit } from '@angular/core';
import { ItineraryModel } from 'src/app/models/itinerary/itinerary-model';
import { PersonModel } from 'src/app/models/person-model';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { SingletonClientService } from 'src/app/services/clients/person-client.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss'],
})
export class ItineraryComponent implements OnInit {
  itinerary: ItineraryModel = {} as ItineraryModel;
  agent!: PersonModel;

  constructor(
    private tripClientService: TripClientService,
    private applicationStateService: ApplicationStateService,
    private mainPageService: MainPageService,
    private navigationService: NavigationService,
    private personClientService: SingletonClientService
  ) {}

  async ngOnInit() {
    setTimeout(() => {
      this.mainPageService.setMainPageData({
        title: 'Itinerary',
        helperText: 'View the completed trip itinerary',
        showFooterButtons: true,
        errorText: 'A thank you note must be at least 5 characters',
        buttons: {
          buttonLeft: {
            showButton: false,
            buttonText: '',
            action: async () => {},
          },
          buttonRight: {
            showButton: true,
            buttonText: 'Trips',
            action: () => this.doneAction(),
          },
        },
      });
    }, 0);

    this.itinerary = {} as ItineraryModel;

    const itinerary = await this.tripClientService.resumeTrip(
      'itinerary/' + this.applicationStateService.currentTripId
    );

    this.agent = await this.personClientService.getAgent(
      this.applicationStateService.agentId
    );

    this.itinerary = itinerary as ItineraryModel;
    console.log(this.itinerary);
  }

  async doneAction() {
    this.navigationService.navigate(['trips']);
  }
}
