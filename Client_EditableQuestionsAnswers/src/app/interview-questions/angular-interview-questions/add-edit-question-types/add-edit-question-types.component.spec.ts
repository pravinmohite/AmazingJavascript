import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuestionTypesComponent } from './add-edit-question-types.component';

describe('AddEditQuestionTypesComponent', () => {
  let component: AddEditQuestionTypesComponent;
  let fixture: ComponentFixture<AddEditQuestionTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditQuestionTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditQuestionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
