import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateDetailsComponent } from './edit-candidate-details.component';

describe('EditCandidateDetailsComponent', () => {
  let component: EditCandidateDetailsComponent;
  let fixture: ComponentFixture<EditCandidateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCandidateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCandidateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
