import { TestBed } from '@angular/core/testing';

import { HouseService } from './crudHouse.service';

describe('HouseService', () => {
  let service: HouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
