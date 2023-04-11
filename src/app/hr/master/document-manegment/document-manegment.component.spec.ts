import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManegmentComponent } from './document-manegment.component';

describe('DocumentManegmentComponent', () => {
  let component: DocumentManegmentComponent;
  let fixture: ComponentFixture<DocumentManegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentManegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentManegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
