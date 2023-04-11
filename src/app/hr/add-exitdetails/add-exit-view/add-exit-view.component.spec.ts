import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExitViewComponent } from './add-exit-view.component';

describe('AddExitViewComponent', () => {
  let component: AddExitViewComponent;
  let fixture: ComponentFixture<AddExitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExitViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
