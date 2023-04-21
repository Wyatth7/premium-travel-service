import { Component, OnInit } from '@angular/core';
import { AddTravellersModel } from 'src/app/models/add-travellers-model';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { TripStateModel } from 'src/app/models/trip-state';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { SingletonClientService } from 'src/app/services/clients/person-client.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SelectService } from 'src/app/services/select.service';
import { TripCreationService } from 'src/app/services/trip-creation.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
  packages: GridItemModel[] = [];

  constructor(
    private mainPageService: MainPageService,
    private applicationStateService: ApplicationStateService,
    private tripClientService: TripClientService,
    private navigationService: NavigationService,
    private tripCreationService: TripCreationService,
    private singletonClientService: SingletonClientService,
    private selectService: SelectService
  ) {}

  async ngOnInit() {
    this.tripCreationService.clearIdList();

    setTimeout(() => {
      this.mainPageService.setMainPageData({
        title: 'Packages',
        helperText: 'Select packages to add to the trip',
        showFooterButtons: true,
        errorText: 'There was an issue adding packages',
        buttons: {
          buttonLeft: {
            showButton: true,
            buttonText: 'Later',
            action: async () => this.laterAction(),
          },
          buttonRight: {
            showButton: true,
            buttonText: 'Done',
            action: async () => this.doneAction(),
          },
        },
      });
    }, 0);

    this.selectService.setSelectAction(async () =>
      this.addPackagesAction(this.selectService.lastSelectedId)
    );

    this.packages = [];

    const packageResponse = await this.singletonClientService.getPackages();

    packageResponse.forEach((packageItem) =>
      this.packages.push({
        id: packageItem.tripDetailId,
        title: packageItem.shortDescription,
        extraText: packageItem.total.toString(),
      })
    );
  }

  async laterAction() {
    console.log('runngin');

    // call resume
    const payload: AddTravellersModel = {
      tripId: this.applicationStateService.currentTripId,
      assignedByPersonId: this.applicationStateService.agentId,
      payload: this.tripCreationService.idList,
    };

    try {
      await this.tripClientService.resumeTrip('packages', payload);
    } catch (e) {
      console.log(e);
    }

    // redirect to trips page
    this.navigationService.navigate(['trips']);
  }

  async doneAction() {
    console.log('running');

    // call resume
    const payload: AddTravellersModel = {
      tripId: this.applicationStateService.currentTripId,
      assignedByPersonId: this.applicationStateService.agentId,
      payload: this.tripCreationService.idList,
    };

    try {
      await this.tripClientService.resumeTrip('packages', payload);

      // move next
      const nextState = await this.tripClientService.nextState<TripStateModel>(
        this.applicationStateService.currentTripId
      );

      this.applicationStateService.currentTripState = nextState.currentState;

      // navigate to next page.
      this.navigationService.navigateToTripState(nextState.currentState);
    } catch (e) {
      console.log(e);
      this.mainPageService.shouldDisplayError(true);
    }
  }

  async addPackagesAction(id: string) {
    this.tripCreationService.addToIdList(id);
  }
}
