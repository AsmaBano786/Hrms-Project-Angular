import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplyLeaveComponent } from './edit-apply-leave.component';

describe('EditApplyLeaveComponent', () => {
  let component: EditApplyLeaveComponent;
  let fixture: ComponentFixture<EditApplyLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApplyLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApplyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
