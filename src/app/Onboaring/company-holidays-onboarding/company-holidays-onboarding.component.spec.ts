import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHolidaysOnboardingComponent } from './company-holidays-onboarding.component';

describe('CompanyHolidaysOnboardingComponent', () => {
  let component: CompanyHolidaysOnboardingComponent;
  let fixture: ComponentFixture<CompanyHolidaysOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyHolidaysOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyHolidaysOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
