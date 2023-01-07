import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminNotificationsComponent } from './manage-admin-notifications.component';

describe('ManageAdminNotificationsComponent', () => {
  let component: ManageAdminNotificationsComponent;
  let fixture: ComponentFixture<ManageAdminNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
