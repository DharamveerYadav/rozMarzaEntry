import { TestBed } from '@angular/core/testing';

import { SharedUtilService } from './shared-util.service';

describe('SharedUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedUtilService = TestBed.get(SharedUtilService);
    expect(service).toBeTruthy();
  });
});
