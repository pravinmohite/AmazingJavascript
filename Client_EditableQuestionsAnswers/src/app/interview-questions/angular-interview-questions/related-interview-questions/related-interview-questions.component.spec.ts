import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedInterviewQuestionsComponent } from './related-interview-questions.component';

describe('RelatedInterviewQuestionsComponent', () => {
  let component: RelatedInterviewQuestionsComponent;
  let fixture: ComponentFixture<RelatedInterviewQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedInterviewQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedInterviewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
