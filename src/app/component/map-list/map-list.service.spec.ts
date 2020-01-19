import { TestBed } from '@angular/core/testing';

import { MapListService } from './map-list.service';

describe('MapListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapListService = TestBed.get(MapListService);
    expect(service).toBeTruthy();
  });
});
