import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeaveOnboardingComponent } from './apply-leave-onboarding.component';

describe('ApplyLeaveOnboardingComponent', () => {
  let component: ApplyLeaveOnboardingComponent;
  let fixture: ComponentFixture<ApplyLeaveOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLeaveOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyLeaveOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
