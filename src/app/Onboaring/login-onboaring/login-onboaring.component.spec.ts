import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOnboaringComponent } from './login-onboaring.component';

describe('LoginOnboaringComponent', () => {
  let component: LoginOnboaringComponent;
  let fixture: ComponentFixture<LoginOnboaringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginOnboaringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOnboaringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
