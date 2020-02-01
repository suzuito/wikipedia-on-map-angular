import { TestBed } from '@angular/core/testing';

import { MapD3Service } from './map-d3.service';

describe('MapD3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapD3Service = TestBed.get(MapD3Service);
    expect(service).toBeTruthy();
  });
});
