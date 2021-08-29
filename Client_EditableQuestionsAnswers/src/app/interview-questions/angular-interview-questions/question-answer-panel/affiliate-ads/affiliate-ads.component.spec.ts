import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateAdsComponent } from './affiliate-ads.component';

describe('AffiliateAdsComponent', () => {
  let component: AffiliateAdsComponent;
  let fixture: ComponentFixture<AffiliateAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
