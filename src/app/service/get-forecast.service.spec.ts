import { TestBed, inject } from '@angular/core/testing';

import { GetForecastService } from './get-forecast.service';

describe('GetForecastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetForecastService]
    });
  });

  it('should be created', inject([GetForecastService], (service: GetForecastService) => {
    expect(service).toBeTruthy();
  }));
});
