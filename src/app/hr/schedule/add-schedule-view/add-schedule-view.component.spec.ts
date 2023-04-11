import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleViewComponent } from './add-schedule-view.component';

describe('AddScheduleViewComponent', () => {
  let component: AddScheduleViewComponent;
  let fixture: ComponentFixture<AddScheduleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
