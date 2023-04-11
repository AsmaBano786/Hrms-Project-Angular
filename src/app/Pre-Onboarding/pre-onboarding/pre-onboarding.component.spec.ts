import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOnboardingComponent } from './pre-onboarding.component';

describe('PreOnboardingComponent', () => {
  let component: PreOnboardingComponent;
  let fixture: ComponentFixture<PreOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
