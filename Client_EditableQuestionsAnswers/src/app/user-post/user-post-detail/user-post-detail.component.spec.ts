import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostDetailComponent } from './user-post-detail.component';

describe('UserPostDetailComponent', () => {
  let component: UserPostDetailComponent;
  let fixture: ComponentFixture<UserPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
