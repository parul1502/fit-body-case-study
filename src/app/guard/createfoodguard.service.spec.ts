import { TestBed } from '@angular/core/testing';

import { CreatefoodguardService } from './createfoodguard.service';

describe('CreatefoodguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatefoodguardService = TestBed.get(CreatefoodguardService);
    expect(service).toBeTruthy();
  });
});
