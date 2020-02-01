import { TestBed } from '@angular/core/testing';

import { GeoStoreService } from './geo-store.service';

describe('GeoStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoStoreService = TestBed.get(GeoStoreService);
    expect(service).toBeTruthy();
  });
});
