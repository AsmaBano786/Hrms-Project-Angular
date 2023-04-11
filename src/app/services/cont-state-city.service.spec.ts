import { TestBed } from '@angular/core/testing';

import { ContStateCityService } from './cont-state-city.service';

describe('ContStateCityService', () => {
  let service: ContStateCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContStateCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
