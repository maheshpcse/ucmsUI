import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminPasswordComponent } from './manage-admin-password.component';

describe('ManageAdminPasswordComponent', () => {
  let component: ManageAdminPasswordComponent;
  let fixture: ComponentFixture<ManageAdminPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
