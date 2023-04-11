import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetApprovalRequestsComponent } from './timesheet-approval-requests.component';

describe('TimesheetApprovalRequestsComponent', () => {
  let component: TimesheetApprovalRequestsComponent;
  let fixture: ComponentFixture<TimesheetApprovalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetApprovalRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetApprovalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
