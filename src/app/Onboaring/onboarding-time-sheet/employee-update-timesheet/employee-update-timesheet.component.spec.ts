import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdateTimesheetComponent } from './employee-update-timesheet.component';

describe('EmployeeUpdateTimesheetComponent', () => {
  let component: EmployeeUpdateTimesheetComponent;
  let fixture: ComponentFixture<EmployeeUpdateTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUpdateTimesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeUpdateTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
