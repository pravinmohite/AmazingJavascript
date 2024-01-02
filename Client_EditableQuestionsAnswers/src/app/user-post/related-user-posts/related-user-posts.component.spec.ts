import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedUserPostsComponent } from './related-user-posts.component';

describe('RelatedUserPostsComponent', () => {
  let component: RelatedUserPostsComponent;
  let fixture: ComponentFixture<RelatedUserPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedUserPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedUserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
