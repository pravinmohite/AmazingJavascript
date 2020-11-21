import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponentComponent } from './notes-component.component';

describe('NotesComponentComponent', () => {
  let component: NotesComponentComponent;
  let fixture: ComponentFixture<NotesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a new note on click of add button',()=>{
    component.addItem(1);
    expect(component.newNote).toBeTruthy();
  })
  
  it('should assign current index on click of add button',()=>{
    component.addItem(1);
    expect(component.currentNote.index).toEqual(1);
  })

  it('should show modal on click of edit item',()=>{
    component.editItem([{id:1,note:"test"}],2);
    expect(component.showModal).toBeTrue();
  })

  it('should assign current index on edit click',()=>{
    component.editItem([{id:3,note:"test"}],3);
    expect(component.currentItemToBeEdited.index).toEqual(3);
  })

  it('should save item on click of enter press',()=>{
     let list=[{id:3,note:"test"}]
     let event={key:"Enter"}
     component.saveContent(list,event)
     expect(list.length).toEqual(2);
  })

  it('should remove item on click of enter press',()=>{
    let list=[{id:3,note:"test"},{id:2,note:"test2"}];
    component.removeItem(list,0)
    expect(list.length).toEqual(1);
 })
});
