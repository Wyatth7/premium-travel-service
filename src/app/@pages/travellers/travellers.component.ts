import { Component, OnInit } from '@angular/core';
import { AddTravellersModel } from 'src/app/models/add-travellers-model';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { PersonModel } from 'src/app/models/person-model';
import { TripStateModel } from 'src/app/models/trip-state';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { PersonClientService } from 'src/app/services/clients/person-client.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SelectService } from 'src/app/services/select.service';
import { TripCreationService } from 'src/app/services/trip-creation.service';

@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.scss'],
})
export class TravellersComponent implements OnInit {
  travellers!: GridItemModel[];

  constructor(
    private personClientService: PersonClientService,
    private mainPageService: MainPageService,
    private navigationService: NavigationService,
    private tripClientService: TripClientService,
    private tripCreationService: TripCreationService,
    private applicationStateService: ApplicationStateService,
    private selectService: SelectService
  ) {}

  async ngOnInit() {
    this.tripCreationService.clearIdList();

    setTimeout(() => {
      this.mainPageService.setMainPageData({
        title: 'Travellers',
        helperText: 'Select travellers to add to trip',
        showFooterButtons: true,
        buttons: {
          buttonLeft: {
            showButton: true,
            buttonText: 'Later',
            action: async () => this.laterAction(),
          },
          buttonRight: {
            showButton: true,
            buttonText: 'Done',
            action: () => this.doneAction(),
          },
        },
      });
    }, 0);

    const travellers = await this.personClientService.getTravellers();

    this.travellers = [];

    travellers.forEach((t) =>
      this.travellers.push({ id: t.personId, title: t.nameFull })
    );

    this.selectService.setSelectAction(
      async () =>
        await this.addTravellerAction(this.selectService.lastSelectedId)
    );
  }

  async addTravellerAction(id: string) {
    this.tripCreationService.addToIdList(id);
  }

  async laterAction() {
    // call resume
    const payload: AddTravellersModel = {
      tripId: this.applicationStateService.currentTripId,
      assignedByPersonId: this.applicationStateService.agentId,
      payload: this.tripCreationService.idList,
    };

    this.tripClientService.resumeTrip('travellers', payload);

    // redirect to trips page
    this.navigationService.navigate(['trips']);
  }

  async doneAction() {
    // call resume
    const payload: AddTravellersModel = {
      tripId: this.applicationStateService.currentTripId,
      assignedByPersonId: this.applicationStateService.agentId,
      payload: this.tripCreationService.idList,
    };

    this.tripClientService.resumeTrip('travellers', payload);

    // move next
    const nextState = await this.tripClientService.nextState<TripStateModel>(
      this.applicationStateService.currentTripId
    );

    this.applicationStateService.currentTripState = nextState.currentState;
  }
}
