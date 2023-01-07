import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminProfileComponent } from './manage-admin-profile.component';

describe('ManageAdminProfileComponent', () => {
  let component: ManageAdminProfileComponent;
  let fixture: ComponentFixture<ManageAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
