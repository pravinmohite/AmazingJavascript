import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserPostsComponent } from './other-user-posts.component';

describe('OtherUserPostsComponent', () => {
  let component: OtherUserPostsComponent;
  let fixture: ComponentFixture<OtherUserPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherUserPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
