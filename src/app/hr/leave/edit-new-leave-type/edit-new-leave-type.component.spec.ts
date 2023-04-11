import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewLeaveTypeComponent } from './edit-new-leave-type.component';

describe('EditNewLeaveTypeComponent', () => {
  let component: EditNewLeaveTypeComponent;
  let fixture: ComponentFixture<EditNewLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewLeaveTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNewLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
