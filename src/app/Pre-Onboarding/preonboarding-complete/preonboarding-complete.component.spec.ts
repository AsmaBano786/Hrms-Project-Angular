import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreonboardingCompleteComponent } from './preonboarding-complete.component';

describe('PreonboardingCompleteComponent', () => {
  let component: PreonboardingCompleteComponent;
  let fixture: ComponentFixture<PreonboardingCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreonboardingCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreonboardingCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
