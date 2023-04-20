import { Component, OnInit } from '@angular/core';
import { AgentTripModel } from 'src/app/models/agent-trip-model';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  agentTripData: GridItemModel[] = [];

  constructor(
    private mainPageService: MainPageService,
    private applicationStateService: ApplicationStateService,
    private tripClientService: TripClientService,
    private navigationService: NavigationService,
    private selectService: SelectService
  ) {}

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.mainPageService.setMainPageData({
        title: 'Trips',
        helperText:
          'Select a trip to view an itinerary or resume trip creation',
        showFooterButtons: true,
        buttons: {
          buttonLeft: {
            showButton: true,
            buttonText: 'Back',
            action: async () => this.laterAction(),
          },
          buttonRight: {
            showButton: true,
            buttonText: 'Create',
            action: () => this.createTripAction(),
          },
        },
      });
    }, 0);

    this.selectService.setSelectAction(async () =>
      this.selectTripAction(this.selectService.lastSelectedId)
    );

    await this.getTrips();
  }

  async selectTripAction(id: string) {
    this.applicationStateService.currentTripId = id;

    const state = await this.tripClientService.getTripState(id);

    this.navigationService.navigateToTripState(state.currentState);
  }

  async createTripAction() {
    try {
      const tripState = await this.tripClientService.createTrip(
        this.applicationStateService.agentId
      );

      this.applicationStateService.currentTripState = tripState.currentState;
      this.applicationStateService.currentTripId = tripState.tripId;

      console.log(this.applicationStateService.currentTripState);

      // navigate to travellers
      this.navigationService.navigate(['trip', 'edit', 'travellers']);
    } catch (error) {
      console.log(error);
    }
  }

  private async getTrips() {
    this.agentTripData = [];

    const agentTripResponse = await this.tripClientService.getAgentTripData(
      this.applicationStateService.agentId
    );

    agentTripResponse.forEach((agentTrip: AgentTripModel, index: number) =>
      this.agentTripData.push({
        id: agentTrip.tripId,
        title: 'Trip ' + (index + 1),
        extraText: agentTrip.isComplete ? 'Complete' : 'Incomplete',
      })
    );
  }

  private async laterAction() {
    this.navigationService.navigate(['agents']);
  }
}
