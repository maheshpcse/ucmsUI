import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettingsHistoryComponent } from './admin-settings-history.component';

describe('AdminSettingsHistoryComponent', () => {
  let component: AdminSettingsHistoryComponent;
  let fixture: ComponentFixture<AdminSettingsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSettingsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettingsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
