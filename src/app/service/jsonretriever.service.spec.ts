import { TestBed, inject } from '@angular/core/testing';

import { JsonretrieverService } from './jsonretriever.service';

describe('JsonretrieverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonretrieverService]
    });
  });

  it('should be created', inject([JsonretrieverService], (service: JsonretrieverService) => {
    expect(service).toBeTruthy();
  }));
});
