import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePayPeriodViewComponent } from './configure-pay-period-view.component';

describe('ConfigurePayPeriodViewComponent', () => {
  let component: ConfigurePayPeriodViewComponent;
  let fixture: ComponentFixture<ConfigurePayPeriodViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurePayPeriodViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurePayPeriodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
