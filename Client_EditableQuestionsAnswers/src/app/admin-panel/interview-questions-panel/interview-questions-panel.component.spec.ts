import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewQuestionsPanelComponent } from './interview-questions-panel.component';

describe('InterviewQuestionsPanelComponent', () => {
  let component: InterviewQuestionsPanelComponent;
  let fixture: ComponentFixture<InterviewQuestionsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewQuestionsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewQuestionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
