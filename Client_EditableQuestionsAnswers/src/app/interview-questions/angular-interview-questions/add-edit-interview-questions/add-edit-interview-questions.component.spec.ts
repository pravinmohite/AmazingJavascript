import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInterviewQuestionsComponent } from './add-edit-interview-questions.component';

describe('AddEditInterviewQuestionsComponent', () => {
  let component: AddEditInterviewQuestionsComponent;
  let fixture: ComponentFixture<AddEditInterviewQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditInterviewQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInterviewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
