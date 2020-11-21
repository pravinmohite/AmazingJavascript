import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotesComponentComponent } from './edit-notes-component.component';

describe('EditNotesComponentComponent', () => {
  let component: EditNotesComponentComponent;
  let fixture: ComponentFixture<EditNotesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
