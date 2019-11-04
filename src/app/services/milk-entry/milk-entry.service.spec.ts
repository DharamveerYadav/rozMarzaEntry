import { TestBed } from '@angular/core/testing';

import { MilkEntryService } from './milk-entry.service';

describe('MilkEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MilkEntryService = TestBed.get(MilkEntryService);
    expect(service).toBeTruthy();
  });
});
