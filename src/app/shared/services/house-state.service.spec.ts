import { TestBed } from '@angular/core/testing';

import { HouseStateService } from './house-state.service';

describe('HouseStateService', () => {
  let service: HouseStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
