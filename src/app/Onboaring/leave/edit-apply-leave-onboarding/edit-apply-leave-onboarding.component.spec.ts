import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplyLeaveOnboardingComponent } from './edit-apply-leave-onboarding.component';

describe('EditApplyLeaveOnboardingComponent', () => {
  let component: EditApplyLeaveOnboardingComponent;
  let fixture: ComponentFixture<EditApplyLeaveOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApplyLeaveOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApplyLeaveOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
