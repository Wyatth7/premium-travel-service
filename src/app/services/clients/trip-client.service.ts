import { Injectable } from '@angular/core';
import { AgentTripModel } from 'src/app/models/agent-trip-model';
import { PersonModel } from 'src/app/models/person-model';
import { TripStateModel } from 'src/app/models/trip-state';
import { TripStateType } from 'src/app/models/trip-state-type';
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

  async createTrip(agentId: string) {
    return await this.httpClientService.post<TripStateModel>(
      'trip/create/' + agentId
    );
  }

  async resumeTrip(resumePath: string, payload?: any) {
    return await this.httpClientService.post(
      'trip/resume/' + resumePath,
      payload
    );
  }

  async nextState<TType>(tripId: string) {
    return await this.httpClientService.post<TType>('trip/next/' + tripId);
  }

  async getTripState(tripId: string) {
    return await this.httpClientService.get$<TripStateModel>(
      'trip/currentstate/' + tripId
    );
  }

  async getRemainingTripBalance(tripId: string) {
    return await this.httpClientService.get$<number>('trip/payment/' + tripId);
  }
}
