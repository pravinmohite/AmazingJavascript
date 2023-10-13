import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlogPopupComponent } from './user-blog-popup.component';

describe('UserBlogPopupComponent', () => {
  let component: UserBlogPopupComponent;
  let fixture: ComponentFixture<UserBlogPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBlogPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBlogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
