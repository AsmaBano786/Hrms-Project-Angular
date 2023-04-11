import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExitDetailsComponent } from './edit-exit-details.component';

describe('EditExitDetailsComponent', () => {
  let component: EditExitDetailsComponent;
  let fixture: ComponentFixture<EditExitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExitDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
