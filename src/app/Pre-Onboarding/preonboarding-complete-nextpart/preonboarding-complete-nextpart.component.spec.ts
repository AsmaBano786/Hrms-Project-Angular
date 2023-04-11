import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreonboardingCompleteNextpartComponent } from './preonboarding-complete-nextpart.component';

describe('PreonboardingCompleteNextpartComponent', () => {
  let component: PreonboardingCompleteNextpartComponent;
  let fixture: ComponentFixture<PreonboardingCompleteNextpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreonboardingCompleteNextpartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreonboardingCompleteNextpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
