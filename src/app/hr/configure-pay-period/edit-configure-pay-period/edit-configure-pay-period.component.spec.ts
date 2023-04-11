import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigurePayPeriodComponent } from './edit-configure-pay-period.component';

describe('EditConfigurePayPeriodComponent', () => {
  let component: EditConfigurePayPeriodComponent;
  let fixture: ComponentFixture<EditConfigurePayPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConfigurePayPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConfigurePayPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
