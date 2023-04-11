import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditApplyLeaveComponent } from './emp-edit-apply-leave.component';

describe('EmpEditApplyLeaveComponent', () => {
  let component: EmpEditApplyLeaveComponent;
  let fixture: ComponentFixture<EmpEditApplyLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpEditApplyLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpEditApplyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
