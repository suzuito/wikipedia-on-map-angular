import { TestBed } from '@angular/core/testing';

import { ApiRestfullService } from './api-restfull.service';

describe('ApiRestfullService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRestfullService = TestBed.get(ApiRestfullService);
    expect(service).toBeTruthy();
  });
});
