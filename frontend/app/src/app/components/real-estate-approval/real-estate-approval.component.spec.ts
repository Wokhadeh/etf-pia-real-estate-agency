import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateApprovalComponent } from './real-estate-approval.component';

describe('RealEstateApprovalComponent', () => {
  let component: RealEstateApprovalComponent;
  let fixture: ComponentFixture<RealEstateApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
