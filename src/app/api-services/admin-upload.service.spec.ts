import { TestBed } from '@angular/core/testing';

import { AdminUploadService } from './admin-upload.service';

describe('AdminUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUploadService = TestBed.get(AdminUploadService);
    expect(service).toBeTruthy();
  });
});
