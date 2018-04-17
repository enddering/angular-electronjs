import { TestBed, inject } from '@angular/core/testing';

import { HuobiwsService } from './huobiws.service';

describe('HuobiwsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuobiwsService]
    });
  });

  it('should be created', inject([HuobiwsService], (service: HuobiwsService) => {
    expect(service).toBeTruthy();
  }));
});
