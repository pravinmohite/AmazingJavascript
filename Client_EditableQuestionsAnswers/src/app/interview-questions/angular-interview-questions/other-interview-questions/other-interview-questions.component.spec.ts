import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherInterviewQuestionsComponent } from './other-interview-questions.component';

describe('OtherInterviewQuestionsComponent', () => {
  let component: OtherInterviewQuestionsComponent;
  let fixture: ComponentFixture<OtherInterviewQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherInterviewQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherInterviewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
