import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileOnboardingComponent } from './user-profile-onboarding.component';

describe('UserProfileOnboardingComponent', () => {
  let component: UserProfileOnboardingComponent;
  let fixture: ComponentFixture<UserProfileOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
