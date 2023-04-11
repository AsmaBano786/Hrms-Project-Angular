import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictcharComponent } from './restrictchar.component';

describe('RestrictcharComponent', () => {
  let component: RestrictcharComponent;
  let fixture: ComponentFixture<RestrictcharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictcharComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestrictcharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
