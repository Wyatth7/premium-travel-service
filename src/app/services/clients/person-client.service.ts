import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { PersonModel } from 'src/app/models/person-model';

@Injectable({
  providedIn: 'root',
})
export class PersonClientService {
  constructor(private httpClientService: HttpClientService) {}

  async getAgents() {
    return await this.httpClientService.get$<PersonModel[]>('person/agents');
  }

  async getTravellers() {
    return await this.httpClientService.get$<PersonModel[]>(
      'person/travellers'
    );
  }
}
