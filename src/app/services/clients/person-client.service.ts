import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { PersonModel } from 'src/app/models/person-model';
import { PackageModel } from 'src/app/models/package-model';

@Injectable({
  providedIn: 'root',
})
export class SingletonClientService {
  constructor(private httpClientService: HttpClientService) {}

  async getAgents() {
    return await this.httpClientService.get$<PersonModel[]>('singleton/agents');
  }

  async getTravellers() {
    return await this.httpClientService.get$<PersonModel[]>(
      'singleton/travellers'
    );
  }

  async getPackages() {
    return await this.httpClientService.get$<PackageModel[]>(
      'singleton/packages'
    );
  }
}
