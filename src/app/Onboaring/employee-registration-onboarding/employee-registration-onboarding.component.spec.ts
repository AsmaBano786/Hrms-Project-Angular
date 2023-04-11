import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegistrationOnboardingComponent } from './employee-registration-onboarding.component';

describe('EmployeeRegistrationOnboardingComponent', () => {
  let component: EmployeeRegistrationOnboardingComponent;
  let fixture: ComponentFixture<EmployeeRegistrationOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRegistrationOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRegistrationOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
