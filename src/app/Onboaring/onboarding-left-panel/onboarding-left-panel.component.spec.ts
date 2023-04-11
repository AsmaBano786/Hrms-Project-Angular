import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingLeftPanelComponent } from './onboarding-left-panel.component';

describe('OnboardingLeftPanelComponent', () => {
  let component: OnboardingLeftPanelComponent;
  let fixture: ComponentFixture<OnboardingLeftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingLeftPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
