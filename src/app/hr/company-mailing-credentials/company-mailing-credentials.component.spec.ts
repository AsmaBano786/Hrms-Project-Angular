import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMailingCredentialsComponent } from './company-mailing-credentials.component';

describe('CompanyMailingCredentialsComponent', () => {
  let component: CompanyMailingCredentialsComponent;
  let fixture: ComponentFixture<CompanyMailingCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyMailingCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyMailingCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
