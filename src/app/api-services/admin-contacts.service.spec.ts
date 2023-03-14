import { TestBed } from '@angular/core/testing';

import { AdminContactsService } from './admin-contacts.service';

describe('AdminContactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminContactsService = TestBed.get(AdminContactsService);
    expect(service).toBeTruthy();
  });
});
