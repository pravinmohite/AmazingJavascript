import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import  *  as  data  from  '../mockData.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  mockData=(data as any).default.noteTypes;
  sortedData:any;
  private data=new BehaviorSubject(this.mockData);
  currentData=this.data.asObservable();

  constructor() { }

  sortData(param:string) {
    this.sortedData=Object.assign([],this.mockData);
    if(param=="title") {
     this.sortedData.map(notes=>{
       notes.notesList.sort((a,b)=>{
        if(a.note>b.note)
         return 1;
        else if(a.note<b.note)
          return -1;
        else
          return 0;   
      });
     })
  }
  else {
    this.sortedData.map(notes=>{
      notes.notesList.sort((a,b)=>{
       return a.id-b.id;
     });
    })
   }
   this.data.next(this.sortedData);
  }
}
