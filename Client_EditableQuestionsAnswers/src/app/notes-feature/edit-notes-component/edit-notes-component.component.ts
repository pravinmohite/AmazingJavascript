import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-notes-component',
  templateUrl: './edit-notes-component.component.html',
  styleUrls: ['./edit-notes-component.component.scss']
})
export class EditNotesComponentComponent {
  itemToBeEdited:any={note:""};
  constructor() { }
  @Input() editedItemDetails:any;
  @Output() onSaveEditedItem:EventEmitter<any>=new EventEmitter<any>();
  
  ngOnInit() {
    if(this.editedItemDetails)
     this.itemToBeEdited=Object.assign({},this.editedItemDetails.list[this.editedItemDetails.index]);
  }
  saveEditedItem() {
    this.editedItemDetails.list[this.editedItemDetails.index]=this.itemToBeEdited;
    this.onSaveEditedItem.emit();
  }
}
