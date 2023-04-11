import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePendingReportComponent } from './employee-pending-report.component';

describe('EmployeePendingReportComponent', () => {
  let component: EmployeePendingReportComponent;
  let fixture: ComponentFixture<EmployeePendingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePendingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePendingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
