import { TestBed } from '@angular/core/testing';

import { ProfileguardService } from './profileguard.service';

describe('ProfileguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileguardService = TestBed.get(ProfileguardService);
    expect(service).toBeTruthy();
  });
});
