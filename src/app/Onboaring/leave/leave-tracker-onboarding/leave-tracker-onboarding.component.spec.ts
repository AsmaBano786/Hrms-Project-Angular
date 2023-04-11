import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTrackerOnboardingComponent } from './leave-tracker-onboarding.component';

describe('LeaveTrackerOnboardingComponent', () => {
  let component: LeaveTrackerOnboardingComponent;
  let fixture: ComponentFixture<LeaveTrackerOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveTrackerOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTrackerOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
