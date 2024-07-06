import { TestBed } from '@angular/core/testing';

import { FilterHousesService } from './filter-houses.service';

describe('FilterHousesService', () => {
  let service: FilterHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
