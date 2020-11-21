import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notes-component',
  templateUrl: './notes-component.component.html',
  styleUrls: ['./notes-component.component.scss']
})
export class NotesComponentComponent implements OnInit {
  currentNote:any={note:""}
  showModal:boolean=false;
  currentItemToBeEdited:any;
  constructor() { }
  @Input() noteTypes:any;
  newNote:boolean=false;
  ngOnInit(): void {
  }

  saveContent(list,event) {
    if(event.key=="Enter") {
      list.push({id:Math.random(),note:this.currentNote.note});
      this.newNote=false;
      this.currentNote.note="";
    } 
  }

  editItem(list,index) {
    this.showModal=true;
    this.currentItemToBeEdited={list,index};
  }

  addItem(index) {
    this.newNote=true;
    this.currentNote.index=index;
  }

  removeItem(list,index) {
    list.splice(index,1);
  }

  voteItem(list,index) {
    list[index].vote++;
  }
  public saveEditedItem(editedItemDetails) {
    this.showModal=false;
   }
}
