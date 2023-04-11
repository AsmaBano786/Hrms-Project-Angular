import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddScheduleComponent } from './edit-add-schedule.component';

describe('EditAddScheduleComponent', () => {
  let component: EditAddScheduleComponent;
  let fixture: ComponentFixture<EditAddScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
