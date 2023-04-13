import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  async get$<TResponse>(route: string) {
    return await lastValueFrom(
      this.httpClient.get<TResponse>(environment.baseApiPath + route)
    );
  }
}
