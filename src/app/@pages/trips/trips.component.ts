import { Component, OnInit } from '@angular/core';
import { AgentTripModel } from 'src/app/models/agent-trip-model';
import { GridItemModel } from 'src/app/models/grid-item-model';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { TripClientService } from 'src/app/services/clients/trip-client.service';
import { MainPageService } from 'src/app/services/main-page.service';

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
    private tripClientService: TripClientService
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
            showButton: false,
            buttonText: '',
            action: async () => {},
          },
          buttonRight: {
            showButton: true,
            buttonText: 'Create',
            action: () => this.createTripAction(),
          },
        },
      });
    }, 0);

    await this.getTrips();
  }

  async createTripAction() {
    try {
      await this.tripClientService.createTrip(
        this.applicationStateService.agentId
      );

      // refresh trips after trip created
      await this.getTrips();
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
}
