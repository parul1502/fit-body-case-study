import { TestBed } from '@angular/core/testing';

import { LoginguardService } from './loginguard.service';

describe('LoginguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginguardService = TestBed.get(LoginguardService);
    expect(service).toBeTruthy();
  });
});
