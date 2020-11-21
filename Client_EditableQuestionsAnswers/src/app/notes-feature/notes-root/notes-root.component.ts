import { Component,OnInit,ElementRef,ViewChildren,QueryList,ViewChild, AfterViewInit, DoCheck, OnChanges } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-notes-root',
  templateUrl: './notes-root.component.html',
  styleUrls: ['./notes-root.component.scss']
})
export class NotesRootComponent implements DoCheck {
  title = 'sample-task';
  editedItem:any={};
  showModal:boolean=false;
  @ViewChildren ('whatWentWellElem') whatWentWellElem: QueryList<ElementRef>;
  @ViewChildren ('whatCanBeImprovedElem') whatCanBeImprovedElem: QueryList<ElementRef>;
  @ViewChildren ('startDoingElem') startDoingElem: QueryList<ElementRef>;
  @ViewChildren ('actionItemsElem') actionItemsElem: QueryList<ElementRef>;
  
/*-------------new vars----------------*/
  noteTypes:any;

  constructor(private dataService:DataService) {
  }

  ngOnInit() {
    this.dataService.currentData.subscribe(data=>{
      this.noteTypes=data
    });
  }
  ngDoCheck() {
  /*  console.log('do check called');
    if(this.whatWentWellElem) {
      this.whatWentWellElem.changes.subscribe(()=>
      { 
        if(this.whatWentWellElem.first)
          this.whatWentWellElem.first.nativeElement.focus();
      })
    }
    if(this.whatCanBeImprovedElem) {
      this.whatCanBeImprovedElem.changes.subscribe(()=>
      {
        if(this.whatCanBeImprovedElem.first)
          this.whatCanBeImprovedElem.first.nativeElement.focus();
      })
    }  
    if(this.startDoingElem) {
      this.startDoingElem.changes.subscribe(()=>
      {
        if(this.startDoingElem.first)
          this.startDoingElem.first.nativeElement.focus();
      })
    }  
    if(this.actionItemsElem) {
      this.actionItemsElem.changes.subscribe(()=>
      {
        if(this.actionItemsElem.first)
         this.actionItemsElem.first.nativeElement.focus();
      })
    }  */
  }
}
