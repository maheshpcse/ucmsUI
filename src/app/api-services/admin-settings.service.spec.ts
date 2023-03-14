import { TestBed } from '@angular/core/testing';

import { AdminSettingsService } from './admin-settings.service';

describe('AdminSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminSettingsService = TestBed.get(AdminSettingsService);
    expect(service).toBeTruthy();
  });
});
