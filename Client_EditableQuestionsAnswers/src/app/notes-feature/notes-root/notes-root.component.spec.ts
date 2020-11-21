import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesRootComponent } from './notes-root.component';

describe('NotesRootComponent', () => {
  let component: NotesRootComponent;
  let fixture: ComponentFixture<NotesRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
