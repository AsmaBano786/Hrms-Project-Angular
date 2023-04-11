import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExitDetailsComponent } from './add-exit-details.component';

describe('AddExitDetailsComponent', () => {
  let component: AddExitDetailsComponent;
  let fixture: ComponentFixture<AddExitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExitDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
