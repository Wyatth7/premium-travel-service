import { TestBed } from '@angular/core/testing';

import { TripClientService } from './trip-client.service';

describe('TripClientService', () => {
  let service: TripClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
