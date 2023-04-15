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
      });
    }, 0);

    const agentTripResponse = await this.tripClientService.getAgentTripData(
      this.applicationStateService.agentId
    );

    agentTripResponse.forEach((agentTrip: AgentTripModel, index: number) =>
      this.agentTripData.push({
        id: agentTrip.tripId,
        title: 'Trip' + (index + 1),
      })
    );
  }
}
