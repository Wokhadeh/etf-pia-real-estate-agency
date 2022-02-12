import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatePromotionComponent } from './real-estate-promotion.component';

describe('RealEstatePromotionComponent', () => {
  let component: RealEstatePromotionComponent;
  let fixture: ComponentFixture<RealEstatePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstatePromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
