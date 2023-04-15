import { Injectable } from '@angular/core';
import { AgentTripModel } from 'src/app/models/agent-trip-model';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class TripClientService {
  constructor(private httpClientService: HttpClientService) {}

  async getAgentTripData(agentId: string) {
    return await this.httpClientService.get$<AgentTripModel[]>(
      'trip/agent/' + agentId
    );
  }
}
