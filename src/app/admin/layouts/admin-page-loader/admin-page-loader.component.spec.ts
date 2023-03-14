import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageLoaderComponent } from './admin-page-loader.component';

describe('AdminPageLoaderComponent', () => {
  let component: AdminPageLoaderComponent;
  let fixture: ComponentFixture<AdminPageLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
