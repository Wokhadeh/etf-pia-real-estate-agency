import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotedRealEstatesComponent } from './promoted-real-estates.component';

describe('PromotedRealEstatesComponent', () => {
  let component: PromotedRealEstatesComponent;
  let fixture: ComponentFixture<PromotedRealEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotedRealEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotedRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
