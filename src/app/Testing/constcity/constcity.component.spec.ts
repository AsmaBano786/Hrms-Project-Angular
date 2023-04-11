import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstcityComponent } from './constcity.component';

describe('ConstcityComponent', () => {
  let component: ConstcityComponent;
  let fixture: ComponentFixture<ConstcityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstcityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
