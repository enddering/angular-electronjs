import { TestBed, inject } from '@angular/core/testing';

import { OkexwsService } from './okexws.service';

describe('OkexwsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OkexwsService]
    });
  });

  it('should be created', inject([OkexwsService], (service: OkexwsService) => {
    expect(service).toBeTruthy();
  }));
});
