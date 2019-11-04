import { TestBed } from '@angular/core/testing';

import { MilkEntryDetailService } from './milk-entry-detail.service';

describe('MilkEntryDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MilkEntryDetailService = TestBed.get(MilkEntryDetailService);
    expect(service).toBeTruthy();
  });
});
