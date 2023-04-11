import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePayPeriodComponent } from './configure-pay-period.component';

describe('ConfigurePayPeriodComponent', () => {
  let component: ConfigurePayPeriodComponent;
  let fixture: ComponentFixture<ConfigurePayPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurePayPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurePayPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
